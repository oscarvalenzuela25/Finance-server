import fastify from "fastify";
import cors from "@fastify/cors";
import envs from "./envs";
import AuthRoutes from "../features/auth/presentation/routes";
import FinanceRoutes from "../features/finance/presentation/routes";

const server = async () => {
  const server = fastify({ logger: true });

  const origins = envs.CORS_ORIGIN?.split(",").map((o) => o.trim());
  await server.register(cors, {
    origin: origins && origins.length > 0 ? origins : true, // true = permite todos
  });

  server.get("/", async () => {
    return { message: "Hola mundo 👋" };
  });
  server.register(FinanceRoutes, { prefix: "/api/v1/finance" });
  server.register(AuthRoutes, { prefix: "/api/v1/auth" });

  // Levantar servidor
  const port = +envs.PORT || 3000;
  await server.listen({ port });
  console.log(`Servidor corriendo en http://localhost:${port}`);
};

export default server;
