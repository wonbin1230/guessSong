const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const env = require("./env");
const songRoute = require("./routes/songRoute");
const app = express();

app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use("/guessSongPublic", express.static(path.join(__dirname, "public")));

app.use(session({
    secret: "guessSong",
    name: "sessionID",
    saveUninitialized: false,
    resave: true
}));

app.use("/guessSong", songRoute);

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