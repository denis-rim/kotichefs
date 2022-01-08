import { Request, Response } from "express";
import config from "config";
import { CreateSessionInput } from "../validation/auth.validationSchema";
import { findUserByEmail } from "../service/user.service";
import { signAccessToken, signRefreshToken } from "../service/auth.service";

export async function createSessionHandler(
  req: Request<unknown, unknown, CreateSessionInput>,
  res: Response
) {
  const { email, password } = req.body;

  console.log(email, password);

  const user = await findUserByEmail(email);

  console.log(user);

  if (!user) {
    return res.send('"Invalid email or password"');
  }

  if (!user.verified) {
    return res.send("Please verify your email");
  }

  const isValid = await user.validatePassword(
    user.salt + password + config.get<string>("pepper")
  );

  if (!isValid) {
    return res.send('"Invalid email or password"');
  }

  // sign a access token
  const accessToken = signAccessToken(user);

  // sign a refresh token
  const refreshToken = await signRefreshToken({
    // Because of bug: https://github.com/Automattic/mongoose/pull/11124/files
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    userId: user._id,
  });

  // send the tokens

  return res.send({
    accessToken,
    refreshToken,
  });
}
