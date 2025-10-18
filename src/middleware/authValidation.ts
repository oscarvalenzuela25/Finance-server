import { FastifyReply, FastifyRequest } from "fastify";
import { verifyAccess } from "../config/jwt";

const authValidation = async (req: FastifyRequest, reply: FastifyReply) => {
  const token = req?.headers?.authorization?.split(" ")[1];
  if (!token) return reply.status(401).send({ error: "Unauthorized" });

  try {
    const payload = verifyAccess(token);
    (req as any).user = payload;
  } catch {
    return reply.status(401).send({ error: "INVALID_TOKEN" });
  }
};

export default authValidation;
