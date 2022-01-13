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

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyJwt(refreshToken, "refreshTokenPublicKey");

  if (!decoded || !get(decoded, "session")) return false;

  const session = await SessionModel.findById(get(decoded, "session"));

  if (!session || !session.valid) return false;

  const user = await findUserById(session.user);

  if (!user) return false;

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

  return accessToken;
}

// export async function signRefreshToken(userId: string, userAgent: string) {
//   // const session = await createSession(userId, userAgent);
//
//   const refreshToken = signJwt(
//     {
//       session: session._id,
//     },
//     "refreshTokenPrivateKey",
//     {
//       expiresIn: "1y",
//     }
//   );
//
//   return refreshToken;
// }

// export function signAccessToken(user: UserDocument) {
//   const { _id, username, role } = user;
//
//   const accessToken = signJwt(
//     { _id, username, role },
//     "accessTokenPrivateKey",
//     {
//       expiresIn: "15m",
//     }
//   );
//
//   return accessToken;
// }
