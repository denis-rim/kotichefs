import express from "express";
import userService from "../services/users";

const router = express.Router();

router.get("/", (_req, res) => {
  const data = userService.registerUser();
  res.status(200).json(data);
});

export default router;
