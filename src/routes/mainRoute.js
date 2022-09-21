const express = require("express");
const router = express.Router();
const mainController = require("../controller/mainController");

// router.get("/",  (req, res) => {
//   res.render("guessSong", { title: "GuessSongs" });
// });

router.route("/")
  .get(mainController.login);

module.exports = router;