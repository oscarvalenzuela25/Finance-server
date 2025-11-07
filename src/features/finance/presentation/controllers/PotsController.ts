import { FastifyReply, FastifyRequest } from "fastify";
import { GetPotsUseCase } from "../../application/useCases/pots/GetPotsUseCase";
import { GetPotsQueryParams } from "../../domain/types";
import { validate } from "../../../../utils/schemaValidator";
import {
  createPot,
  deletePotRouteParams,
  updatePot,
  updatePotRouteParams,
} from "../validators/FinanceValidators";
import { CreatePotUseCase } from "../../application/useCases/pots/CreatePotUseCase";
import { CreatePotDTO } from "../../domain/DTO/CreatePotDTO";
import { UpdatePotUseCase } from "../../application/useCases/pots/UpdatePotUseCase";
import { UpdatePotDTO } from "../../domain/DTO/UpdatePotDTO";
import { DeletePotUseCase } from "../../application/useCases/pots/DeletePotUseCase";

export class PotsController {
  constructor(
    private getPotsUseCase: GetPotsUseCase,
    private createPotUseCase: CreatePotUseCase,
    private updatePotUseCase: UpdatePotUseCase,
    private deletePotUseCase: DeletePotUseCase
  ) {}

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

  async createPot(req: FastifyRequest, reply: FastifyReply) {
    try {
      const potPayload = req.body;
      validate(createPot, potPayload);
      const dto = new CreatePotDTO(req);
      const newPot = await this.createPotUseCase.execute(dto);
      return reply.status(201).send(newPot);
    } catch (error) {
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  }

  async updatePot(req: FastifyRequest, reply: FastifyReply) {
    try {
      const potId = (req.params as any).id;
      validate(updatePotRouteParams, { potId });
      const potPayload = req.body;
      validate(updatePot, potPayload);
      const dto = new UpdatePotDTO(req);
      const updatedPot = await this.updatePotUseCase.execute(potId, dto);
      return reply.status(200).send(updatedPot);
    } catch (error) {
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  }

  async deletePot(req: FastifyRequest, reply: FastifyReply) {
    try {
      const potId = (req.params as any).id;
      validate(deletePotRouteParams, { potId });
      await this.deletePotUseCase.execute(potId);
      return reply.status(204).send();
    } catch (error) {
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  }
}
