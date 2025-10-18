import fastify from "fastify";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import envs from "./envs";
import AuthRoutes from "../features/auth/presentation/routes";
import FinanceRoutes from "../features/finance/presentation/routes";

const server = async () => {
  const server = fastify({ logger: true });
  const port = Number(envs.PORT) || 3000;

  const origins = envs.CORS_ORIGIN?.split(",").map((o) => o.trim());
  await server.register(cors, {
    origin: origins && origins.length > 0 ? origins : true, // true = permite todos
  });

  await server.register(swagger, {
    openapi: {
      info: {
        title: "Finance API",
        description: "Documentacion de la API del servidor de finanzas.",
        version: "1.0.0",
      },
      servers: [
        {
          url: `http://localhost:${port}`,
          description: "Entorno local",
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    },
  });

  await server.register(swaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: false,
    },
    staticCSP: true,
  });

  server.get("/", async () => {
    return { message: "Hola mundo!" };
  });
  server.register(FinanceRoutes, { prefix: "/api/v1/finance" });
  server.register(AuthRoutes, { prefix: "/api/v1/auth" });

  // Levantar servidor
  await server.listen({ port });
  console.log(`Servidor corriendo en http://localhost:${port}`);
};

export default server;
