import express from "express";
import "dotenv/config";
import config from "config";
import connectDB from "./utils/db";
import logger from "./utils/logger";
import router from "./routes";

const app = express();
app.use(express.json());

const port = config.get<number>("port");

// all routes prefixed with /api
app.use("/api", router);

app.listen(port, () => {
  logger.info(`Server running on port ${port}`);

  void connectDB();
});
