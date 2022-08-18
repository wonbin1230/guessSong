const _user = require("./user");

function initModels(mongoose) {
    const User = _user(mongoose);

    return {
        User
    };
}

module.exports = initModels;