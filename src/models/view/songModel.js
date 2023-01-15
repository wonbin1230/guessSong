const joi = require("joi");

/**
      {
       ytLink: url // youtube link
       ytID: string, // youtube ID
        singerName: string, // 歌手名
        songTitle: string, // 歌名
        theme: string, // 主題曲 or片尾曲 or 插戲劇 or 電影名字
        year. YYYY // 歌曲年份
        intro: { // 前奏時間
            begin: '0:00',
            end:  '0:10',
            duration: 10
        }, 
        verse: { // 主歌時間
            begin: '0:00',
            end:  '0:10',
            duration: 10
        }, 
        chorus: { // 副歌時間
            begin: '0:00',
            end:  '0:10',
            duration: 10
        }, 
        bridge: { // bridge時間
            begin: '0:00',
            end:  '0:10',
            duration: 10
        } 
    }
 */
//#region public joiSchema
const ytLink = joi.string().uri().required();
const ytID = joi.string();
const singerName = joi.string().required();
const gender = joi.string().regex(/^(?:男|女|團體|合唱)$/).required();
const songTitle = joi.string().required();
const songLanguage = joi.string().regex(/^(?:華|台|英|日|韓|粵)$/).required();
const theme = joi.string();
const year = joi.number().positive();
const creatUser = joi.string();

const timeJoi = joi.string().regex(/^([0-5][0-9]):([0-5][0-9])(.([0-9][0-9]?[0-9]?))?$/).required();
const duration = joi.number().positive();

const _id = joi.string().required();

const paragraph = joi.string().regex(/^(?:intro|verse|preChorus|chorus|bridge|outro)$/).required();
const fileFormat = joi.string().regex(/^(?:m4a|mp3)$/).required();

// #endregion public joiSchema

const songTime = joi.object().keys({
    begin: timeJoi,
    end: timeJoi,
    duration
});

const createSong = joi.object().keys({
    ytLink,
    ytID,
    singerName,
    gender,
    songTitle,
    songLanguage,
    theme,
    year,
    intro: songTime,
    verse: songTime.required(),
    preChorus: songTime,
    chorus: songTime.required(),
    bridge: songTime,
    outro: songTime,
    creatUser
});

const readSong = joi.object().keys({
    singerName,
    songTitle
});

const readSongByytID = joi.object().keys({
    ytLink
});

const updateSong = joi.object().keys({
    _id,
    singerName,
    gender,
    songTitle,
    songLanguage,
    theme,
    year
});

const deleteSong = joi.object().keys({
    ytID: ytID.required()
});

const readSampleSong = joi.object().keys({
    ytID: ytID.required(),
    paragraph,
    fileFormat
});

const applyAddSong = joi.object().keys({
    ytID: ytID.required()
});

const applyDeleteSong = joi.object().keys({
    _id
});

const getSong = joi.object().keys({
    ytID: ytID.required(),
    paragraph,
});

const gridCellParagraphHtml = joi.object().keys({
    paragraph,
});

module.exports = {
    createSong,
    readSong,
    readSongByytID,
    updateSong,
    deleteSong,
    readSampleSong,
    applyAddSong,
    applyDeleteSong,
    getSong,
    gridCellParagraphHtml
};