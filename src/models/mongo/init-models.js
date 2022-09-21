const _song = require("./song");

function initModels(mongoose) {
    const Song = _song(mongoose);

    return {
        Song
    };
}

module.exports = initModels;