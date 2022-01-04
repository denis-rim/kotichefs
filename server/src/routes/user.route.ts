import express from "express";
import { createUserInputSchema } from "../validation/user.validationSchema";
import validateResource from "../middleware/validateResource";
import { createUserHandler } from "../controller/user.controller";

const router = express.Router();

router.post(
  "/register",
  validateResource(createUserInputSchema),
  createUserHandler
);

export default router;
