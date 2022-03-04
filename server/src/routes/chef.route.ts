import express from "express";
import validateResource from "../middleware/validateResource";
import { getChefInputSchema } from "../validation/chef.validationSchema";
import {getChefByIdHandler, getPromotedChefsHandler, getAllChefsHandler} from "../controller/chef.controller";

const router = express.Router();

// Get all promoted chefs route
router.get(
  "/promoted",
  validateResource(getChefInputSchema),
  getPromotedChefsHandler
);

// Ge All chefs route
router.get(
  "/",
  validateResource(getChefInputSchema),
  getAllChefsHandler
);

// Get chef by id route
router.get("/:chefId", validateResource(getChefInputSchema), getChefByIdHandler);

export default router;
