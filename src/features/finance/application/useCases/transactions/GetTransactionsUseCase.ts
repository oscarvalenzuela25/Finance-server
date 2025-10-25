import { validate } from "../../../../../utils/schemaValidator";
import { GetTransactionsQueryParams } from "../../../domain/types";
import { FinanceRepository } from "../../../infrastructure/repository/FinanceRepository";
import { getTransactionsQueryParams } from "../../../presentation/validators/FinanceValidators";

export class GetTransactionsByUserId {
  constructor(private financeRepository: FinanceRepository) {}

  async execute(userId: string, queryParams: GetTransactionsQueryParams = {}) {
    validate(getTransactionsQueryParams, queryParams);
    const transactions = await this.financeRepository.getTransactionsByUserId({
      userId,
      includes: { category: true },
      queryParams,
    });
    return transactions;
  }
}
