import express from "express";
import user from "./user.route";
import auth from "./auth.route";
import product from "./product.route";
import chef from "./chef.route";

const router = express.Router();

router.get("/healthcheck", (_, res) => res.sendStatus(200));

router.use("/user", user);

router.use("/sessions", auth);

router.use("/products", product);

router.use("/chefs", chef);

export default router;
