import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import authValidation from "../../../../middleware/authValidation";
import { FinanceRepository } from "../../infrastructure/repository/FinanceRepository";
import { GetPotsUseCase } from "../../application/useCases/pots/GetPotsUseCase";
import { PotsController } from "../controllers/PotsController";

const PotsRouter = (app: FastifyInstance) => {
  const financeRepository = new FinanceRepository();
  const getPotsUseCase = new GetPotsUseCase(financeRepository);
  const potsController = new PotsController(getPotsUseCase);

  app.get(
    "/pots",
    { preHandler: [authValidation] },
    async (req: FastifyRequest, reply: FastifyReply) => {
      return potsController.getPots(req, reply);
    }
  );
};

export default PotsRouter;
