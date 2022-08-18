const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
const env = require("../env");

const mainRoute = require("./routes/mainRoute");
//const decodeRoute = require("./routes/decodeRoute");
const app = express();

app.use(helmet());
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 設置session相關設定
const mongoose = require("mongoose");
const mStore = mongoose.createConnection(
    env.sessionMongoUri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
app.use(session({
    secret: "Kuo",
    name: "sessionID",
    resave: false,
    rolling: true,
    saveUninitialized: true,
    store: mStore,
    cookie: {
        secure: true,
        httpOnly: true,
        maxAge: 1000 * 60 * 1000
    }
}));

app.use("/", mainRoute);
//app.use("/decode", decodeRoute);

// error handler
const resModel = require("./models/resModel");
app.use((err, req, res, next) => {
    if (err.realMsg) {
        console.error(err.realMsg);
    }
    console.error(err);
    const resData = new resModel(null, err.code || 99);
    res.json(resData);
    next();
});

const host = env.httpServerHost;
const port = env.httpServerPort;
app.listen(port, () => {
    console.log(`Server Running: http://${host}:${port}`);
});

module.exports = app;