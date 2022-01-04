import { UserModel } from "../models/user.model";
import { CreateUserInput } from "../validation/user.validationSchema";

export async function createUser(input: CreateUserInput["body"]) {
  try {
    return await UserModel.create(input);
  } catch (err: any) {
    throw new Error(err);
  }
}
