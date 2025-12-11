// // backend/services/aiService.js
// const axios = require("axios");

// async function getReply(userText, context = []) {
//   try {
//     // Build ChatGPT-style conversation
//     const messages = [
//       { role: "system", content: "You are a helpful AI assistant." },
//       ...context.map(m => ({
//         role: m.role,
//         content: m.text
//       })),
//       { role: "user", content: userText }
//     ];

//     const response = await axios.post(
//       "https://api.openai.com/v1/chat/completions",
//       {
//         model: "gpt-3.5-turbo",
//         messages
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//           "Content-Type": "application/json"
//         }
//       }
//     );

//     return response.data.choices[0].message.content.trim();

//   } catch (err) {
//     console.error("OpenAI Error:", err.response?.data || err.message);
//     return "Sorry, I couldn't generate a response. Try again.";
//   }
// }

// module.exports = { getReply };



// backend/services/aiService.js
const axios = require("axios");

/* ---------------------------------------------------------
   GEMINI TEXT GENERATION (REST API)
--------------------------------------------------------- */
async function getReplyFromGemini(prompt,context=[]) {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const body = {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    };

    const response = await axios.post(url, body, {
      headers: { "Content-Type": "application/json" }
    });

    const text =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response.";

    return text;
  } catch (error) {
    console.error("Gemini Error:", error.response?.data || error.message);
    return "Sorry, I couldn't generate a response. Try again.";
  }
}

/* ---------------------------------------------------------
   IMAGE GENERATION USING POLLINATIONS
--------------------------------------------------------- */
function generateImageUrl(prompt) {
  const encoded = encodeURIComponent(prompt);
  return `https://image.pollinations.ai/prompt/${encoded}`;
}

/* ---------------------------------------------------------
   UNIFIED REPLY HANDLER (text + image)
--------------------------------------------------------- */
// async function getReply(prompt, type = "text") {
//   if (type === "image") {
//     return generateImageUrl(prompt);
//   }

//   return await getReplyFromGemini(prompt);
// }

async function getReply(prompt, type = "text", context = []) {
  if (type === "image") {
    return generateImageUrl(prompt);
  }
  // pass context to Gemini function if you want context usage
  return await getReplyFromGemini(prompt, context);
}

module.exports = { getReply };
