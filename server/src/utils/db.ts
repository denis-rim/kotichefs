import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

async function connectDB() {
  try {
    const dbUri = config.get<string>("mongoDBUri");
    await mongoose.connect(dbUri);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("Error connecting to MongoDB: ", error);
    process.exit(1);
  }
}

export default connectDB;
