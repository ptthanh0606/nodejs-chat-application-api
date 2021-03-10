const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  messages: [
    {
      content: String,
      uuid: String,
    },
  ],
  conversationId: require("mongoose").Types.ObjectId,
});

module.exports = messageModel = mongoose.model(
  "message",
  messageSchema,
  "message"
);
