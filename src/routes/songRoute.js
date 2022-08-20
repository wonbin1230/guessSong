const express = require("express");
const router = express.Router();
const songController = require("../controller/songController");

router.route("/")
  .get(songController.readSong)
  .post(songController.createSong)
  .put(songController.updateSong)
  .delete(songController.deleteSong);

router.route("/applyAddSong")
  .get(songController.testView)
  .post(songController.applyAddSong);

router.route("/sample")
  .get(songController.readSampleSong);

module.exports = router;