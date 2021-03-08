const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  recipients: [String],
});

module.exports = mongoose.model("conversation", conversationSchema);
