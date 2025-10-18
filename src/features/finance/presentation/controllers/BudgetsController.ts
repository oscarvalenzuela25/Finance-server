import { FastifyReply, FastifyRequest } from "fastify";
import { GetBudgetsUseCase } from "../../application/useCases/budgets/GetBudgetsUseCase";

export class BudgetsController {
  constructor(private getBudgetsUseCase: GetBudgetsUseCase) {}

  async getBudgets(req: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (req as any).user?.id;
      const budgets = await this.getBudgetsUseCase.execute(userId);
      return reply.send(budgets);
    } catch (error) {
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  }
}
