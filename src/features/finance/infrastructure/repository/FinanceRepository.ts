import { prisma } from "../../../../lib/prisma";
import { CreateOverview, GetTransactionsQueryParams } from "../../domain/types";

export class FinanceRepository {
  async getOverviewByUserId(userId: string) {
    return prisma.overview.findFirst({
      where: { user_id: userId },
    });
  }

  async createOverview(payload: CreateOverview) {
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

  async getTransactionsByUserId({
    userId,
    includes,
    queryParams,
  }: {
    userId: string;
    includes: { category?: boolean };
    queryParams: GetTransactionsQueryParams;
  }) {
    const { page, limit } = queryParams;
    let getQueryParams = {};
    if (page && limit) {
      getQueryParams = {
        skip: (page - 1) * limit,
        take: limit,
      };
    }
    if (includes.category) {
      getQueryParams = {
        ...getQueryParams,
        include: {
          category: true,
        },
      };
    }
    return prisma.transaction.findMany({
      where: { user_id: userId },
      ...getQueryParams,
    });
  }
}
