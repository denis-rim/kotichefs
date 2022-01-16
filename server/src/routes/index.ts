import express from "express";
import user from "./user.route";
import auth from "./auth.route";
import product from "./product.route";

const router = express.Router();

router.get("/healthcheck", (_, res) => res.sendStatus(200));

router.use("/user", user);

router.use("/sessions", auth);

router.use("/products", product);

export default router;
