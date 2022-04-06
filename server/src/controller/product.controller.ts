import { Request, Response } from "express";
import {
  CreateProductInput,
  DeleteProductInput,
  GetAllProductInput,
  GetProductInput,
  GetChefProductsInput,
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
  getAllProductsCount,
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

    // Check if user is had chef status
    const user = await findUserById(userId);

    // Check if user is had chef or admin status, if not return 403
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

const ITEMS_PER_PAGE = 2;

export async function getAllProductsHandler(
  req: Request<GetAllProductInput>,
  res: Response
) {
  try {
    // Get page out of query
    const page = Number(req.query.page) || 1;

    // Number of items to skip
    const skip = ITEMS_PER_PAGE * (page - 1);

    // Put all query params here
    const query = {};

    // Get all products count promise
    const countPromise = getAllProductsCount(query);

    // Get all products promise
    const productsPromise = getAllProducts(query, skip, ITEMS_PER_PAGE);

    // Get all products
    const [products, count] = await Promise.all([
      productsPromise,
      countPromise,
    ]);

    // If products not found return 404
    if (!products) {
      return res.status(404).send("Products not found");
    }

    // Count number of pages
    const pagesCount = Math.ceil(count / ITEMS_PER_PAGE);

    // Return products
    return res.send({ pagination: { count, pagesCount }, products });
  } catch (err) {
    logger.error(err);

    let errorMessage = "Something went wrong.";

    if (err instanceof Error) {
      errorMessage += "Error: " + err.message;
    }

    return res.status(500).send(errorMessage);
  }
}

export async function getProductByIdHandler(
  req: Request<GetProductInput>,
  res: Response<unknown, MyResponseLocals>
) {
  try {
    const productId = req.params.productId;

    // Get product
    const product = await findProduct({ _id: productId });

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

export async function getChefProductsHandler(
  req: Request<unknown, unknown, unknown, GetChefProductsInput>,
  res: Response
) {
  try {
    const userId = req.query.userId;
    // Get page out of query
    const page = Number(req.query.page) || 1;

    // Number of items to skip
    const skip = ITEMS_PER_PAGE * (page - 1);

    // Get all products count promise
    const countPromise = getAllProductsCount({ user: userId });

    // Get all products promise
    const productsPromise = getAllProducts(
      { user: userId },
      skip,
      ITEMS_PER_PAGE
    );

    // Get all products
    const [products, count] = await Promise.all([
      productsPromise,
      countPromise,
    ]);

    // If products not found return 404
    if (products.length === 0) {
      return res.status(404).send("Products not found");
    }

    // Count number of pages
    const pagesCount = Math.ceil(count / ITEMS_PER_PAGE);

    // Return products
    return res.send({ pagination: { count, pagesCount }, products });
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
