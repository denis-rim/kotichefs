import express from "express";
import "dotenv/config";
import config from "config";
import connectDB from "./utils/db";
import logger from "./utils/logger";
import router from "./routes";

const app = express();

// This allows us to access the body of POST/PUT
// requests in our route handlers (as req.body)
app.use(express.json());

const port = config.get<number>("port");

// Add all the routes to our Express server
// exported from routes/index.ts
// all routes prefixed with /api
app.use("/api", router);

app.listen(port, () => {
  logger.info(`Server running on port ${port}`);

  void connectDB();
});
