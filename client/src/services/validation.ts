import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  username: string()
    .min(2, "Username too short - should be 2 chars minimum")
    .max(20, "Username too long - should be 20 chars maximum")
    .nonempty({
      message: "Username is required",
    }),
  password: string()
    .min(6, "Password too short - should be 6 chars minimum")
    .max(35, "Password too long - should be 35 chars maximum")
    .nonempty({
      message: "Password is required",
    }),
  passwordConfirmation: string().nonempty({
    message: "Password confirmation is required",
  }),
  email: string({
    required_error: "Email is required",
  })
    .email("Not a valid email")
    .nonempty({
      message: "Email is required",
    }),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Passwords do not match",
  path: ["passwordConfirmation"],
});

export const loginUserSchema = object({
  email: string().email("Not a valid email").nonempty({
    message: "Email is required",
  }),
  password: string()
    .min(6, "Password too short - should be 6 chars minimum")
    .max(35, "Password too long - should be 35 chars maximum")
    .nonempty({
      message: "Password is required",
    }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type LoginUserInput = TypeOf<typeof loginUserSchema>;
