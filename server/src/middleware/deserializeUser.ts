import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";
// import { get } from "lodash";
import { reIssueAccessToken } from "../service/auth.service";
import config from "config";

// Extract access token from authorization header or cookies
const accessTokenExtractor = (req: Request) => {
  const authorization = req.get("authorization");
  const cookies = req.get("cookies.accessToken");

  if (authorization && authorization.toLowerCase().startsWith("bearer "))
    return authorization.substring(7);

  if (cookies) return cookies;

  return null;
};

// Extract refresh token from header or cookies
const refreshTokenExtractor = (req: Request) => {
  const cookiesFromHeaders = req.headers["x-refresh"];
  const cookies = req.get("cookies.refreshToken");

  if (cookiesFromHeaders && cookiesFromHeaders)
    return cookiesFromHeaders as string;

  if (cookies) return cookies;
  return null;
};

// Extract user id from header or cookies (if access token or refresh is valid)
// and put it in req.locals.user
const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = accessTokenExtractor(req);
  const refreshToken = refreshTokenExtractor(req);

  if (!accessToken) {
    return next();
  }

  // Verify access token
  const { decoded, expired } = verifyJwt(accessToken, "accessTokenPublicKey");

  console.log(decoded);

  // If access token is valid, put user in req.locals
  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  // If access token is expired, try to refresh it
  if (refreshToken && expired) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);

      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: config.get("accessTokenTtl"),
        domain: config.get("cookieDomain"),
        path: "/",
        sameSite: "strict",
        secure: config.get("cookieSecure"),
      });

      const result = verifyJwt(newAccessToken, "accessTokenPublicKey");

      res.locals.user = result.decoded;
      return next();
    }
  }

  return next();
};

export default deserializeUser;
