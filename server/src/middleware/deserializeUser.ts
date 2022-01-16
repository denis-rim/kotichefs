import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";
import { get } from "lodash";
import { reIssueAccessToken } from "../service/auth.service";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = (req.headers.authorization || "").replace(
    /^Bearer\s/,
    ""
  );
  const refreshToken = (get(req, "headers.x-refresh") as string) || undefined;

  if (accessToken === "" && !refreshToken) {
    return next();
  }

  const { decoded, expired } = verifyJwt(accessToken, "accessTokenPublicKey");

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (refreshToken && expired) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);

      const result = verifyJwt(newAccessToken, "accessTokenPublicKey");

      res.locals.user = result.decoded;
      return next();
    }
  }

  return next();
};

export default deserializeUser;
