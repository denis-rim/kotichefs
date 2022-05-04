import express from "express";
import {
  createUserInputSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updateUserSchema,
  verificationUserSchema,
} from "../validation/user.validationSchema";
import validateResource from "../middleware/validateResource";
import {
  createUserHandler,
  forgotPasswordHandler,
  getCurrentUserHandler,
  resetPasswordHandler,
  updateCurrentUserHandler,
  verifyEmailHandler,
} from "../controller/user.controller";
import requireUser from "../middleware/requireUser";

const router = express.Router();
// Register a new user
router.post(
  "/register",
  validateResource(createUserInputSchema),
  createUserHandler
);

// Verify user email
router.get(
  "/verify-email/:id/:verificationString",
  validateResource(verificationUserSchema),
  verifyEmailHandler
);

// Forgot user password
router.post(
  "/forgot-password",
  validateResource(forgotPasswordSchema),
  forgotPasswordHandler
);

// Reset user password
router.post(
  "/reset-password/:passwordResetCode",
  validateResource(resetPasswordSchema),
  resetPasswordHandler
);

// Get current user info
router.get("/me", requireUser, getCurrentUserHandler);

// Update user info
router.put(
  "/me",
  requireUser,
  validateResource(updateUserSchema),
  updateCurrentUserHandler
);

export default router;
