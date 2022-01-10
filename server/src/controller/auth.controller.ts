import { Request, Response } from "express";
import config from "config";
import { CreateSessionInput } from "../validation/auth.validationSchema";
import { findUserByEmail } from "../service/user.service";
import { signAccessToken, signRefreshToken } from "../service/auth.service";

export async function createUserSessionHandler(
  req: Request<unknown, unknown, CreateSessionInput>,
  res: Response
) {
  const { email, password } = req.body;
  const userAgent = req.headers["user-agent"] || "";

  const user = await findUserByEmail(email);

  if (!user) {
    return res.send('"Invalid email or password"');
  }

  // Check if user is verified
  if (!user.verified) {
    return res.send("Please verify your email");
  }

  // Validate user password
  const isValid = await user.validatePassword(
    user.salt + password + config.get<string>("pepper")
  );

  if (!isValid) {
    return res.send('"Invalid email or password"');
  }

  // Sign a access token
  const accessToken = signAccessToken(user);

  // Sign a refresh token
  const refreshToken = await signRefreshToken(user._id, userAgent);

  // Send the tokens
  return res.send({
    accessToken,
    refreshToken,
  });
}
