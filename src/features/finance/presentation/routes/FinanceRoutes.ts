import { FastifyInstance } from "fastify";
import OverviewRoutes from "./overview/OverviewRoutes";

const FinanceRoutes = async (app: FastifyInstance) => {
  app.register(OverviewRoutes);
};

export default FinanceRoutes;
