const router = require("express").Router();

router.use("/api", require("./api"));

router.use("/auth", require("./auth.js"));

router.get("/", (req, res) => {
  res.send("PT Chat application API");
});

module.exports = router;
