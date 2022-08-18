const Mongoose = require("mongoose");

module.exports = (mongoose) => {
    return mongoose.model("user", userDoc);
};

const userDoc = new Mongoose.Schema({
    name: String,
    email: String
});