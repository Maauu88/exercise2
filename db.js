import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://mauribalderas495:gIi6rcJqNqbJPWVY@cluster0.boo7tle.mongodb.net/";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected Succesfully");
  } catch (error) {
    console.error("Mongo db conection filed", error);
  }
};
