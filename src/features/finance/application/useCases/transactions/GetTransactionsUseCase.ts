import { validate } from "../../../../../utils/schemaValidator";
import { FinanceRepository } from "../../../infrastructure/repository/FinanceRepository";
import { getTransactionsQueryParams } from "../../../presentation/validators/FinanceValidators";

export class GetTransactionsByUserId {
  constructor(private financeRepository: FinanceRepository) {}

  async execute(
    userId: string,
    queryParams: { page?: number; limit?: number } = {}
  ) {
    validate(getTransactionsQueryParams, queryParams);
    const transactions = await this.financeRepository.getTransactionsByUserId({
      userId,
      includes: { category: true },
      queryParams,
    });
    return transactions;
  }
}
