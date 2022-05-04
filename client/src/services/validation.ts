import { object, string, TypeOf } from "zod";

/*========== Create user schema ==========*/
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

/*========== Login user schema ==========*/
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

/*========== Edit user schema ==========*/
export const editUserSchema = object({
  username: string()
    .min(2, "Username too short - should be 2 chars minimum")
    .max(20, "Username too long - should be 20 chars maximum"),
  fullName: string()
    .min(2, "Full name too short - should be 2 chars minimum")
    .max(20, "Full name too long - should be 20 chars maximum"),
  // photo_url: string().url("Not a valid url").optional(),
  email: string().email("Not a valid email").optional(),
  phone: string().min(8, "Phone number too short - should be 8 chars minimum"),
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
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type LoginUserInput = TypeOf<typeof loginUserSchema>;
export type EditUserInput = TypeOf<typeof editUserSchema>;
