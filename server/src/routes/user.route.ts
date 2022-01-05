import express from "express";
import {
  createUserInputSchema,
  verificationUserSchema,
} from "../validation/user.validationSchema";
import validateResource from "../middleware/validateResource";
import {
  createUserHandler,
  verifyEmailHandler,
} from "../controller/user.controller";

const router = express.Router();

router.post(
  "/register",
  validateResource(createUserInputSchema),
  createUserHandler
);

router.get(
  "/verify-email/:id/:verificationString",
  validateResource(verificationUserSchema),
  verifyEmailHandler
);

export default router;
