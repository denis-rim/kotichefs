import express from "express";
import validateResource from "../middleware/validateResource";
import {
  createProductSchema,
  deleteProductSchema,
  getAllProductSchema,
  getProductSchema,
  updateProductSchema,
} from "../validation/product.validationSchema";
import {
  createProductHandler,
  getProductHandler,
  getAllProductsHandler,
  deleteProductHandler,
  updateProductHandler,
} from "../controller/product.controller";
import requireUser from "../middleware/requireUser";

const router = express.Router();

// Get all products route
router.get("/", validateResource(getAllProductSchema), getAllProductsHandler);

// Get product by id route
router.get(
  "/:productId",
  validateResource(getProductSchema),
  getProductHandler
);

// Create product route
router.post(
  "/",
  requireUser,
  validateResource(createProductSchema),
  createProductHandler
);

// Update product by id route
router.put(
  "/:productId",
  requireUser,
  validateResource(updateProductSchema),
  updateProductHandler
);

router.delete(
  "/:productId",
  requireUser,
  validateResource(deleteProductSchema),
  deleteProductHandler
);
export default router;
