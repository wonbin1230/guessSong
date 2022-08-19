const _user = require("./user");
const _song = require("./song");

function initModels(mongoose) {
    const User = _user(mongoose);
    const Song = _song(mongoose);

    return {
        User,
        Song
    };
}

module.exports = initModels;