import jwt, { type SignOptions } from "jsonwebtoken";
import envs from "./envs";

type JwtPayload = Record<string, unknown> & { sub: string };

const accessSecret = envs.JWT_ACCESS_SECRET;
const refreshSecret = envs.JWT_REFRESH_SECRET;
const accessExp = envs.JWT_ACCESS_EXPIRES as SignOptions["expiresIn"];
const refreshExp = envs.JWT_REFRESH_EXPIRES as SignOptions["expiresIn"];

export const signAccess = (payload: JwtPayload) => {
  return jwt.sign(payload, accessSecret, { expiresIn: accessExp });
};

export const signRefresh = (payload: JwtPayload) => {
  return jwt.sign(payload, refreshSecret, { expiresIn: refreshExp });
};

export const verifyAccess = (token: string) => {
  return jwt.verify(token, accessSecret) as JwtPayload;
};
export const verifyRefresh = (token: string) => {
  return jwt.verify(token, refreshSecret) as JwtPayload;
};
