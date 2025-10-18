import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import authValidation from "../../../../middleware/authValidation";
import { FinanceRepository } from "../../infrastructure/repository/FinanceRepository";
import { GetOverviewUseCase } from "../../application/useCases/overview/GetOverviewUseCase";
import { AuthRepository } from "../../../auth/infrastructure/repository/AuthRepository";
import { OverviewController } from "../controllers/OverviewController";

const OverviewRoutes = async (app: FastifyInstance) => {
  const authRepository = new AuthRepository();
  const financeRepository = new FinanceRepository();
  const getOverviewUseCase = new GetOverviewUseCase(
    authRepository,
    financeRepository
  );
  const overViewController = new OverviewController(getOverviewUseCase);

  app.get(
    "/overview",
    { preHandler: [authValidation] },
    async (req: FastifyRequest, reply: FastifyReply) => {
      return overViewController.getOverview(req, reply);
    }
  );
};

export default OverviewRoutes;
