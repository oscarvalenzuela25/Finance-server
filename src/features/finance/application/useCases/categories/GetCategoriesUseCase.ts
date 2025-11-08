import { FinanceRepository } from "../../../infrastructure/repository/FinanceRepository";

export class GetCategoriesUseCase {
  constructor(private financeRepository: FinanceRepository) {}

  async execute() {
    const categories = await this.financeRepository.getCategories();
    return categories;
  }
}
