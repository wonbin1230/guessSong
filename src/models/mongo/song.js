const Mongoose = require("mongoose");

module.exports = (mongoose) => {
    return mongoose.model("song", songDoc);
};

const timeDoc = new Mongoose.Schema({
    begin: { type: String, required: true },
    end: { type: String, required: true },
    duration: { type: Number, required: true }
});

const songDoc = new Mongoose.Schema({
    ytLink: { type: String, required: true },
    ytID: { type: String, required: true },
    singerName: { type: String, required: true },
    gender: { type: String, required: true },
    songTitle: { type: String, required: true },
    songLanguage: { type: String, required: true },
    theme: String,
    year: Number,
    intro: timeDoc,
    verse: { type: timeDoc, required: true },
    preChorus: timeDoc,
    chorus: { type: timeDoc, required: true },
    bridge: timeDoc,
    outro: timeDoc,
    createUser: { type: String, required: true },
});
