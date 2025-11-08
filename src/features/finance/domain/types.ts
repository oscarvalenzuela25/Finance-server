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
  category_id: string;
  budget_id?: string;
  name: string;
  amount: number;
  transaction_date: Date;
};

export type TransactionToCreate = Omit<Transaction, "id">;

export type TransactionToUpdate = Partial<TransactionToCreate>;

// Pots
export type GetPotsQueryParams = {
  limit?: number;
};

export type Pot = {
  id: string;
  user_id: string;
  name: string;
  target_value: string;
  current_value: string;
  theme: string;
};

export type PotToCreate = Omit<Pot, "id">;

export type PotToUpdate = Partial<PotToCreate>;

// Budgets
export type Budget = {
  id: string;
  user_id: string;
  category_id: string;
  maximum: number;
  theme: string;
};

export type BudgetToCreate = Omit<Budget, "id">;

export type BudgetToUpdate = Partial<BudgetToCreate>;
