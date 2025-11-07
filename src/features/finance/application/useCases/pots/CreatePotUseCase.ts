import { CreatePotDTO } from "../../../domain/DTO/CreatePotDTO";
import { FinanceRepository } from "../../../infrastructure/repository/FinanceRepository";

export class CreatePotUseCase {
  constructor(private financeRepository: FinanceRepository) {}

  async execute(dto: CreatePotDTO) {
    const newPot = await this.financeRepository.createPot(dto);
    return newPot;
  }
}
