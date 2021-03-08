const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  ownerID: String,
  savedPeople: [
    {
      uuid: String,
      nickname: String,
    },
  ],
});

module.exports = mongoose.model("contact", contactSchema, "contact");
