const Mongoose = require("mongoose");

module.exports = (mongoose) => {
    return mongoose.model("song", songDoc);
};

const songDoc = new Mongoose.Schema({
    name: String,
    ytlD: String,
    songName: String,
    intro: Int8Array,
    verse: Int8Array,
    chorus: Int8Array,
    bridge: Int8Array,
    theme: String,
    year: Number
});

/*
    {
        name: string, // 歌手名
        ytlD: string, // youtube ID
        songName: string, // 歌名
        intro: ['2:14', '2:14'], // 前奏時間
        verse: ['2:14', '2:14'], // 主歌時間
        chorus: ['2:14', '2:14'], // 副歌時間
        bridge: ['2:14', '2:14'], // bridge時間
        theme: string, // 主題曲 or片尾曲 or 插戲劇 or 電影名字
        year. YYYY // 歌曲年份
    }
*/