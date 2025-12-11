// backend/controllers/messagesController.js
const Message = require("../models/Message");
const aiService = require("../services/aiService");

// GET /api/messages
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    console.error("Fetch messages error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// POST /api/message
// exports.postMessage = async (req, res) => {
//   try {
//     const userText = req.body.message;

//     if (!userText) {
//       return res.status(400).json({ error: "Message is required" });
//     }

//     // Save user message
//     const userMsg = await Message.create({
//       role: "user",
//       text: userText
//     });

//     // Fetch last 6 messages for context
//     const previousMessages = await Message.find()
//       .sort({ timestamp: -1 })
//       .limit(6)
//       .lean();

//     const context = previousMessages.reverse(); // chronological order

//     // Get AI response
//     const aiReply = await aiService.getReply(userText, context);

//     // Save AI message
//     const aiMsg = await Message.create({
//       role: "assistant",
//       text: aiReply
//     });

//     res.json({
//       reply: aiReply,
//       userMessage: userMsg,
//       aiMessage: aiMsg
//     });

//   } catch (err) {
//     console.error("AI reply error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// };




exports.postMessage = async (req, res) => {
  try {
    const userText = req.body.message;
    const type = req.body.type || "text"; // <- read type from client

    if (!userText) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Save user message (include type)
    const userMsg = await Message.create({
      role: "user",
      text: userText,
      type: type
    });

    // Fetch last 6 messages for context (optional)
    const previousMessages = await Message.find()
      .sort({ timestamp: -1 })
      .limit(6)
      .lean();

    const context = previousMessages.reverse(); // chronological order

    // Pass type to aiService so it can decide image vs text
    const aiReply = await aiService.getReply(userText, type, context);

    // Save AI message (set type accordingly)
    const aiMsg = await Message.create({
      role: "assistant",
      text: aiReply,
      type: type === "image" ? "image" : "text"
    });

    return res.json({
      reply: aiReply,
      userMessage: userMsg,
      aiMessage: aiMsg
    });
  } catch (err) {
    console.error("AI reply error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};


// DELETE /api/messages
exports.deleteMessages = async (req, res) => {
  try {
    await Message.deleteMany({});
    return res.json({ ok: true });
  } catch (err) {
    console.error("deleteMessages error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};
