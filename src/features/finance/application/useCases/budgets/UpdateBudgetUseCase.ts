import { FinanceRepository } from "../../../infrastructure/repository/FinanceRepository";
import { UpdateBudgetDTO } from "./../../../domain/DTO/UpdateBudgetDTO";

export class UpdateBudgetUseCase {
  constructor(private financeRepository: FinanceRepository) {}

  async execute(budgetId: string, dto: UpdateBudgetDTO) {
    return this.financeRepository.updateBudget(budgetId, dto);
  }
}
