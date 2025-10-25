import { UpdateTransactionDTO } from "../../../domain/DTO/UpdateTransactionDTO";
import { FinanceRepository } from "../../../infrastructure/repository/FinanceRepository";

export class UpdateTransactionUseCase {
  constructor(private financeRepository: FinanceRepository) {}

  async execute(transactionId: string, payload: UpdateTransactionDTO) {
    return this.financeRepository.updateTransaction(transactionId, payload);
  }
}
