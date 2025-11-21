import { validate } from "../../../../../utils/schemaValidator";
import { GetPotsQueryParams } from "../../../domain/types";
import { FinanceRepository } from "../../../infrastructure/repository/FinanceRepository";
import { getPotsQueryParams } from "../../../presentation/validators/FinanceValidators";

export class GetPotsUseCase {
  constructor(private financeRepository: FinanceRepository) {}

  async execute(userId: string, { limit }: GetPotsQueryParams) {
    const validatedLimit = limit ? +limit : undefined;
    validate(getPotsQueryParams, { limit: validatedLimit });
    const pots = await this.financeRepository.getPotsByUserId(userId);
    const totalSaved = pots.reduce(
      (acc, pot) => acc + Number(pot.current_value),
      0
    );
    const limitedPots = validatedLimit ? pots.slice(0, validatedLimit) : pots;
    return {
      total_saved: totalSaved,
      pots: limitedPots,
    };
  }
}
