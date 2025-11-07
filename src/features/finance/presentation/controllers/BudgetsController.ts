import { FastifyReply, FastifyRequest } from "fastify";
import { GetBudgetsUseCase } from "../../application/useCases/budgets/GetBudgetsUseCase";
import { validate } from "../../../../utils/schemaValidator";
import {
  createBudget,
  deleteBudgetRouteParams,
  updateBudget,
  updateBudgetRouteParams,
} from "../validators/FinanceValidators";
import { CreateBudgetDTO } from "../../domain/DTO/CreateBudgetDTO";
import { CreateBudgetUseCase } from "../../application/useCases/budgets/CreateBudgetUseCase";
import { UpdateBudgetUseCase } from "../../application/useCases/budgets/UpdateBudgetUseCase";
import { UpdateBudgetDTO } from "../../domain/DTO/UpdateBudgetDTO";
import { DeleteBudgetUseCase } from "../../application/useCases/budgets/DeleteBudgetUseCase";

export class BudgetsController {
  constructor(
    private getBudgetsUseCase: GetBudgetsUseCase,
    private createBudgetUseCase: CreateBudgetUseCase,
    private updateBudgetUseCase: UpdateBudgetUseCase,
    private deleteBudgetUseCase: DeleteBudgetUseCase
  ) {}

  async getBudgets(req: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (req as any).user?.id;
      const budgets = await this.getBudgetsUseCase.execute(userId);
      return reply.status(200).send(budgets);
    } catch (error) {
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  }

  async createBudget(req: FastifyRequest, reply: FastifyReply) {
    try {
      const body = req.body;
      validate(createBudget, body);
      const dto = new CreateBudgetDTO(req);
      const response = await this.createBudgetUseCase.execute(dto);
      return reply.status(201).send(response);
    } catch (error) {
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  }

  async updateBudget(req: FastifyRequest, reply: FastifyReply) {
    try {
      const budgetId = (req.params as any).id;
      validate(updateBudgetRouteParams, { budgetId });
      const body = req.body;
      validate(updateBudget, body);
      const dto = new UpdateBudgetDTO(req);
      const response = await this.updateBudgetUseCase.execute(budgetId, dto);
      return reply.status(200).send(response);
    } catch (error) {
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  }

  async deleteBudget(req: FastifyRequest, reply: FastifyReply) {
    try {
      const budgetId = (req.params as any).id;
      validate(deleteBudgetRouteParams, { budgetId });
      await this.deleteBudgetUseCase.execute(budgetId);
      return reply.status(204).send();
    } catch (error) {
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  }
}
