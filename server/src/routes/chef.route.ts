import express from "express";
import validateResource from "../middleware/validateResource";
import { getChefInputSchema } from "../validation/chef.validationSchema";
import { getPromotedChefsHandler } from "../controller/chef.controller";

const router = express.Router();

// Get all promoted chefs
router.get(
  "/promoted",
  validateResource(getChefInputSchema),
  getPromotedChefsHandler
);

export default router;
