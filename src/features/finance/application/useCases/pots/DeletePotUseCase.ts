import { FinanceRepository } from "../../../infrastructure/repository/FinanceRepository";

export class DeletePotUseCase {
  constructor(private financeRepository: FinanceRepository) {}

  async execute(potId: string) {
    const deletedPot = await this.financeRepository.deletePot(potId);
    return deletedPot;
  }
}
