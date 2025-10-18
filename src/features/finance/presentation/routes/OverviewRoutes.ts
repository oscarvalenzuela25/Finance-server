import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import authValidation from "../../../../middleware/authValidation";
import { FinanceRepository } from "../../infrastructure/repository/FinanceRepository";
import { GetOverviewUseCase } from "../../application/useCases/overview/GetOverviewUseCase";
import { AuthRepository } from "../../../auth/infrastructure/repository/AuthRepository";
import { OverviewController } from "../controllers/OverviewController";

const OverviewRoutes = async (app: FastifyInstance) => {
  const authRepository = new AuthRepository();
  const financeRepository = new FinanceRepository();
  const getOverviewUseCase = new GetOverviewUseCase(
    authRepository,
    financeRepository
  );
  const overViewController = new OverviewController(getOverviewUseCase);

  app.get(
    "/overview",
    {
      preHandler: [authValidation],
      schema: {
        tags: ["Finance"],
        summary: "Obtener resumen financiero del usuario",
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            description: "Resumen actualizado",
            type: "object",
            required: [
              "id",
              "user_id",
              "current_balance",
              "income_balance",
              "expenses_balance",
            ],
            properties: {
              id: { type: "string", format: "uuid" },
              user_id: { type: "string", format: "uuid" },
              current_balance: { type: "string" },
              income_balance: { type: "string" },
              expenses_balance: { type: "string" },
            },
          },
          401: {
            description: "Sin autorizacion",
            type: "object",
            properties: {
              error: { type: "string" },
            },
          },
          500: {
            description: "Error interno",
            type: "object",
            properties: {
              error: { type: "string" },
            },
          },
        },
      },
    },
    async (req: FastifyRequest, reply: FastifyReply) => {
      return overViewController.getOverview(req, reply);
    }
  );
};

export default OverviewRoutes;
