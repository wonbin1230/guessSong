const songModel = require("../models/view/songModel");
const songService = require("../services/songService");
const env = require("../env");
const errModel = require("../models/errModel");
const fs = require("fs");
const path = require("path");

module.exports.createSong = async function (req, res, next) {
    try {
        const { error: joiErr } = songModel.createSong.validate(req.body);
        if (joiErr) {
            throw new errModel(1, joiErr.message);
        }
        req.body.createUser = req.session.userInfo.name;
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
        const filePath = path.join(audioPath, `${req.query.paragraph}.mp3`);

        res.setHeader("Content-Type", "audio/mp3");
        fs.createReadStream(filePath).pipe(res);
    } catch (err) {
        next(err);
    }
};

module.exports.getSong = async function (req, res, next) {
    try {
        const { error: joiErr } = songModel.getSong.validate(req.params);
        if (joiErr) {
            throw new errModel(1, joiErr.message);
        }
        const filePath = path.join(env.audioFolder, req.params.ytID, `${req.params.paragraph}.mp3`);
        res.setHeader("Content-Type", "audio/mp3");
        fs.createReadStream(filePath).pipe(res);
    } catch (err) {
        next(err);
    }
};

module.exports.gridCellParagraphHtml = async function (req, res, next) {
    try {
        const { error: joiErr } = songModel.gridCellParagraphHtml.validate(req.params);
        if (joiErr) {
            throw new errModel(1, joiErr.message);
        }
        const html = `
        <div class="ui-grid-cell-contents gridFlex" ng-if="row.entity.${req.params.paragraph}.begin.length > 0">
            <button type="button" class="btn btn-primary" ng-click='grid.appScope.auditionGrid(row, "${req.params.paragraph}")'
                style="width: 60px;">試聽</button>
            <span style="color: green;">{{COL_FIELD.begin}}</span>
            <span style="color: red;">{{COL_FIELD.end}}</span>
        </div>`;
        res.setHeader("Content-type", "text/html");
        res.send(html);
    } catch (err) {
        next(err);
    }
};
