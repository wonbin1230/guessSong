const mongoose = require("mongoose");
const initModels = require("../models/mongo/init-models");
const env = require("../../env");

const connMongo = mongoose.createConnection(
    env.connMongoUri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

connMongo.on("open", () => {
    console.log("開啟 mongodb 連線");
});

connMongo.on("err", (err) => {
    console.log("err:" + err);
});

module.exports = initModels(connMongo);