const jwt = require("jsonwebtoken");
const env = require("../env");
const errModel = require("../models/errModel");
const mongoModel = require("../configs/mongoDB");

module.exports.authJWT = async function (req, res, next) {
    try {
        const reqJWT = req.headers.authorization;

        if (reqJWT === undefined) {
            throw new errModel(2, "未傳入JWT");
        }

        const decodeJWT = jwt.verify(reqJWT, env.jwtSecret);

        const userDoc = await mongoModel.User.findOne({ _id: decodeJWT._id });

        if (userDoc === null) {
            throw new errModel(2, "JTW已失效");
        }
        req.userInfo = userDoc.userInfo.toJSON();
        next();
    } catch (err) {
        next(err);
    }
};