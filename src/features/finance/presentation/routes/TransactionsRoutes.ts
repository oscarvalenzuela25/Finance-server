import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import authValidation from "../../../../middleware/authValidation";
import { FinanceRepository } from "../../infrastructure/repository/FinanceRepository";
import { GetTransactionsByUserId } from "../../application/useCases/transactions/GetTransactionsUseCase";
import { TransactionsController } from "../controllers/TransactionsControllet";
import { CreateTransactionUseCase } from "../../application/useCases/transactions/CreateTransactionUseCase";
import { UpdateTransactionUseCase } from "../../application/useCases/transactions/UpdateTransactionUseCase";
import { DeleteTransactionUseCase } from "../../application/useCases/transactions/DeleteTransactionUseCase";

const financeErrorResponses = {
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
};

const transactionResponseSchema = {
  type: "object",
  required: [
    "id",
    "category_id",
    "user_id",
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
  },
};

const transactionParamsSchema = {
  type: "object",
  required: ["id"],
  properties: {
    id: {
      type: "string",
      format: "uuid",
      description: "Identificador de la transaccion",
    },
  },
};

const createTransactionBodySchema = {
  type: "object",
  required: ["category_id", "name", "amount", "transaction_date"],
  properties: {
    category_id: {
      type: "string",
      format: "uuid",
      description: "Categoria asociada a la transaccion",
    },
    name: {
      type: "string",
      minLength: 1,
      description: "Descripcion corta de la transaccion",
    },
    amount: {
      type: "number",
      description: "Monto registrado (positivo ingresos / negativo gastos)",
    },
    transaction_date: {
      type: "string",
      format: "date-time",
      description: "Fecha en la que sucedio la transaccion",
    },
  },
};

const updateTransactionBodySchema = {
  type: "object",
  minProperties: 1,
  additionalProperties: false,
  properties: {
    category_id: {
      type: "string",
      format: "uuid",
      description: "Categoria a la que se reasignara la transaccion",
    },
    name: {
      type: "string",
      minLength: 1,
      description: "Nuevo nombre visible en el historial",
    },
    amount: {
      type: "number",
      description: "Nuevo monto para la transaccion",
    },
  },
};

const TransactionRoutes = async (app: FastifyInstance) => {
  const financeRepository = new FinanceRepository();
  const getTransactionsByUserId = new GetTransactionsByUserId(
    financeRepository
  );
  const createTransactionUseCase = new CreateTransactionUseCase(
    financeRepository
  );
  const updateTransactionUseCase = new UpdateTransactionUseCase(
    financeRepository
  );
  const deleteTransactionUseCase = new DeleteTransactionUseCase(
    financeRepository
  );
  const transactionsController = new TransactionsController(
    getTransactionsByUserId,
    createTransactionUseCase,
    updateTransactionUseCase,
    deleteTransactionUseCase
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
          ...financeErrorResponses,
        },
      },
    },
    (req: FastifyRequest, reply: FastifyReply) => {
      return transactionsController.getTransactions(req, reply);
    }
  );

  app.post(
    "/transactions",
    {
      preHandler: [authValidation],
      schema: {
        tags: ["Finance"],
        summary: "Crear una nueva transaccion",
        security: [{ bearerAuth: [] }],
        body: createTransactionBodySchema,
        response: {
          201: {
            description: "Transaccion creada",
            ...transactionResponseSchema,
          },
          ...financeErrorResponses,
        },
      },
    },
    (req: FastifyRequest, reply: FastifyReply) => {
      return transactionsController.createTransaction(req, reply);
    }
  );

  app.put(
    "/transactions/:id",
    {
      preHandler: [authValidation],
      schema: {
        tags: ["Finance"],
        summary: "Actualizar una transaccion existente",
        security: [{ bearerAuth: [] }],
        params: transactionParamsSchema,
        body: updateTransactionBodySchema,
        response: {
          200: {
            description: "Transaccion actualizada",
            ...transactionResponseSchema,
          },
          ...financeErrorResponses,
        },
      },
    },
    (req: FastifyRequest, reply: FastifyReply) => {
      return transactionsController.updateTransaction(req, reply);
    }
  );

  app.delete(
    "/transactions/:id",
    {
      preHandler: [authValidation],
      schema: {
        tags: ["Finance"],
        summary: "Eliminar una transaccion",
        security: [{ bearerAuth: [] }],
        params: transactionParamsSchema,
        response: {
          204: {
            description: "Transaccion eliminada",
            type: "null",
          },
          ...financeErrorResponses,
        },
      },
    },
    (req: FastifyRequest, reply: FastifyReply) => {
      return transactionsController.deleteTransaction(req, reply);
    }
  );
};

export default TransactionRoutes;
