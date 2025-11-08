import { FastifyRequest } from "fastify";

export class UpdateBudgetDTO {
  category_id?: string;
  maximum?: number;
  theme?: string;

  constructor(req: FastifyRequest) {
    const { category_id, maximum, theme } = req.body as any;
    this.category_id = category_id;
    this.maximum = maximum;
    this.theme = theme;
  }
}
