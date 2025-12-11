// // backend/config/db.js
// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     const uri = process.env.MONGO_URI || "mongodb://localhost:27017/chatbot";
//     await mongoose.connect(uri);
//     console.log("✅ MongoDB Connected");
//   } catch (err) {
//     console.error("❌ MongoDB Error:", err.message || err);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;


// backend/config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || "mongodb://localhost:27017/chatbot";
    await mongoose.connect(uri);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Error:", err.message || err);
    process.exit(1);
  }
};

module.exports = connectDB;
