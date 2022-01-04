import { object, string, TypeOf } from "zod";

export const createUserInputSchema = object({
  body: object({
    username: string({
      required_error: "Username is required",
    }),
    fullName: string({
      required_error: "Full name is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
    password: string({
      required_error: "Name is required",
    })
      .min(6, "Password too short - should be 6 chars minimum")
      .max(35, "Password too long - should be 35 chars maximum"),
    address: string({
      required_error: "Address is required",
    }),
  }),
});

export type CreateUserInput = TypeOf<typeof createUserInputSchema>;
