import { FinanceRepository } from "../../../infrastructure/repository/FinanceRepository";

export class DeleteBudgetUseCase {
  constructor(private financeRepository: FinanceRepository) {}

  async execute(budgetId: string) {
    return this.financeRepository.deleteBudget(budgetId);
  }
}
