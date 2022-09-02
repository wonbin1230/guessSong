const songModel = require("../models/view/songModel");
const songService = require("../services/songService");
const fs = require("fs");
const path = require("path");
const errModel = require("../models/errModel");

module.exports.createSong = async function (req, res, next) {
    try {
        const { error: joiErr } = songModel.createSong.validate(req.body);
        if (joiErr) {
            throw new errModel(1, joiErr.message);
        }
        const resData = await songService.createSong(req.body);
        res.json(resData);
    } catch (err) {
        next(err);
    }
};

module.exports.readAll = async function (req, res, next) {
    try {
        const resData = await songService.readAll();
        res.json(resData);
    } catch (err) {
        next(err);
    }
};

module.exports.readSong = async function (req, res, next) {
    try {
        const { error: joiErr } = songModel.readSong.validate(req.query);
        if (joiErr) {
            throw new errModel(1, joiErr.message);
        }
        const resData = await songService.readSong(req.query);
        res.json(resData);
    } catch (err) {
        next(err);
    }
};

module.exports.readSongByytID = async function (req, res, next) {
    try {
        const { error: joiErr } = songModel.readSongByytID.validate(req.body);
        if (joiErr) {
            throw new errModel(1, joiErr.message);
        }
        const resData = await songService.readSongByytID(req.body);
        res.json(resData);
    } catch (err) {
        next(err);
    }
};

module.exports.updateSong = async function (req, res, next) {
    try {
        const { error: joiErr } = songModel.updateSong.validate(req.body);
        if (joiErr) {
            throw new errModel(1, joiErr.message);
        }
        const resData = await songService.updateSong(req.body);
        res.json(resData);
    } catch (err) {
        next(err);
    }
};

module.exports.deleteSong = async function (req, res, next) {
    try {
        const { error: joiErr } = songModel.deleteSong.validate(req.query);
        if (joiErr) {
            throw new errModel(1, joiErr.message);
        }
        const resData = await songService.deleteSong(req.query);
        res.json(resData);
    } catch (err) {
        next(err);
    }
};

module.exports.applyAddSong = async function (req, res, next) {
    try {
        const { error: joiErr } = songModel.applyAddSong.validate(req.body);
        if (joiErr) {
            throw new errModel(1, joiErr.message);
        }
        const resData = await songService.applyAddSong(req.body);
        res.json(resData);
    } catch (err) {
        next(err);
    }
};

module.exports.applyDeleteSong = async function (req, res, next) {
    try {
        const { error: joiErr } = songModel.applyDeleteSong.validate(req.query);
        if (joiErr) {
            throw new errModel(1, joiErr.message);
        }
        const resData = await songService.applyDeleteSong(req.query._id);
        res.json(resData);
    } catch (err) {
        next(err);
    }
};

module.exports.readSampleSong = async function (req, res, next) {
    try {
        const { error: joiErr } = songModel.readSampleSong.validate(req.query);
        if (joiErr) {
            throw new errModel(1, joiErr.message);
        }
        const audioPath = path.join(__dirname, "../public/audio", req.query.ytID);
        if (!fs.existsSync(audioPath)) {
            throw new errModel(2, "此ytID資料夾不存在");
        }
        const filePath = path.join(audioPath, `${req.query.paragraph}.${req.query.fileFormat}`);

        res.setHeader("Content-Type", "audio/mp4");
        fs.createReadStream(filePath).pipe(res);
    } catch (err) {
        next(err);
    }
};