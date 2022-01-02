import express from "express";
import config from "config";
import "dotenv/config";
import connectDB from "./utils/db";
import userRouter from "./routes/users";

const app = express();
app.use(express.json());

const port = config.get<number>("port");

app.use("/api/users", userRouter);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.listen(port, async () => {
  console.log(`Server running on port ${port}`);

  await connectDB();
});
