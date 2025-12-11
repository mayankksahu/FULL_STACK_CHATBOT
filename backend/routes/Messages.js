// backend/routes/messages.js
const express = require("express");
const router = express.Router();
const messagesController = require("../controllers/messagesController");

// Fetch full chat history
router.get("/messages", messagesController.getMessages);

// Post user message → AI reply
router.post("/message", messagesController.postMessage);

// Delete all messages (clear history)
router.delete("/messages", messagesController.deleteMessages);

module.exports = router;
