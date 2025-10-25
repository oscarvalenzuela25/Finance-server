import z from "zod";

export const getTransactionsQueryParams = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
  q: z
    .object({
      search: z.string().optional(),
      sort: z.enum(["asc", "desc"]).optional(),
      category: z.string().optional(),
    })
    .optional(),
});

export const getPotsQueryParams = z.object({
  limit: z.number().optional(),
});

export const createTransaction = z.object({
  category_id: z.string(),
  name: z.string(),
  amount: z.number(),
  transaction_date: z.string(),
});

export const updateTransactionRouteParams = z.object({
  transactionId: z.string(),
});

export const updateTransaction = z.object({
  category_id: z.string().optional(),
  name: z.string().optional(),
  amount: z.number().optional(),
});

export const deleteTransactionRouteParams = z.object({
  transactionId: z.string(),
});
