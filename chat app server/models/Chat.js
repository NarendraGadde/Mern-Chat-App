const mongoose = require("mongoose");
const User = require("./User");

const ChatSchema = mongoose.Schema({
  senderid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  receiverid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  message: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Chat = mongoose.model("Chat", ChatSchema);
