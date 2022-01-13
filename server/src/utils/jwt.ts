import jwt from "jsonwebtoken";
import config from "config";
import logger from "./logger";

export function signJwt(
  object: Record<string, unknown>,
  keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
  options?: jwt.SignOptions | undefined
) {
  const signingKey = config.get<string>(keyName);

  return jwt.sign(object, signingKey, {
    ...(options && options),
  });
}

export function verifyJwt<T>(
  token: string,
  keyName: "accessTokenPublicKey" | "refreshTokenPublicKey"
) {
  const publicKey = config.get<string>(keyName);

  try {
    const decoded = jwt.verify(token, publicKey) as T;

    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (err) {
    let errorMessage = "Something went wrong.";

    if (err instanceof Error) {
      errorMessage += "Error: " + err.message;
    }
    logger.error(errorMessage);

    return {
      valid: false,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expired: err.message === "jwt expired",
      decoded: null,
    };
  }
}
