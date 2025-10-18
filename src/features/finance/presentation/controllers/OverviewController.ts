import { FastifyReply, FastifyRequest } from "fastify";
import { GetOverviewUseCase } from "../../application/useCases/overview/GetOverviewUseCase";

export class OverviewController {
  constructor(private getOverviewUseCase: GetOverviewUseCase) {}

  async getOverview(req: FastifyRequest, reply: FastifyReply) {
    try {
      const userEmail = (req as any).user?.email;
      const overview = await this.getOverviewUseCase.execute(userEmail);
      reply.send(overview);
    } catch (error) {
      reply.status(500).send({ error: "Internal Server Error" });
    }
  }
}
