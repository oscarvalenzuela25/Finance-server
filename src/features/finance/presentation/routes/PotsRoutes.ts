import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import authValidation from "../../../../middleware/authValidation";
import { FinanceRepository } from "../../infrastructure/repository/FinanceRepository";
import { GetPotsUseCase } from "../../application/useCases/pots/GetPotsUseCase";
import { PotsController } from "../controllers/PotsController";

const PotsRouter = (app: FastifyInstance) => {
  const financeRepository = new FinanceRepository();
  const getPotsUseCase = new GetPotsUseCase(financeRepository);
  const potsController = new PotsController(getPotsUseCase);

  app.get(
    "/pots",
    {
      preHandler: [authValidation],
      schema: {
        tags: ["Finance"],
        summary: "Obtener pots del usuario autenticado",
        security: [{ bearerAuth: [] }],
        querystring: {
          type: "object",
          properties: {
            limit: {
              type: "integer",
              minimum: 1,
              description: "Limitar la cantidad de pots devueltos",
            },
          },
        },
        response: {
          200: {
            description: "Listado de pots con el total ahorrado",
            type: "object",
            required: ["total_saved", "pots"],
            properties: {
              total_saved: { type: "number" },
              pots: {
                type: "array",
                items: {
                  type: "object",
                  required: [
                    "id",
                    "user_id",
                    "name",
                    "target_value",
                    "current_value",
                  ],
                  properties: {
                    id: { type: "string", format: "uuid" },
                    user_id: { type: "string", format: "uuid" },
                    name: { type: "string" },
                    target_value: { type: "string" },
                    current_value: { type: "string" },
                    theme: { type: ["string", "null"] },
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
    async (req: FastifyRequest, reply: FastifyReply) => {
      return potsController.getPots(req, reply);
    }
  );
};

export default PotsRouter;
