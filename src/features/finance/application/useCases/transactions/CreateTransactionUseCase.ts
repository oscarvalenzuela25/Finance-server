import { CreateTransactionDTO } from "../../../domain/DTO/createTransactionDTO";
import { FinanceRepository } from "../../../infrastructure/repository/FinanceRepository";

export class CreateTransactionUseCase {
  constructor(private financeRepository: FinanceRepository) {}

  async execute(dto: CreateTransactionDTO, userId: string) {
    const newTransaction = await this.financeRepository.createTransaction({
      ...dto,
      user_id: userId,
    });
    return newTransaction;
  }
}
