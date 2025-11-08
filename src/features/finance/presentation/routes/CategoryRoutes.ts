import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { FinanceRepository } from "../../infrastructure/repository/FinanceRepository";
import { GetCategoriesUseCase } from "../../application/useCases/categories/GetCategoriesUseCase";
import { CategoryController } from "../controllers/CategoryController";
import authValidation from "../../../../middleware/authValidation";

const CategoryRoutes = async (app: FastifyInstance) => {
  const financeRepository = new FinanceRepository();
  const getCategoriesUseCase = new GetCategoriesUseCase(financeRepository);
  const categoryController = new CategoryController(getCategoriesUseCase);

  app.get(
    "/categories",
    {
      preHandler: [authValidation],
    },
    async (req: FastifyRequest, reply: FastifyReply) => {
      return categoryController.getCategories(req, reply);
    }
  );
};

export default CategoryRoutes;
