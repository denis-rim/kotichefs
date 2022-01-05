import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import config from "config";
import logger from "../utils/logger";
import { CreateUserInput } from "../validation/user.validationSchema";
import { User } from "../models/user.model";

export const createUserHandler = async (
  req: Request<unknown, unknown, CreateUserInput>,
  res: Response
) => {
  const body = req.body;
  try {
    const salt = uuid();
    const pepper = config.get<string>("pepper");
    const verificationString = uuid();

    const passwordHash = await bcrypt.hash(salt + body.password + pepper, 10);

    const user = new User({
      ...body,
      password: passwordHash,
      salt,
      verificationString,
    });

    await user.save();

    return res.status(201).send(user);
  } catch (err: unknown) {
    logger.error(err);

    let errorMessage = "Something went wrong.";

    if (err instanceof Error) {
      errorMessage += " Error: " + err.message;
      if (err.message.includes("E11000")) {
        return res
          .status(409)
          .send("Account with this email or username already exists");
      }
    }

    return res.status(500).send(errorMessage);
  }
};
