import { FinanceRepository } from "../../../infrastructure/repository/FinanceRepository";

export class GetTransactionsByUserId {
  constructor(private financeRepository: FinanceRepository) {}

  async execute(
    userId: string,
    options: { page?: number; limit?: number } = {}
  ) {
    const transactions = await this.financeRepository.getTransactionsByUserId(
      userId,
      { category: true },
      options
    );
    return transactions;
  }
}
