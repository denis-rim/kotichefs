import { User } from "../models/user.model";
import { CreateUserInput } from "../validation/user.validationSchema";

export async function createUser(input: CreateUserInput) {
  try {
    return await User.create(input);
    // eslint-disable-next-line
  } catch (err: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    throw new Error(err);
  }
}
