import { FastifyReply, FastifyRequest } from "fastify";
import { verifyAccess } from "../config/jwt";
import { AuthRepository } from "../features/auth/infrastructure/repository/AuthRepository";

const authValidation = async (req: FastifyRequest, reply: FastifyReply) => {
  const token = req?.headers?.authorization?.split(" ")[1];
  if (!token) return reply.status(401).send({ error: "Unauthorized" });

  try {
    const payload = verifyAccess(token);
    const authRepository = new AuthRepository();
    const user = await authRepository.getUserByEmail(payload.email as string);
    (req as any).user = user;
  } catch {
    return reply.status(401).send({ error: "INVALID_TOKEN" });
  }
};

export default authValidation;
