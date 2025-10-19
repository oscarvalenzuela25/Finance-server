import { FastifyReply, FastifyRequest } from "fastify";
import { GetPotsUseCase } from "../../application/useCases/pots/GetPotsUseCase";
import { GetPotsQueryParams } from "../../domain/types";

export class PotsController {
  constructor(private getPotsUseCase: GetPotsUseCase) {}

  async getPots(req: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (req as any).user?.id;
      const queryParams = req.query as GetPotsQueryParams;
      const potsData = await this.getPotsUseCase.execute(userId, queryParams);
      return reply.send(potsData);
    } catch (error) {
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  }
}
