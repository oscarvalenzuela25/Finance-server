import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import authValidation from "../../../../middleware/authValidation";
import { FinanceRepository } from "../../infrastructure/repository/FinanceRepository";
import { GetBudgetsUseCase } from "../../application/useCases/budgets/GetBudgetsUseCase";
import { BudgetsController } from "../controllers/BudgetsController";

const BudgetRoutes = async (app: FastifyInstance) => {
  const financeRepository = new FinanceRepository();
  const getBudgetsUseCase = new GetBudgetsUseCase(financeRepository);
  const budgetsController = new BudgetsController(getBudgetsUseCase);

  app.get(
    "/budgets",
    {
      preHandler: [authValidation],
      schema: {
        tags: ["Finance"],
        summary: "Obtener presupuestos del usuario autenticado",
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            description: "Listado de presupuestos con totales",
            type: "object",
            required: ["limit_amount", "current_amount", "budgets"],
            properties: {
              limit_amount: { type: "number" },
              current_amount: { type: "number" },
              budgets: {
                type: "array",
                items: {
                  type: "object",
                  required: ["id", "category_id", "maximum", "theme"],
                  properties: {
                    id: { type: "string", format: "uuid" },
                    user_id: {
                      anyOf: [
                        { type: "string", format: "uuid" },
                        { type: "null" },
                      ],
                    },
                    category_id: { type: "string", format: "uuid" },
                    maximum: { type: "string" },
                    theme: { type: "string" },
                    category: {
                      type: "object",
                      properties: {
                        id: { type: "string", format: "uuid" },
                        key: { type: "string" },
                        transactions: {
                          type: "array",
                          items: {
                            type: "object",
                            required: [
                              "id",
                              "category_id",
                              "name",
                              "transaction_date",
                              "amount",
                            ],
                            properties: {
                              id: { type: "string", format: "uuid" },
                              category_id: { type: "string", format: "uuid" },
                              name: { type: "string" },
                              transaction_date: {
                                type: "string",
                                format: "date-time",
                              },
                              amount: { type: "string" },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
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
    (req: FastifyRequest, reply: FastifyReply) => {
      return budgetsController.getBudgets(req, reply);
    }
  );
};

export default BudgetRoutes;
