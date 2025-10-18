import { FinanceRepository } from "../../../infrastructure/repository/FinanceRepository";

export class GetBudgetsUseCase {
  constructor(private financeRepository: FinanceRepository) {}

  async execute(userId: string) {
    const budgets = await this.financeRepository.getBudgetsByUserId(userId);
    const limitAmount = budgets.reduce(
      (acc, budget) => acc + Number(budget.maximum),
      0
    );
    const currentAmount = budgets.reduce((acc, budget) => {
      const categoryTransactions = budget.category.transactions || [];
      const categoryTotal = categoryTransactions.reduce(
        (catAcc, transaction) => catAcc + Number(transaction.amount),
        0
      );
      return acc + categoryTotal;
    }, 0);

    const budgetData = {
      limit_amount: limitAmount,
      current_amount: currentAmount,
      budgets: budgets,
    };
    return budgetData;
  }
}
