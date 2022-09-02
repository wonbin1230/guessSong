const express = require("express");
const router = express.Router();
const songController = require("../controller/songController");

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

module.exports = router;