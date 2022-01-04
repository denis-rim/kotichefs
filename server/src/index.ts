import express from "express";
import "dotenv/config";
import config from "config";
import connectDB from "./utils/db";
import logger from "./utils/logger";
import userRouter from "./routes/user.route";

const app = express();
app.use(express.json());

const port = config.get<number>("port");

app.get("/healthcheck", (_req, res) => {
  res.status(200).send("OK");
});

// all routes prefixed with /api
app.use("/api/user", userRouter);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.listen(port, async () => {
  logger.info(`Server running on port ${port}`);

  await connectDB();
});
