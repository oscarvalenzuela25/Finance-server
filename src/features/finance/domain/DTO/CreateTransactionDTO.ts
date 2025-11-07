import { FastifyRequest } from "fastify";

export class CreateTransactionDTO {
  public category_id: string;
  public budget_id?: string;
  public name: string;
  public amount: number;
  public transaction_date: Date;

  constructor(req: FastifyRequest) {
    const body = req.body as any;
    this.category_id = body.category_id;
    this.budget_id = body?.budget_id;
    this.name = body.name;
    this.amount = body.amount;
    this.transaction_date = body.transaction_date;
  }
}
