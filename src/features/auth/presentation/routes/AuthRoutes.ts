import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { AuthController } from "../controllers/AuthController";
import { LoginUseCase } from "../../application/useCases/LoginUseCase";
import { AuthRepository } from "../../infrastructure/repository/AuthRepository";
import { RegisterUseCase } from "../../application/useCases/RegisterUseCase";
import { RefreshUseCase } from "../../application/useCases/RefreshUseCase";

const AuthRoutes = async (app: FastifyInstance) => {
  const authRepository = new AuthRepository();
  const loginUseCase = new LoginUseCase(authRepository);
  const registerUseCase = new RegisterUseCase(authRepository);
  const refreshUseCase = new RefreshUseCase(authRepository);
  const authController = new AuthController(
    loginUseCase,
    registerUseCase,
    refreshUseCase
  );

  app.post(
    "/login",
    async (
      request: FastifyRequest<{ Body: { email: string; password: string } }>,
      reply: FastifyReply
    ) => {
      const response = await authController.login(request, reply);
      return response;
    }
  );

  app.post(
    "/register",
    async (
      request: FastifyRequest<{
        Body: { name: string; email: string; password: string };
      }>,
      reply: FastifyReply
    ) => {
      const response = await authController.register(request, reply);
      return response;
    }
  );

  app.post(
    "/refresh",
    async (
      request: FastifyRequest<{ Body: { refreshToken: string } }>,
      reply: FastifyReply
    ) => {
      const response = await authController.refresh(request, reply);
      return response;
    }
  );
};

export default AuthRoutes;
