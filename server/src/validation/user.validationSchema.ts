import { object, string, TypeOf } from "zod";

export const createUserInputSchema = object({
  body: object({
    username: string({
      required_error: "Username is required",
    })
      .min(2, "Username too short - should be 2 chars minimum")
      .max(20, "Username too long - should be 20 chars maximum"),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
    password: string({
      required_error: "Password is required",
    })
      .min(6, "Password too short - should be 6 chars minimum")
      .max(35, "Password too long - should be 35 chars maximum"),
  }),
});

export const verificationUserSchema = object({
  params: object({
    id: string(),
    verificationString: string(),
  }),
});

export const forgotPasswordSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
  }),
});

export const resetPasswordSchema = object({
  params: object({
    passwordResetCode: string(),
  }),
  body: object({
    password: string({
      required_error: "Password is required",
    })
      .min(6, "Password too short - should be 6 chars minimum")
      .max(35, "Password too long - should be 35 chars maximum"),
  }),
});

/*========== Edit user schema ==========*/
export const updateUserSchema = object({
  body: object({
    photo_url: string(),
    username: string()
      .min(2, "Username too short - should be 2 chars minimum")
      .max(20, "Username too long - should be 20 chars maximum"),
    fullName: string()
      .min(2, "Full name too short - should be 2 chars minimum")
      .max(20, "Full name too long - should be 20 chars maximum"),
    email: string().email("Not a valid email").optional(),
    phone: string().min(
      8,
      "Phone number too short - should be 8 chars minimum"
    ),
    city: string()
      .min(2, "City name too short - should be 2 chars minimum")
      .max(20, "City name too long - should be 20 chars maximum"),
    address: string()
      .min(2, "Address too short - should be 2 chars minimum")
      .max(40, "Address too long - should be 40 chars maximum"),
    about: string()
      .min(2, "About too short - should be 2 chars minimum")
      .max(200, "About too long - should be 200 chars maximum")
      .optional(),
  }),
});

export type CreateUserInput = TypeOf<typeof createUserInputSchema>["body"];
export type VerifyUserInput = TypeOf<typeof verificationUserSchema>["params"];
export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>["body"];
export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;
export type UpdateUserInput = TypeOf<typeof updateUserSchema>["body"];
