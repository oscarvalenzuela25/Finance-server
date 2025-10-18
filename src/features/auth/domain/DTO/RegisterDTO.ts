import { FastifyRequest } from "fastify";

export class RegisterDTO {
  public name: string;
  public email: string;
  public password: string;

  constructor(
    req: FastifyRequest<{
      Body: { name: string; email: string; password: string };
    }>
  ) {
    this.name = req.body.name;
    this.email = req.body.email;
    this.password = req.body.password;
  }
}
