import express from "express";
import {
  createUserInputSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verificationUserSchema,
} from "../validation/user.validationSchema";
import validateResource from "../middleware/validateResource";
import {
  createUserHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
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

router.post(
  "/forgot-password",
  validateResource(forgotPasswordSchema),
  forgotPasswordHandler
);

router.post(
  "/reset-password/:passwordResetCode",
  validateResource(resetPasswordSchema),
  resetPasswordHandler
);

export default router;
