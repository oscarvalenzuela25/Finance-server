import { FinanceRepository } from "../../../infrastructure/repository/FinanceRepository";

export class GetBudgetsUseCase {
  constructor(private financeRepository: FinanceRepository) {}

  async execute(userId: string) {
    const budgets = await this.financeRepository.getBudgetsByUserId(userId);
    const limitAmount = budgets.reduce(
      (acc, budget) => acc + Number(budget.maximum),
      0
    );

    const budgetIds = budgets.map((budget) => budget.id);
    const transactions = await this.financeRepository.getTransactionsByWhere({
      budget_id: { in: budgetIds },
    });

    const currentAmount = budgets.reduce((acc, budget) => {
      const categoryTransactions = transactions.filter(
        (x) => x.budget_id === budget.id
      );

      const categoryTotal = categoryTransactions.reduce(
        (catAcc, transaction) => catAcc + Number(transaction.amount),
        0
      );
      return acc + categoryTotal;
    }, 0);

    const newBudgets = budgets.map((budget) => ({
      ...budget,
      transactions: transactions.filter((x) => x.budget_id === budget.id),
    }));

    const budgetData = {
      limit_amount: limitAmount,
      current_amount: Math.abs(currentAmount),
      budgets: newBudgets,
    };
    return budgetData;
  }
}
