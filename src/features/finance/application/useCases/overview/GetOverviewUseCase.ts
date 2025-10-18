import { CustomError } from "../../../../../utils/CustomErrors";
import { AuthRepository } from "../../../../auth/infrastructure/repository/AuthRepository";
import { FinanceRepository } from "../../../infrastructure/repository/FinanceRepository";

export class GetOverviewUseCase {
  constructor(
    private authRepository: AuthRepository,
    private financeRepository: FinanceRepository
  ) {}

  async execute(userEmail: string) {
    const user = await this.authRepository.getUserByEmail(userEmail);
    if (!user) throw CustomError.notFound("User not found");

    const overview = await this.financeRepository.getOverviewByUserId(user.id);
    if (!overview) {
      const newOverview = await this.financeRepository.createOverview({
        user_id: user.id,
        current_balance: 0,
        income_balance: 0,
        expenses_balance: 0,
      });
      return newOverview;
    }
    return overview;
  }
}
