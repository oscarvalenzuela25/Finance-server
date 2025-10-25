export type CreateOverview = {
  user_id: string;
  current_balance: number;
  income_balance: number;
  expenses_balance: number;
};

export type GetPotsQueryParams = {
  limit?: number;
};

// Transactions
export type GetTransactionsQueryParams = {
  page?: number;
  limit?: number;
  q?: {
    search?: string;
    sort_name?: "asc" | "desc";
    sort_transaction_date?: "asc" | "desc";
    sort_amount?: "asc" | "desc";
    category?: string;
  };
};

export type Transaction = {
  id: string;
  user_id: string;
  name: string;
  amount: number;
  transaction_date: Date;
  category_id: string;
};

export type TransactionToCreate = Omit<Transaction, "id">;

export type TransactionToUpdate = Partial<TransactionToCreate>;
