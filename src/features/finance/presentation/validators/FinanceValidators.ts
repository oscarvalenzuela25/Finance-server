import z from "zod";

export const getTransactionsQueryParams = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
  q: z
    .object({
      search: z.string().optional(),
      sort_name: z.enum(["asc", "desc"]).optional(),
      sort_transaction_date: z.enum(["asc", "desc"]).optional(),
      sort_amount: z.enum(["asc", "desc"]).optional(),
      category: z.string().optional(),
    })
    .optional(),
});

export const createTransaction = z.object({
  category_id: z.string(),
  budget_id: z.string().optional(),
  name: z.string(),
  amount: z.number(),
  transaction_date: z.string(),
});

export const updateTransactionRouteParams = z.object({
  transactionId: z.string(),
});

export const updateTransaction = z.object({
  category_id: z.string().optional(),
  budget_id: z.string().optional(),
  name: z.string().optional(),
  amount: z.number().optional(),
});

export const deleteTransactionRouteParams = z.object({
  transactionId: z.string(),
});

export const getPotsQueryParams = z.object({
  limit: z.number().optional(),
});

export const createPot = z.object({
  name: z.string(),
  target_value: z.number(),
  current_value: z.number(),
  theme: z.string(),
});

export const updatePotRouteParams = z.object({
  potId: z.string(),
});

export const updatePot = z.object({
  name: z.string().optional(),
  target_value: z.number().optional(),
  current_value: z.number().optional(),
  theme: z.string().optional(),
});

export const deletePotRouteParams = z.object({
  potId: z.string(),
});
