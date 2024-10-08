// src/config/db.ts

import mongoose from "mongoose";

const connectDB = async () => {
  const mongoURI = "mongodb://localhost:27017/ads-dashboard"; // Replace with your MongoDB URI

  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
