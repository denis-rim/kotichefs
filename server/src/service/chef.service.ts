import UserModel from "../models/user.model";

export function getPromotedChefs() {
  return UserModel.find({ promoted: true }).select({
    fullName: 1,
    photo_url: 1,
    cuisine: 1,
    about: 1,
  });
}

export function getAllChefs() {
  return UserModel.find().select({
    fullName: 1,
    photo_url: 1,
    cuisine: 1,
    about: 1,
  });
}

export function getChefById(id: string) {
  return UserModel.findById(id).select({
    fullName: 1,
    photo_url: 1,
    cuisine: 1,
    about: 1,
    rating: 1,
  });
}