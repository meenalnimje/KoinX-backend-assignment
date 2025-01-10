const mongoose = require("mongoose");
const dataFetching=require("./utils/bgJob")
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://21mm02007:21mm02007@cluster0.cpreblc.mongodb.net/");
    dataFetching()
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
