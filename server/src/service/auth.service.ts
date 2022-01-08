import { FilterQuery, UpdateQuery } from "mongoose";
import { SessionDocument, SessionModel } from "../models/session.model";
import { UserDocument } from "../models/user.model";
import { signJwt } from "../utils/jwt";

export async function createSession({ userId }: { userId: string }) {
  return await SessionModel.create({ user: userId });
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

export async function signRefreshToken({ userId }: { userId: string }) {
  const session = await createSession({ userId });

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
  const payload = user.toJSON();

  // console.log("PAYLOAD: ", payload);

  const accessToken = signJwt(payload, "accessTokenPrivateKey", {
    expiresIn: "15m",
  });

  return accessToken;
}
