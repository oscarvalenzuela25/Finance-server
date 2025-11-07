import { FastifyRequest } from "fastify";

export class CreatePotDTO {
  public user_id: string;
  public name: string;
  public target_value: string;
  public current_value: string;
  public theme: string;

  constructor(req: FastifyRequest) {
    const { name, target_value, current_value, theme } = req.body as any;
    this.user_id = (req as any).user.id;
    this.name = name;
    this.target_value = target_value;
    this.current_value = current_value;
    this.theme = theme;
  }
}
