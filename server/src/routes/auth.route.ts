import express from "express";
import validateResource from "../middleware/validateResource";
import { createSessionSchema } from "../validation/auth.validationSchema";
import { createSessionHandler } from "../controller/auth.controller";

const router = express.Router();

router.post("/", validateResource(createSessionSchema), createSessionHandler);

export default router;
