import { FastifyInstance } from "fastify";
import OverviewRoutes from "./OverviewRoutes";
import PotsRouter from "./PotsRoutes";

const FinanceRoutes = async (app: FastifyInstance) => {
  app.register(OverviewRoutes);
  app.register(PotsRouter);
};

export default FinanceRoutes;
