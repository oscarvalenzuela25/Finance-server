import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import authValidation from "../../../../middleware/authValidation";
import { FinanceRepository } from "../../infrastructure/repository/FinanceRepository";
import { GetBudgetsUseCase } from "../../application/useCases/budgets/GetBudgetsUseCase";
import { BudgetsController } from "../controllers/BudgetsController";
import { CreateBudgetUseCase } from "../../application/useCases/budgets/CreateBudgetUseCase";
import { UpdateBudgetUseCase } from "../../application/useCases/budgets/UpdateBudgetUseCase";
import { DeleteBudgetUseCase } from "../../application/useCases/budgets/DeleteBudgetUseCase";

const BudgetRoutes = async (app: FastifyInstance) => {
  const financeRepository = new FinanceRepository();
  const getBudgetsUseCase = new GetBudgetsUseCase(financeRepository);
  const createBudgetUseCase = new CreateBudgetUseCase(financeRepository);
  const updateBudgetUseCase = new UpdateBudgetUseCase(financeRepository);
  const deleteBudgetUseCase = new DeleteBudgetUseCase(financeRepository);
  const budgetsController = new BudgetsController(
    getBudgetsUseCase,
    createBudgetUseCase,
    updateBudgetUseCase,
    deleteBudgetUseCase
  );

  app.get(
    "/budgets",
    {
      preHandler: [authValidation],
    },
    (req: FastifyRequest, reply: FastifyReply) => {
      return budgetsController.getBudgets(req, reply);
    }
  );

  app.post(
    "/budget",
    {
      preHandler: [authValidation],
    },
    (req: FastifyRequest, reply: FastifyReply) => {
      return budgetsController.createBudget(req, reply);
    }
  );

  app.put(
    "/budget/:id",
    {
      preHandler: [authValidation],
    },
    (req: FastifyRequest, reply: FastifyReply) => {
      return budgetsController.updateBudget(req, reply);
    }
  );

  app.delete(
    "/budget/:id",
    {
      preHandler: [authValidation],
    },
    (req: FastifyRequest, reply: FastifyReply) => {
      return budgetsController.deleteBudget(req, reply);
    }
  );
};

export default BudgetRoutes;
