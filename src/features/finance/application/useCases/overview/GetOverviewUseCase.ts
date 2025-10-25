import { FinanceRepository } from "../../../infrastructure/repository/FinanceRepository";

export class GetOverviewUseCase {
  constructor(private financeRepository: FinanceRepository) {}

  async execute(userId: string) {
    const overview = await this.financeRepository.getOverviewByUserId(userId);
    if (!overview) {
      const newOverview = await this.financeRepository.createOverview({
        user_id: userId,
        current_balance: 0,
        income_balance: 0,
        expenses_balance: 0,
      });
      return newOverview;
    }
    return overview;
  }
}
