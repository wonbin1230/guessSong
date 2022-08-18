const express = require("express");
const router = express.Router();
const listController = require("../controller/listController");
const { authJWT } = require("../middlewares/jwt");

router.route("/")
  .post(authJWT, listController.createList)
  .get(authJWT, listController.readList)
  .put(authJWT, listController.updateList)
  .delete(authJWT, listController.deleteList);

module.exports = router;