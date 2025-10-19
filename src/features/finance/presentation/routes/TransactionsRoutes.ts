import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import authValidation from "../../../../middleware/authValidation";
import { FinanceRepository } from "../../infrastructure/repository/FinanceRepository";
import { GetTransactionsByUserId } from "../../application/useCases/transactions/GetTransactionsUseCase";
import { TransactionsController } from "../controllers/TransactionsControllet";

const TransactionRoutes = async (app: FastifyInstance) => {
  const financeRepository = new FinanceRepository();
  const getTransactionsByUserId = new GetTransactionsByUserId(
    financeRepository
  );
  const transactionsController = new TransactionsController(
    getTransactionsByUserId
  );
  app.get(
    "/transactions",
    {
      preHandler: [authValidation],
      schema: {
        tags: ["Finance"],
        summary: "Listar transacciones del usuario autenticado",
        security: [{ bearerAuth: [] }],
        querystring: {
          type: "object",
          properties: {
            page: {
              type: "integer",
              minimum: 1,
              description: "Numero de pagina (paginacion).",
            },
            limit: {
              type: "integer",
              minimum: 1,
              description: "Cantidad de elementos por pagina.",
            },
            q: {
              type: "object",
              properties: {
                search: {
                  type: "string",
                  description: "Filtro por nombre o descripcion.",
                },
                sort: {
                  type: "string",
                  enum: ["asc", "desc"],
                  description: "Orden de las transacciones por fecha.",
                },
                category: {
                  type: "string",
                  description: "Filtra por identificador de categoria.",
                },
              },
            },
          },
        },
        response: {
          200: {
            description: "Transacciones encontradas",
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
                user_id: { type: "string", format: "uuid" },
                name: { type: "string" },
                transaction_date: { type: "string", format: "date-time" },
                amount: { type: "string" },
                category: {
                  type: "object",
                  properties: {
                    id: { type: "string", format: "uuid" },
                    key: { type: "string" },
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
      return transactionsController.getTransactions(req, reply);
    }
  );
};

export default TransactionRoutes;
