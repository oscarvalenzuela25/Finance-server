import { validate } from "../../../../../utils/schemaValidator";
import { GetPotsQueryParams } from "../../../domain/types";
import { FinanceRepository } from "../../../infrastructure/repository/FinanceRepository";
import { getPotsQueryParams } from "../../../presentation/validators/FinanceValidators";

export class GetPotsUseCase {
  constructor(private financeRepository: FinanceRepository) {}

  async execute(userId: string, { limit }: GetPotsQueryParams) {
    validate(getPotsQueryParams, { limit });
    const pots = await this.financeRepository.getPotsByUserId(userId);
    const totalSaved = pots.reduce(
      (acc, pot) => acc + Number(pot.current_value),
      0
    );
    const limitedPots = limit ? pots.slice(0, limit) : pots;
    return {
      total_saved: totalSaved,
      pots: limitedPots,
    };
  }
}
