const mainDao = require("../daos/mainDao");
const resModel = require("../models/resModel");

module.exports.mainData = async function () {
    const res = await mainDao.mainData();
    return new resModel(res);
};
