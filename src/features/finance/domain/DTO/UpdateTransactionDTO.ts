import { FastifyRequest } from "fastify";

export class UpdateTransactionDTO {
  name: string | undefined;
  amount: number | undefined;
  category_id: string | undefined;

  constructor(req: FastifyRequest) {
    const body = req.body as any;
    this.name = body.name;
    this.amount = body.amount;
    this.category_id = body.category_id;
  }
}
