import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../models/session.model";
import { signJwt, verifyJwt } from "../utils/jwt";
import { get } from "lodash";
import { findUserById } from "./user.service";
import config from "config";

export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({
    user: userId,
    userAgent,
  });
  return session.toJSON();
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
  return SessionModel.find(query).lean();
}

export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return SessionModel.updateOne(query, update);
}

// Reissue access token if it is expired
export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  // Verify refresh token
  const { decoded } = verifyJwt(refreshToken, "refreshTokenPublicKey");

  // If refresh token is expired, return false
  if (!decoded || !get(decoded, "session")) return false;

  // Find session by session id
  const session = await SessionModel.findById(get(decoded, "session"));

  // If session is not found, return false
  if (!session || !session.valid) return false;

  // Find user by user id
  const user = await findUserById(session.user);

  // If user is not found, return false
  if (!user) return false;

  // If session and user is valid, reissue access token
  return signJwt(
    {
      user: user._id,
      username: user.username,
      email: user.email,
      session: session._id,
    },
    "accessTokenPrivateKey",
    { expiresIn: config.get("accessTokenTtl") } // 15 minutes,
  );
}
