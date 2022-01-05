import express from "express";
import user from "./user.route";

const router = express.Router();

router.get("/healthcheck", (_, res) => res.sendStatus(200));

router.use("/user", user);

export default router;
