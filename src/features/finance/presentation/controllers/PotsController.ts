import { FastifyReply, FastifyRequest } from "fastify";
import { GetPotsUseCase } from "../../application/useCases/pots/GetPotsUseCase";

export class PotsController {
  constructor(private getPotsUseCase: GetPotsUseCase) {}

  async getPots(req: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (req as any).user?.id;
      const limit = (req.query as any)?.limit
        ? Number((req.query as any).limit)
        : undefined;
      const potsData = await this.getPotsUseCase.execute(userId, { limit });
      return reply.send(potsData);
    } catch (error) {
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  }
}
