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

export type CreateUserInput = TypeOf<typeof createUserInputSchema>["body"];
export type VerifyUserInput = TypeOf<typeof verificationUserSchema>["params"];
export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>["body"];
export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;
