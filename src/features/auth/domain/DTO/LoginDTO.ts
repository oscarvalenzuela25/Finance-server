import { FastifyRequest } from "fastify";

export class LoginDTO {
  public email: string;
  public password: string;

  constructor(
    req: FastifyRequest<{ Body: { email: string; password: string } }>
  ) {
    this.email = req.body?.email;
    this.password = req.body?.password;
  }
}
