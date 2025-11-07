import { FastifyRequest } from "fastify";

export class UpdatePotDTO {
  name?: string;
  target_value?: string;
  current_value?: string;
  theme?: string;

  constructor(req: FastifyRequest) {
    const { name, target_value, current_value, theme } = req.body as any;
    this.name = name;
    this.target_value = target_value;
    this.current_value = current_value;
    this.theme = theme;
  }
}
