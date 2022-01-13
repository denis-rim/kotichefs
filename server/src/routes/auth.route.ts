import express from "express";
import validateResource from "../middleware/validateResource";
import { createSessionSchema } from "../validation/auth.validationSchema";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionsHandler,
} from "../controller/auth.controller";
import requireUser from "../middleware/requireUser";

const router = express.Router();

router.post(
  "/",
  validateResource(createSessionSchema),
  createUserSessionHandler
);

router.get("/sessions", requireUser, getUserSessionsHandler);

router.delete("/sessions", requireUser, deleteSessionHandler);

export default router;
