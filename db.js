const mongoose = require("mongoose");
const URI = "mongodb://127.0.0.1:27017/AndalusDB";

const connectDB = async () => {
  try {
    const db = await mongoose.connect(URI);
    console.log(`MongoDB Connected: ${db.connection.host}`);
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
