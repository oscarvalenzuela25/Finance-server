import { UpdatePotDTO } from "../../../domain/DTO/UpdatePotDTO";
import { FinanceRepository } from "../../../infrastructure/repository/FinanceRepository";

export class UpdatePotUseCase {
  constructor(private financeRepository: FinanceRepository) {}

  async execute(potId: string, dto: UpdatePotDTO) {
    const updatedPot = await this.financeRepository.updatePot(potId, dto);
    return updatedPot;
  }
}
