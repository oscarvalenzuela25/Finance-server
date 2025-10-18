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
    {
      schema: {
        tags: ["Auth"],
        summary: "Iniciar sesion",
        body: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email" },
            password: { type: "string", minLength: 1 },
          },
        },
        response: {
          200: {
            description: "Credenciales validas",
            type: "object",
            required: ["user", "accessToken", "refreshToken"],
            properties: {
              user: {
                type: "object",
                required: ["id", "name", "email"],
                properties: {
                  id: { type: "string", format: "uuid" },
                  name: { type: "string" },
                  email: { type: "string", format: "email" },
                },
              },
              accessToken: { type: "string" },
              refreshToken: { type: "string" },
            },
          },
          401: {
            description: "Credenciales invalidas",
            type: "object",
            properties: {
              error: { type: "string" },
            },
          },
        },
      },
    },
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
    {
      schema: {
        tags: ["Auth"],
        summary: "Registrar un nuevo usuario",
        body: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string", minLength: 1 },
            email: { type: "string", format: "email" },
            password: { type: "string", minLength: 6 },
          },
        },
        response: {
          200: {
            description: "Usuario creado",
            type: "object",
            required: ["user", "accessToken", "refreshToken"],
            properties: {
              user: {
                type: "object",
                required: ["id", "name", "email"],
                properties: {
                  id: { type: "string", format: "uuid" },
                  name: { type: "string" },
                  email: { type: "string", format: "email" },
                },
              },
              accessToken: { type: "string" },
              refreshToken: { type: "string" },
            },
          },
          400: {
            description: "Solicitud invalida",
            type: "object",
            properties: {
              error: { type: "string" },
            },
          },
        },
      },
    },
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
    {
      schema: {
        tags: ["Auth"],
        summary: "Refrescar par de tokens",
        body: {
          type: "object",
          required: ["refreshToken"],
          properties: {
            refreshToken: { type: "string" },
          },
        },
        response: {
          200: {
            description: "Par de tokens renovado",
            type: "object",
            required: ["accessToken", "refreshToken"],
            properties: {
              accessToken: { type: "string" },
              refreshToken: { type: "string" },
            },
          },
          401: {
            description: "Token invalido",
            type: "object",
            properties: {
              error: { type: "string" },
            },
          },
        },
      },
    },
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
