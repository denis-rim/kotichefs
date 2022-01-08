// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-var-requires
require("dotenv").config();
import express from "express";
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

async function start() {
  try {
    await connectDB();
    app.listen(port, () => {
      logger.info(`Server started on port ${port}`);
    });
  } catch (err: unknown) {
    let errorMessage = "Something went wrong.";

    if (err instanceof Error) {
      errorMessage += " Error: " + err.message;
    }

    logger.error(errorMessage);
  }
}

void start();

// app.listen(port, () => {
//   logger.info(`Server running on port ${port}`);
//
//   void connectDB();
// });
