import { Prisma } from "@prisma/client";
import { prisma } from "../../../../lib/prisma";
import {
  GetTransactionsQueryParams,
  TransactionToCreate,
  TransactionToUpdate,
} from "../../domain/types";

export class FinanceRepository {
  async getOverviewByUserId(userId: string) {
    return prisma.overview.findFirst({
      where: { user_id: userId },
    });
  }

  async createOverview(payload: Prisma.overviewCreateInput) {
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
    const {
      page,
      limit,
      q: {
        search,
        sort_name,
        sort_transaction_date,
        sort_amount,
        category,
      } = {},
    } = queryParams;

    const where: Prisma.transactionWhereInput = {
      user_id: userId,
    };

    if (search) {
      where.name = {
        contains: search,
        mode: "insensitive",
      };
    }

    if (category) {
      where.category_id = category;
    }

    const orderBy: Prisma.transactionOrderByWithRelationInput[] = [];

    if (sort_name) {
      orderBy.push({ name: sort_name });
    }

    if (sort_transaction_date) {
      orderBy.push({ transaction_date: sort_transaction_date });
    }

    if (sort_amount) {
      orderBy.push({ amount: sort_amount });
    }

    let getQueryParams = {};
    if (page && limit) {
      getQueryParams = {
        skip: (page - 1) * limit,
        take: limit,
      };
    }

    if (orderBy.length) {
      getQueryParams = {
        ...getQueryParams,
        orderBy: orderBy.length === 1 ? orderBy[0] : orderBy,
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
      where,
      ...getQueryParams,
    });
  }

  async createTransaction(payload: TransactionToCreate) {
    return prisma.transaction.create({
      data: payload,
    });
  }

  async updateTransaction(transactionId: string, payload: TransactionToUpdate) {
    return prisma.transaction.update({
      where: { id: transactionId },
      data: payload,
    });
  }

  async deleteTransaction(transactionId: string) {
    return prisma.transaction.delete({
      where: { id: transactionId },
    });
  }
}
