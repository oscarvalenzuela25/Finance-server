import { FastifyInstance } from "fastify";
import OverviewRoutes from "./OverviewRoutes";
import PotsRouter from "./PotsRoutes";
import BudgetRoutes from "./BudgetsRoutes";
import TransactionRoutes from "./TransactionsRoutes";
import CategoryRoutes from "./CategoryRoutes";

const FinanceRoutes = async (app: FastifyInstance) => {
  app.register(OverviewRoutes);
  app.register(PotsRouter);
  app.register(BudgetRoutes);
  app.register(TransactionRoutes);
  app.register(CategoryRoutes);
};

export default FinanceRoutes;
