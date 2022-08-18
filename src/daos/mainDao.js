const mongoModel = require("../configs/mongoDB");
const errModel = require("../models/errModel");

module.exports.saveNewUser = function () {
    return new Promise((resolve, reject) => {
        const uesrDoc = new mongoModel.User({
            userInfo: {
                name: "JayKuo",
                age: 28
            }
        });

        uesrDoc.save((err, user) => {
            if (err) {
                return reject(new errModel(1, null, err));
            }
            resolve(user._id);
        });
    });
};
