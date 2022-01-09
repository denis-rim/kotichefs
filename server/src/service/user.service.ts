import UserModel,{  UserDocument } from "../models/user.model";

export function createUser(input: Partial<UserDocument>) {
  return UserModel.create(input);
}

export function findUserById(id: string) {
  return UserModel.findById(id);
}

export function findUserByEmail(email: string) {
  return UserModel.findOne({ email });
}

export function findUserByResetCode(resetCode: string) {
  return UserModel.findOne({ passwordResetCode: resetCode });
}
