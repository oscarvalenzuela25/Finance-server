import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import authValidation from "../../../../middleware/authValidation";
import { FinanceRepository } from "../../infrastructure/repository/FinanceRepository";
import { GetTransactionsByUserId } from "../../application/useCases/transactions/GetTransactionsUseCase";
import { TransactionsController } from "../controllers/TransactionsControllet";
import { CreateTransactionUseCase } from "../../application/useCases/transactions/CreateTransactionUseCase";
import { UpdateTransactionUseCase } from "../../application/useCases/transactions/UpdateTransactionUseCase";
import { DeleteTransactionUseCase } from "../../application/useCases/transactions/DeleteTransactionUseCase";

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
    },
    (req: FastifyRequest, reply: FastifyReply) => {
      return transactionsController.getTransactions(req, reply);
    }
  );

  app.post(
    "/transaction",
    {
      preHandler: [authValidation],
    },
    (req: FastifyRequest, reply: FastifyReply) => {
      return transactionsController.createTransaction(req, reply);
    }
  );

  app.put(
    "/transaction/:id",
    {
      preHandler: [authValidation],
    },
    (req: FastifyRequest, reply: FastifyReply) => {
      return transactionsController.updateTransaction(req, reply);
    }
  );

  app.delete(
    "/transaction/:id",
    {
      preHandler: [authValidation],
    },
    (req: FastifyRequest, reply: FastifyReply) => {
      return transactionsController.deleteTransaction(req, reply);
    }
  );
};

export default TransactionRoutes;
