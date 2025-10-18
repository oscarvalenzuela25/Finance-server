import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import authValidation from "../../../../middleware/authValidation";
import { FinanceRepository } from "../../infrastructure/repository/FinanceRepository";
import { GetBudgetsUseCase } from "../../application/useCases/budgets/GetBudgetsUseCase";
import { BudgetsController } from "../controllers/BudgetsController";

const BudgetRoutes = async (app: FastifyInstance) => {
  const financeRepository = new FinanceRepository();
  const getBudgetsUseCase = new GetBudgetsUseCase(financeRepository);
  const budgetsController = new BudgetsController(getBudgetsUseCase);

  app.get(
    "/budgets",
    { preHandler: [authValidation] },
    (req: FastifyRequest, reply: FastifyReply) => {
      return budgetsController.getBudgets(req, reply);
    }
  );
};

export default BudgetRoutes;
