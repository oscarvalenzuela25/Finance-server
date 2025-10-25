import { FastifyReply, FastifyRequest } from "fastify";
import { GetOverviewUseCase } from "../../application/useCases/overview/GetOverviewUseCase";

export class OverviewController {
  constructor(private getOverviewUseCase: GetOverviewUseCase) {}

  async getOverview(req: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (req as any).user?.id;
      const overview = await this.getOverviewUseCase.execute(userId);
      reply.send(overview);
    } catch (error) {
      reply.status(500).send({ error: "Internal Server Error" });
    }
  }
}
