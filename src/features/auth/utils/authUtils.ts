import { signAccess, signRefresh } from "../../../config/jwt";
import { User } from "../../../types/globals";

export const issuePair = (user: User) => {
  const accessToken = signAccess({
    sub: user.id,
    email: user.email,
    name: user.name,
  });
  const refreshToken = signRefresh({ sub: user.id });
  return { accessToken, refreshToken };
};

export const publicUser = (u: User) => {
  return { id: u.id, name: u.name, email: u.email };
};
