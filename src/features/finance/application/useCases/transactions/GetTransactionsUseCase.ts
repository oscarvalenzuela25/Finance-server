import { validate } from "../../../../../utils/schemaValidator";
import { GetTransactionsQueryParams } from "../../../domain/types";
import { FinanceRepository } from "../../../infrastructure/repository/FinanceRepository";
import { getTransactionsQueryParams } from "../../../presentation/validators/FinanceValidators";

export class GetTransactionsByUserId {
  constructor(private financeRepository: FinanceRepository) {}

  async execute(
    userId: string,
    { page, limit, ...queryParams }: GetTransactionsQueryParams = {}
  ) {
    const newQueryParams: GetTransactionsQueryParams = {
      page: page ? +page : undefined,
      limit: limit ? +limit : undefined,
      q: {
        ...queryParams.q,
      },
    };
    validate(getTransactionsQueryParams, newQueryParams);
    const transactions = await this.financeRepository.getTransactionsByUserId({
      userId,
      includes: { category: true },
      queryParams: newQueryParams,
    });
    return transactions;
  }
}
