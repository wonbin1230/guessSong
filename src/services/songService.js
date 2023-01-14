const songDao = require("../daos/songDao");
const splitService = require("./splitService");
const resModel = require("../models/resModel");
const fs = require("fs");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const ytdl = require("ytdl-core");
const moment = require("moment");
const mv = require("mv");
const env = require("../env");

module.exports.readAll = async function () {
    const songInfo = await songDao.readAll();
    return new resModel(songInfo);
};

module.exports.readSong = async function (query) {
    const songInfo = await songDao.readSong(query);
    if (songInfo) {
        return new resModel("資料庫中已有相同歌曲", 98);
    }
    return new resModel(songInfo);
};

module.exports.readSongByytID = async function (body) {
    const ytLink = body.ytLink;
    const reqUrl = new URL(ytLink);
    const params = reqUrl.searchParams;

    const songInfo = await songDao.readSongByytID(params.get("v"));
    if (songInfo) {
        return new resModel("資料庫中已有相同youtube連結", 98);
    }
    return new resModel(songInfo);
};

module.exports.createSong = async function (body) {
    const ytLink = body.ytLink;
    const reqUrl = new URL(ytLink);
    const params = reqUrl.searchParams;
    body.ytID = params.get("v");

    let songInfoTmp = splitService.create(body);
    if (songInfoTmp) {
        return new resModel("已有相同歌曲列隊新增中", 98);
    }

    songInfoTmp = await songDao.readSongByytID(body.ytID);
    if (songInfoTmp) {
        return new resModel("資料庫中已有相同youtube連結", 98);
    }

    songInfoTmp = await songDao.readSong({
        singerName: body.singerName,
        songTitle: body.songTitle
    });
    if (songInfoTmp) {
        return new resModel("資料庫中已有相同歌曲", 98);
    }

    const info = await ytdl.getInfo(body.ytID);
    const filePath = ytdl.chooseFormat(info.formats, { quality: "140", filter: "audioonly" }).url;
    const paragraph = ["intro", "verse", "preChorus", "chorus", "bridge", "outro"];
    for (const key in body) {
        if (paragraph.includes(key)) {
            await splitSong(body.ytID, key, body[key], filePath);
            //await splitSongMP3(body.ytID, key, body[key], filePath);
        }
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
            .on("end", async () => {
                console.log(`${ytID} ${key} Split End`);
                await splitSongMP3(ytID, key, newFilePath);
                resolve();
            });
    });
}

async function splitSongMP3(ytID, key, filePath) {
    const audioPath = path.join(__dirname, "../public/audio", ytID);
    fs.mkdirSync(audioPath, { recursive: true });
    const newFilePath = path.join(audioPath, `${key}.mp3`);

    return new Promise((resolve) => {
        ffmpeg(filePath)
            .audioCodec("libmp3lame")
            .save(newFilePath)
            .on("end", () => {
                console.log(`${ytID} ${key} MP3 format End`);
                resolve();
            });
    });
}

module.exports.updateSong = async function (body) {
    const songInfo = await songDao.updateSong(body);
    return new resModel(songInfo);
};

module.exports.deleteSong = async function (query) {
    const songInfo = Object.assign({}, splitService.read(query.ytID));
    splitService.delete(query.ytID);
    const audioPath = path.join(__dirname, "../public/audio", query.ytID);
    fs.rmSync(audioPath, { recursive: true });
    return new resModel(songInfo);
};

module.exports.applyAddSong = async function (body) {
    const songInfo = splitService.read(body.ytID);
    if (!songInfo) {
        return new resModel("此歌曲未在列隊新增中");
    }
    const audioPath = path.join(__dirname, "../public/audio", songInfo.ytID);
    const audioFolder = path.join(env.audioFolder, songInfo.ytID);
    const mvFile = await moveSong(audioPath, audioFolder);
    let res;
    if (mvFile) {
        res = mvFile;
    } else {
        res = await songDao.saveSong(songInfo);
        splitService.delete(body.ytID);
    }
    return new resModel(res);
};

module.exports.applyDeleteSong = async function (_id) {
    const songInfo = await songDao.deleteSong(_id);

    if (!songInfo) {
        return new resModel("資料庫中沒有此歌曲", 97);
    }
    const audioPath = path.join(env.audioFolder, songInfo.ytID);
    fs.rmSync(audioPath, { recursive: true });
    return new resModel(songInfo);
};

function moveSong(audioPath, audioFolder) {
    return new Promise((resolve) => {
        mv(audioPath, audioFolder, { mkdirp: true }, (err) => {
            if (err) {
                console.log(err);
                resolve("移動檔案時發生錯誤");
            } else {
                resolve();
            }
        });
    });
}