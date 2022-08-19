const Mongoose = require("mongoose");

module.exports = (mongoose) => {
    return mongoose.model("song", songDoc);
};

const timeDoc = new Mongoose.Schema({
    begin: String,
    end: String,
    duration: Number
});

const songDoc = new Mongoose.Schema({
    ytLink: String,
    ytID: String,
    singerName: String,
    gender: String,
    songTitle: String,
    songLanguage: String,
    theme: Array,
    year: Number,
    intro: timeDoc,
    verse: timeDoc,
    chorus: timeDoc,
    bridge: timeDoc
});