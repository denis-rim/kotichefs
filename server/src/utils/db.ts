import mongoose from "mongoose";
import config from "config";

async function connectDB() {
  const dbUri = config.get<string>("mongoDBUri");

  try {
    await mongoose.connect(dbUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
    process.exit(1);
  }
}

export default connectDB;
