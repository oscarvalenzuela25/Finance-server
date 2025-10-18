import { FastifyInstance } from "fastify";
import OverviewRoutes from "./OverviewRoutes";
import PotsRouter from "./PotsRoutes";
import BudgetRoutes from "./BudgetsRouts";

const FinanceRoutes = async (app: FastifyInstance) => {
  app.register(OverviewRoutes);
  app.register(PotsRouter);
  app.register(BudgetRoutes);
};

export default FinanceRoutes;
