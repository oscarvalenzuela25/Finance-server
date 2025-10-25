import { FinanceRepository } from "../../../infrastructure/repository/FinanceRepository";

export class DeleteTransactionUseCase {
  constructor(private financeRepository: FinanceRepository) {}

  async execute(transactionId: string) {
    return this.financeRepository.deleteTransaction(transactionId);
  }
}
