import config from "config";
import { Request, Response } from "express";
import { CreateSessionInput } from "../validation/auth.validationSchema";
import { findUserByEmail } from "../service/user.service";
import {
  createSession,
  findSessions,
  updateSession,
} from "../service/auth.service";
import { signJwt } from "../utils/jwt";
import logger from "../utils/logger";
import { MyResponseLocals } from "../middleware/requireUser";

export async function createUserSessionHandler(
  req: Request<unknown, unknown, CreateSessionInput>,
  res: Response
) {
  const { email, password } = req.body;
  const userAgent = req.headers["user-agent"] || "";

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    // Validate user password
    const isValid = await user.validatePassword(
      user.salt + password + config.get<string>("pepper")
    );

    // Check if user is verified
    if (!user.verified) {
      return res.send("Please verify your email");
    }

    if (!isValid) {
      return res.status(401).send("Invalid email or password");
    }

    // Create a session
    const session = await createSession(user._id, userAgent);

    // Sign access token
    const accessToken = signJwt(
      {
        user: user._id,
        username: user.username,
        email: user.email,
        session: session._id,
      },
      "accessTokenPrivateKey",
      { expiresIn: config.get("accessTokenTtl") } // 15 minutes,
    );

    // Sign a refresh token
    const refreshToken = signJwt(
      { user: user._id, session: session._id },
      "refreshTokenPrivateKey",
      { expiresIn: config.get("refreshTokenTtl") } // 1 year
    );

    // Set access token cookie and refresh token cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: config.get("accessTokenTtl"),
      domain: config.get("cookieDomain"),
      path: "/",
      sameSite: "strict",
      secure: config.get("cookieSecure"),
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: config.get("refreshTokenTtl"),
      domain: config.get("cookieDomain"),
      path: "/",
      sameSite: "strict",
      secure: config.get("cookieSecure"),
    });

    // Send the tokens
    return res.send({
      accessToken,
      refreshToken,
    });
  } catch (err) {
    logger.error(err);

    let errorMessage = "Something went wrong.";

    if (err instanceof Error) {
      errorMessage += "Error: " + err.message;
    }

    return res.status(500).send(errorMessage);
  }
}

export async function getUserSessionsHandler(
  _req: Request,
  res: Response<unknown, MyResponseLocals>
) {
  const userId = res.locals.user.user;

  try {
    const sessions = await findSessions({ user: userId, valid: true });

    return res.send(sessions);
  } catch (err) {
    logger.error(err);

    let errorMessage = "Something went wrong.";

    if (err instanceof Error) {
      errorMessage += "Error: " + err.message;
    }

    return res.status(500).send(errorMessage);
  }
}

export async function deleteSessionHandler(
  _req: Request,
  res: Response<unknown, MyResponseLocals>
) {
  const sessionId = res.locals.user.session;

  try {
    await updateSession({ _id: sessionId }, { valid: false });

    return res.send({
      accessToken: null,
      refreshToken: null,
    });
  } catch (err) {
    logger.error(err);

    let errorMessage = "Something went wrong.";

    if (err instanceof Error) {
      errorMessage += "Error: " + err.message;
    }

    return res.status(500).send(errorMessage);
  }
}
