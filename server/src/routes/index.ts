import express from "express";
import user from "./user.route";
import auth from "./auth.route";

const router = express.Router();

router.get("/healthcheck", (_, res) => res.sendStatus(200));

router.use("/user", user);

router.use("/session", auth);

export default router;
