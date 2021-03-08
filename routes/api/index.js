const router = require("express").Router();

router.use("/contact", require("./contact"));
router.use("/conversation", require("./conversation"));
router.use("/message", require("./message"));
router.use("/user", require("./user"));

module.exports = router;
