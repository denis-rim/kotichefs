import { Request, Response } from "express";
import {
  CreateProductInput,
  DeleteProductInput,
  GetProductInput,
  UpdateProductInput,
} from "../validation/product.validationSchema";
import { MyResponseLocals } from "../middleware/requireUser";
import logger from "../utils/logger";
import {
  createProduct,
  deleteProduct,
  findAndUpdateProduct,
  findProduct,
  getAllProducts,
} from "../service/product.service";
import { findUserById } from "../service/user.service";

// Create a new product
export async function createProductHandler(
  req: Request<unknown, unknown, CreateProductInput>,
  res: Response<unknown, MyResponseLocals>
) {
  try {
    const userId = res.locals.user.user;
    const body = req.body;

    // Check if user is have chef status
    const user = await findUserById(userId);

    // Check if user is have chef or admin status, if not return 403
    if (user && user.role !== "chef" && user.role !== "admin") {
      return res.status(403).send("You are not allowed to create product");
    }

    // Create product
    const product = await createProduct({ ...body, user: userId });

    // Return created product
    return res.send(product);
  } catch (err) {
    logger.error(err);

    let errorMessage = "Something went wrong.";

    if (err instanceof Error) {
      errorMessage += "Error: " + err.message;
    }

    return res.status(500).send(errorMessage);
  }
}

// TODO: Add pagination
export async function getAllProductsHandler(_req: Request, res: Response) {
  try {
    // Get all products
    const products = await getAllProducts();

    // If products not found return 404
    if (!products) {
      return res.status(404).send("Products not found");
    }

    // Return products
    return res.send(products);
  } catch (err) {
    logger.error(err);

    let errorMessage = "Something went wrong.";

    if (err instanceof Error) {
      errorMessage += "Error: " + err.message;
    }

    return res.status(500).send(errorMessage);
  }
}

export async function getProductHandler(
  req: Request<GetProductInput>,
  res: Response<unknown, MyResponseLocals>
) {
  try {
    const productId = req.params.productId;

    // Get product
    const product = await findProduct({ productId });

    // If product not found return 404
    if (!product) {
      return res.status(404).send("Product not found");
    }

    // Return product
    return res.send(product);
  } catch (err) {
    logger.error(err);

    let errorMessage = "Something went wrong.";

    if (err instanceof Error) {
      errorMessage += "Error: " + err.message;
    }

    return res.status(500).send(errorMessage);
  }
}

export async function updateProductHandler(
  req: Request<
    UpdateProductInput["params"],
    unknown,
    UpdateProductInput["body"]
  >,
  res: Response<unknown, MyResponseLocals>
) {
  try {
    const userId = res.locals.user.user;
    const productId = req.params.productId;
    const updateBody = req.body;

    // Find product by id
    const product = await findProduct({ productId });

    // If product not found return 404
    if (!product) {
      return res.status(404).send("Product not found");
    }

    // Check if user is creator of product
    if (String(product.user) !== userId) {
      return res.status(403).send("You are not allowed to update this product");
    }

    // Update product
    const updatedProduct = await findAndUpdateProduct(
      { productId },
      updateBody,
      { new: true }
    );

    return res.send(updatedProduct);
  } catch (err) {
    logger.error(err);

    let errorMessage = "Something went wrong.";

    if (err instanceof Error) {
      errorMessage += "Error: " + err.message;
    }

    return res.status(500).send(errorMessage);
  }
}

export async function deleteProductHandler(
  req: Request<DeleteProductInput>,
  res: Response<unknown, MyResponseLocals>
) {
  try {
    const userId = res.locals.user.user;
    const productId = req.params.productId;

    // Find product by id
    const product = await findProduct({ productId });

    // If product not found return 404
    if (!product) {
      return res.status(404).send("Product not found");
    }

    // Check if user is creator of product
    if (String(product.user) !== userId) {
      return res.status(403).send("You are not allowed to delete this product");
    }

    //  Delete product
    await deleteProduct({ productId });

    return res.sendStatus(200);
  } catch (err) {
    logger.error(err);

    let errorMessage = "Something went wrong.";

    if (err instanceof Error) {
      errorMessage += "Error: " + err.message;
    }

    return res.status(500).send(errorMessage);
  }
}
