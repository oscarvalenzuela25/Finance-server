import { prisma } from "../../../../lib/prisma";

export class FinanceRepository {
  async getOverviewByUserId(userId: string) {
    return prisma.overview.findFirst({
      where: { user_id: userId },
    });
  }

  async createOverview(payload: {
    user_id: string;
    current_balance: number;
    income_balance: number;
    expenses_balance: number;
  }) {
    return prisma.overview.create({
      data: payload,
    });
  }

  async getPotsByUserId(userId: string) {
    return prisma.pot.findMany({
      where: { user_id: userId },
    });
  }

  async getBudgetsByUserId(userId: string) {
    return prisma.budget.findMany({
      where: { user_id: userId },
      include: {
        category: {
          include: {
            transactions: true,
          },
        },
      },
    });
  }

  async getTransactionsByUserId(
    userId: string,
    includes: { category?: boolean } = {},
    options: { page?: number; limit?: number } = {}
  ) {
    const { page = 1, limit = 10 } = options;
    let optionsParams = {};
    if (page && limit) {
      optionsParams = {
        skip: (page - 1) * limit,
        take: limit,
      };
    }
    if (includes.category) {
      optionsParams = {
        ...optionsParams,
        include: {
          category: true,
        },
      };
    }
    return prisma.transaction.findMany({
      where: { user_id: userId },
      ...optionsParams,
    });
  }
}
