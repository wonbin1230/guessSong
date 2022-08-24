const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
// const helmet = require("helmet");
const path = require("path");
const cors = require("cors");
const env = require("../env");

const mainRoute = require("./routes/mainRoute");
const songRoute = require("./routes/songRoute");
const app = express();

// app.use(helmet());
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// 設置session相關設定
const MongoStore = require("connect-mongo");
const mStore = MongoStore.create({
    mongoUrl: "mongodb://192.168.10.10:27017/Session"
});
app.use(session({
    secret: "Kuo",
    name: "sessionID",
    store: mStore,
    cookie: {
        secure: true,
        httpOnly: true,
        maxAge: 1000 * 60 * 1000
    }
}));

app.use("/", mainRoute);
app.use("/song", songRoute);

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