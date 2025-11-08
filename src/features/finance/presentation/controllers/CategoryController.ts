import { FastifyReply, FastifyRequest } from "fastify";
import { GetCategoriesUseCase } from "./../../application/useCases/categories/GetCategoriesUseCase";

export class CategoryController {
  constructor(private getCategoriesUseCase: GetCategoriesUseCase) {}

  async getCategories(req: FastifyRequest, reply: FastifyReply) {
    try {
      const categories = await this.getCategoriesUseCase.execute();
      return reply.status(200).send(categories);
    } catch (error) {
      return reply.status(500).send({ error: "Failed to retrieve categories" });
    }
  }
}
