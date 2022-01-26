import { object, string, number, TypeOf } from "zod";

const payload = {
  body: object({
    user: string({
      required_error: "User is required",
    }),
    name: string({
      required_error: "Name is required",
    })
      .min(2, "Name must be at least 2 characters long")
      .max(25, "Name must be at most 25 characters long"),
    description: string({
      required_error: "Description is required",
    })
      .min(2, "Description must be at least 2 characters long")
      .max(500, "Description must be at most 500 characters long"),
    price: number({
      required_error: "Price is required",
    }),
    image: string({
      required_error: "Image is required",
    }),
    ingredients: string({
      required_error: "Ingredients is required",
    })
      .min(2, "Ingredients must be at least 2 characters long")
      .max(200, "Ingredients must be at most 200 characters long"),
  }),
};

const paramsProductId = {
  params: object({
    productId: string({
      required_error: "ProductId is required",
    }),
  }),
};

const paramsProductsPage = {
  query: object({
    page: string().optional(),
  }),
};

export const createProductSchema = object({
  ...payload,
});

export const getAllProductSchema = object({
  ...paramsProductsPage,
});

export const getProductSchema = object({
  ...paramsProductId,
});

export const updateProductSchema = object({
  ...payload,
  ...paramsProductId,
});

export const deleteProductSchema = object({
  ...paramsProductId,
});

export type CreateProductInput = TypeOf<typeof createProductSchema>["body"];
export type GetProductInput = TypeOf<typeof getProductSchema>["params"];
export type GetAllProductInput = TypeOf<typeof getAllProductSchema>["query"];
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>["params"];
