import z from "zod";

export const loginSchema = z.object({
  email: z.string(),
  password: z.string().min(6),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string(),
});

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string(),
  password: z.string().min(6),
});
