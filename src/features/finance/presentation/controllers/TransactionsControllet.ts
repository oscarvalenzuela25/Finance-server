import { FastifyReply, FastifyRequest } from "fastify";
import { GetTransactionsByUserId } from "../../application/useCases/transactions/GetTransactionsUseCase";
import { GetTransactionsQueryParams } from "../../domain/types";

export class TransactionsController {
  constructor(private getTransactionsByUserId: GetTransactionsByUserId) {}

  async getTransactions(req: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (req as any).user?.id;
      const queryParams = req.query as GetTransactionsQueryParams;
      const transactions = await this.getTransactionsByUserId.execute(
        userId,
        queryParams
      );
      return reply.send(transactions);
    } catch (error) {
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  }
}
