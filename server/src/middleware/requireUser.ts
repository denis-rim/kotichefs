import { Request, Response, NextFunction } from "express";

export interface MyResponseLocals {
  user: {
    user: string;
    username: string;
    email: string;
    session: string;
    iat: number;
    exp: number;
  };
}

const requireUser = (
  _req: Request,
  res: Response<unknown, MyResponseLocals>,
  next: NextFunction
) => {
  const user = res.locals.user;

  if (!user) {
    return res.sendStatus(403);
  }

  return next();
};

export default requireUser;
