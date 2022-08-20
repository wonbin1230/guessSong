const songDao = require("../daos/songDao");
const splitService = require("./splitService");
const resModel = require("../models/resModel");
const fs = require("fs");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const ytdl = require("ytdl-core");
const moment = require("moment");

module.exports.readSong = async function (query) {
    const songInfo = await songDao.readSong(query);
    return new resModel(songInfo);
};

module.exports.createSong = async function (body) {
    const ytLink = body.ytLink;
    const reqUrl = new URL(ytLink);
    const params = reqUrl.searchParams;
    body.ytID = params.get("v");

    const songInfo = await songDao.readSong(body);
    if (songInfo) {
        return new resModel("資料庫中已有相同歌曲");
    }

    const songInfoTmp = splitService.create(body);
    if (songInfoTmp) {
        return new resModel("已有相同歌曲列隊新增中");
    }
    const info = await ytdl.getInfo(body.ytID);
    const filePath = ytdl.chooseFormat(info.formats, { quality: "140", filter: "audioonly" }).url;
    await splitSong(body.ytID, "intro", body.intro, filePath);
    await splitSong(body.ytID, "verse", body.verse, filePath);
    await splitSong(body.ytID, "chorus", body.chorus, filePath);
    await splitSongMP3(body.ytID, "intro", body.intro, filePath);
    await splitSongMP3(body.ytID, "verse", body.verse, filePath);
    await splitSongMP3(body.ytID, "chorus", body.chorus, filePath);
    if (body.bridge) {
        await splitSong(body.ytID, "bridge", body.bridge, filePath);
        await splitSongMP3(body.ytID, "bridge", body.bridge, filePath);
    }
    const res = body.ytID;
    return new resModel(res);
};

async function splitSong(ytID, key, time, filePath) {
    const audioPath = path.join(__dirname, "../public/audio", ytID);
    fs.mkdirSync(audioPath, { recursive: true });
    const newFilePath = path.join(audioPath, `${key}.m4a`);

    const begin = moment(`2022-01-01 00:${time.begin}`);
    const end = moment(`2022-01-01 00:${time.end}`);
    time.duration = end.diff(begin, "s");
    splitService.addDuration(ytID, key, time);

    return new Promise((resolve) => {
        ffmpeg(filePath)
            .seekInput(time.begin)
            .duration(time.duration)
            .save(newFilePath)
            .on("end", () => {
                console.log(`${ytID} ${key} Split End`);
                resolve();
            });
    });
}

async function splitSongMP3(ytID, key, time, filePath) {
    const audioPath = path.join(__dirname, "../public/audio", ytID);
    fs.mkdirSync(audioPath, { recursive: true });
    const newFilePath = path.join(audioPath, `${key}.mp3`);

    const begin = moment(`2022-01-01 00:${time.begin}`);
    const end = moment(`2022-01-01 00:${time.end}`);
    time.duration = end.diff(begin, "s");
    splitService.addDuration(ytID, key, time);

    return new Promise((resolve) => {
        ffmpeg(filePath)
            .seekInput(time.begin)
            .duration(time.duration)
            .audioCodec("libmp3lame")
            .save(newFilePath)
            .on("end", () => {
                console.log(`${ytID} ${key} MP3 Split End`);
                resolve();
            });
    });
}

module.exports.updateSong = async function (body) {
    const songInfo = await songDao.updateSong(body);
    return new resModel(songInfo);
};

module.exports.deleteSong = async function (query) {
    const songInfo = await songDao.deleteSong(query._id);
    const audioPath = path.join(__dirname, "../public/audio", songInfo.ytID);
    fs.rmSync(audioPath, { recursive: true });
    return new resModel(songInfo);
};

module.exports.applyAddSong = async function (body) {
    const songInfo = splitService.read(body.ytID);
    if (!songInfo) {
        return new resModel("此歌曲未在列隊新增中");
    }
    const res = await songDao.saveSong(songInfo);
    return new resModel(res);
};
