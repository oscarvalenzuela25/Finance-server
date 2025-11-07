import { FinanceRepository } from "../../../infrastructure/repository/FinanceRepository";

export class GetOverviewUseCase {
  constructor(private financeRepository: FinanceRepository) {}

  async execute(userId: string) {
    try {
      const allTransactions =
        await this.financeRepository.getTransactionsByUserId({
          userId,
        });
      const inTransactions = allTransactions.filter(
        (transaction) => Number(transaction.amount) > 0
      );
      const sumInTransactions = inTransactions.reduce(
        (sum, transaction) => sum + Number(transaction.amount),
        0
      );
      const outTransactions = allTransactions.filter(
        (transaction) => Number(transaction.amount) < 0
      );
      const sumOutTransactions = outTransactions.reduce(
        (sum, transaction) => sum + Number(transaction.amount),
        0
      );
      return {
        current_balance: sumInTransactions + sumOutTransactions,
        income_balance: sumInTransactions,
        expenses_balance: Math.abs(sumOutTransactions),
      };
    } catch (error) {
      throw new Error("Could not fetch overview");
    }
  }
}
