import UserModel from "../models/user.model";

export function getPromotedChefs() {
  return UserModel.find({ promoted: true });
}
