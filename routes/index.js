var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/hello", function (req, res) {
  res.json({ title: "prueba1" });
});

module.exports = router;
