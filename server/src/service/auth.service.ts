import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../models/session.model";
import { UserDocument } from "../models/user.model";
import { signJwt } from "../utils/jwt";

export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({
    user: userId,
    userAgent,
  });
  return session.toJSON();
}

export async function findSession(query: FilterQuery<SessionDocument>) {
  return SessionModel.find(query).lean();
}

export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return SessionModel.updateOne(query, update);
}

export async function signRefreshToken(userId: string, userAgent: string) {
  const session = await createSession(userId, userAgent);

  const refreshToken = signJwt(
    {
      session: session._id,
    },
    "refreshTokenPrivateKey",
    {
      expiresIn: "1y",
    }
  );

  return refreshToken;
}

export function signAccessToken(user: UserDocument) {
  const { _id, username, role } = user;

  const accessToken = signJwt(
    { _id, username, role },
    "accessTokenPrivateKey",
    {
      expiresIn: "15m",
    }
  );

  return accessToken;
}
