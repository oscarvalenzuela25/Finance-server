import { FastifyInstance } from "fastify";
import authValidation from "../../../../middleware/authValidation";
import { FinanceRepository } from "../../infrastructure/repository/FinanceRepository";
import { GetTransactionsByUserId } from "../../application/useCases/transactions/getTransactionsUseCase";
import { TransactionsController } from "../controllers/TransactionsControllet";

const TransactionRoutes = async (app: FastifyInstance) => {
  const financeRepository = new FinanceRepository();
  const getTransactionsByUserId = new GetTransactionsByUserId(
    financeRepository
  );
  const transactionsController = new TransactionsController(
    getTransactionsByUserId
  );
  app.get("/transactions", { preHandler: [authValidation] }, (req, reply) => {
    return transactionsController.getTransactions(req, reply);
  });
};

export default TransactionRoutes;
