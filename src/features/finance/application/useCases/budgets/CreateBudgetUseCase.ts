import { FinanceRepository } from "../../../infrastructure/repository/FinanceRepository";
import { CreateBudgetDTO } from "./../../../domain/DTO/CreateBudgetDTO";

export class CreateBudgetUseCase {
  constructor(private financeRepository: FinanceRepository) {}

  async execute(dto: CreateBudgetDTO) {
    return this.financeRepository.createBudget(dto);
  }
}
