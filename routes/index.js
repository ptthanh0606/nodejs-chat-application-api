const router = require("express").Router();

router.use("/api", require("./api"));

router.use("/auth", require("./auth.js"));

module.exports = router;
