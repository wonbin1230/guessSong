const express = require("express");
const router = express.Router();
const songController = require("../controller/songController");
const mainController = require("../controller/mainController");
const loginAuth = require("../middlewares/loginAuth");

router.route("/login")
  .get(mainController.login);

router.all("/*", [loginAuth.loginAuth], (req, res, next) => {
  next();
});

router.get("/main", (req, res) => {
  res.render("guessSong", { title: "GuessSongs" });
});

router.route("/")
  .get(songController.readAll)
  .post(songController.createSong)
  .put(songController.updateSong)
  .delete(songController.deleteSong);

router.route("/read")
  .get(songController.readSong)
  .post(songController.readSongByytID);

router.route("/apply")
  .post(songController.applyAddSong)
  .delete(songController.applyDeleteSong);

router.route("/sample")
  .get(songController.readSampleSong);

router.route("/getSong/:ytID/:paragraph")
  .get(songController.getSong);

router.route("/gridCellParagraphHtml/:paragraph")
  .get(songController.gridCellParagraphHtml);

module.exports = router;