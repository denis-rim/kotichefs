import { Request, Response } from "express";
import { createUser } from "../service/user.service";
import logger from "../utils/logger";
import { CreateUserInput } from "../validation/user.validationSchema";

export const createUserHandler = async (
  req: Request<unknown, unknown, CreateUserInput["body"]>,
  res: Response
) => {
  const body = req.body;
  try {
    const user = await createUser(body);

    return res.status(201).send(user);
  } catch (err: any) {
    logger.error(err);
    if (err.message.includes("E11000")) {
      return res.status(409).send("Account already exists");
    }

    return res.status(500).send(err.message);
  }
};
