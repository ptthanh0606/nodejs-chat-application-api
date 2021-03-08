const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uuid: String,
  displayName: String,
});

module.exports = mongoose.model("user", userSchema, "user");
