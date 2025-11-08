import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import authValidation from "../../../../middleware/authValidation";
import { FinanceRepository } from "../../infrastructure/repository/FinanceRepository";
import { GetPotsUseCase } from "../../application/useCases/pots/GetPotsUseCase";
import { PotsController } from "../controllers/PotsController";
import { CreatePotUseCase } from "../../application/useCases/pots/CreatePotUseCase";
import { UpdatePotUseCase } from "../../application/useCases/pots/UpdatePotUseCase";
import { DeletePotUseCase } from "../../application/useCases/pots/DeletePotUseCase";

const PotsRouter = (app: FastifyInstance) => {
  const financeRepository = new FinanceRepository();
  const getPotsUseCase = new GetPotsUseCase(financeRepository);
  const createPotUseCase = new CreatePotUseCase(financeRepository);
  const updatePotUseCase = new UpdatePotUseCase(financeRepository);
  const deletePotUseCase = new DeletePotUseCase(financeRepository);
  const potsController = new PotsController(
    getPotsUseCase,
    createPotUseCase,
    updatePotUseCase,
    deletePotUseCase
  );

  app.get(
    "/pots",
    {
      preHandler: [authValidation],
    },
    async (req: FastifyRequest, reply: FastifyReply) => {
      return potsController.getPots(req, reply);
    }
  );

  app.post(
    "/pot",
    {
      preHandler: [authValidation],
    },
    async (req: FastifyRequest, reply: FastifyReply) => {
      return potsController.createPot(req, reply);
    }
  );

  app.put(
    "/pot/:id",
    {
      preHandler: [authValidation],
    },
    async (req: FastifyRequest, reply: FastifyReply) => {
      return potsController.updatePot(req, reply);
    }
  );

  app.delete(
    "/pot/:id",
    {
      preHandler: [authValidation],
    },
    async (req: FastifyRequest, reply: FastifyReply) => {
      return potsController.deletePot(req, reply);
    }
  );
};

export default PotsRouter;
