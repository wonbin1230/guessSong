const mongoModel = require("../configs/mongoDB");
const errModel = require("../models/errModel");

module.exports.readSong = async function (songInfo) {
    return await mongoModel.Song.findOne({
        singerName: songInfo.singerName,
        songTitle: songInfo.songTitle
    });
};

module.exports.updateSong = async function (songInfo) {
    const { _id, ...info } = songInfo;
    return await mongoModel.Song.findByIdAndUpdate(_id, info, { new: true });
};

module.exports.deleteSong = async function (_id) {
    return await mongoModel.Song.findByIdAndDelete(_id);
};

module.exports.saveSong = function (songInfo) {
    return new Promise((resolve, reject) => {
        const songDoc = new mongoModel.Song(songInfo);

        songDoc.save((err, song) => {
            if (err) {
                return reject(new errModel(1, null, err));
            }
            resolve(song._id);
        });
    });
};
