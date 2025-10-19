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
