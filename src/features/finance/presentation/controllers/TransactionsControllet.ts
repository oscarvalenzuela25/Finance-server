import { FastifyReply, FastifyRequest } from "fastify";
import { GetTransactionsByUserId } from "../../application/useCases/transactions/GetTransactionsUseCase";
import { GetTransactionsQueryParams } from "../../domain/types";
import { validate } from "../../../../utils/schemaValidator";
import {
  createTransaction,
  deleteTransactionRouteParams,
  updateTransaction,
  updateTransactionRouteParams,
} from "../validators/FinanceValidators";
import { CreateTransactionUseCase } from "../../application/useCases/transactions/CreateTransactionUseCase";
import { CreateTransactionDTO } from "../../domain/DTO/createTransactionDTO";
import { UpdateTransactionUseCase } from "../../application/useCases/transactions/UpdateTransactionUseCase";
import { UpdateTransactionDTO } from "../../domain/DTO/UpdateTransactionDTO";
import { DeleteTransactionUseCase } from "../../application/useCases/transactions/DeleteTransactionUseCase";

export class TransactionsController {
  constructor(
    private getTransactionsByUserId: GetTransactionsByUserId,
    private createTransactionUseCase: CreateTransactionUseCase,
    private updateTransactionUseCase: UpdateTransactionUseCase,
    private deleteTransactionUseCase: DeleteTransactionUseCase
  ) {}

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

  async createTransaction(req: FastifyRequest, reply: FastifyReply) {
    try {
      const body = req.body;
      validate(createTransaction, body);
      const dto = new CreateTransactionDTO(req);
      const userId = (req as any).user?.id;
      const newTransaction = await this.createTransactionUseCase.execute(
        dto,
        userId
      );
      return reply.status(201).send(newTransaction);
    } catch (error) {
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  }

  async updateTransaction(req: FastifyRequest, reply: FastifyReply) {
    try {
      const body = req.body;
      const transactionId = (req.params as any).id;
      validate(updateTransactionRouteParams, { transactionId });
      validate(updateTransaction, body);
      const dto = new UpdateTransactionDTO(req);
      const updatedTransaction = await this.updateTransactionUseCase.execute(
        transactionId,
        dto
      );
      return reply.status(200).send(updatedTransaction);
    } catch (error) {
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  }

  async deleteTransaction(req: FastifyRequest, reply: FastifyReply) {
    try {
      const transactionId = (req.params as any).id;
      validate(deleteTransactionRouteParams, { transactionId });
      await this.deleteTransactionUseCase.execute(transactionId);
      return reply.status(204).send();
    } catch (error) {
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  }
}
