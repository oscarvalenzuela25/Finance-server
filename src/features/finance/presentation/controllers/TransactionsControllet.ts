import { FastifyReply, FastifyRequest } from "fastify";
import { GetTransactionsByUserId } from "../../application/useCases/transactions/getTransactionsUseCase";

export class TransactionsController {
  constructor(private getTransactionsByUserId: GetTransactionsByUserId) {}

  async getTransactions(req: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (req as any).user?.id;
      const options = req.query as { page?: number; limit?: number };
      const transactions = await this.getTransactionsByUserId.execute(userId, options);
      return reply.send(transactions);
    } catch (error) {
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  }
}
