// backend/models/Message.js
const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true
  },

  text: {
    type: String,
    required: true
  },

  // ⭐ IMPORTANT: Frontend needs this to show text/image correctly
  type: {
    type: String,
    enum: ["text", "image"],
    default: "text"
  },

  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Message", MessageSchema);
