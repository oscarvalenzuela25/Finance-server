export type CreateOverview = {
  user_id: string;
  current_balance: number;
  income_balance: number;
  expenses_balance: number;
};

export type GetTransactionsQueryParams = {
  page?: number;
  limit?: number;
  q?: {
    search?: string;
    sort?: "asc" | "desc";
    category?: string;
  };
};

export type GetPotsQueryParams = {
  limit?: number;
};
