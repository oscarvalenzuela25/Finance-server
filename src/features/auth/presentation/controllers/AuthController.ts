import { FastifyReply, FastifyRequest } from "fastify";
import { LoginUseCase } from "../../application/useCases/LoginUseCase";
import { LoginDTO } from "../../domain/DTO/LoginDTO";
import { RegisterDTO } from "../../domain/DTO/RegisterDTO";
import { RegisterUseCase } from "../../application/useCases/RegisterUseCase";
import { RefreshUseCase } from "../../application/useCases/RefreshUseCase";

export class AuthController {
  constructor(
    private loginUseCase: LoginUseCase,
    private registerUseCase: RegisterUseCase,
    private refreshUseCase: RefreshUseCase
  ) {}

  async login(
    req: FastifyRequest<{ Body: { email: string; password: string } }>,
    reply: FastifyReply
  ) {
    const dto = new LoginDTO(req);
    const response = await this.loginUseCase.execute(dto);
    reply.send(response);
  }

  async register(
    req: FastifyRequest<{
      Body: { name: string; email: string; password: string };
    }>,
    reply: FastifyReply
  ) {
    const dto = new RegisterDTO(req);
    const response = await this.registerUseCase.execute(dto);
    reply.send(response);
  }

  async refresh(
    req: FastifyRequest<{ Body: { refreshToken: string } }>,
    reply: FastifyReply
  ) {
    const response = await this.refreshUseCase.execute(req.body.refreshToken);
    reply.send(response);
  }
}
