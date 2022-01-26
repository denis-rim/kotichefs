import UserModel from "../models/user.model";

export function getPromotedChefs() {
  return UserModel.find({ promoted: true }).select({
    fullName: 1,
    photo_url: 1,
    cuisine: 1,
    about: 1,
  });
}
