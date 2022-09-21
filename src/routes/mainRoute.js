const express = require("express");
const router = express.Router();
const mainController = require("../controller/mainController");

router.route("/")
  .get(mainController.login);

module.exports = router;