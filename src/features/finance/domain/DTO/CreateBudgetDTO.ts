import { FastifyRequest } from "fastify";

export class CreateBudgetDTO {
  user_id: string;
  category_id: string;
  maximum: number;
  theme: string;

  constructor(req: FastifyRequest) {
    const { category_id, maximum, theme } = req.body as any;
    this.user_id = (req as any).user.id;
    this.category_id = category_id;
    this.maximum = maximum;
    this.theme = theme;
  }
}
