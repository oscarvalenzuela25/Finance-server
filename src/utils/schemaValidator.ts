import { ZodSchema } from "zod";
import { CustomError } from "./CustomErrors";

export const validate = <T extends ZodSchema>(schema: T, data: unknown) => {
  const result = schema.safeParse(data);
  if (!result.success) {
    const e = result.error.flatten();
    const err = CustomError.validation(
      JSON.stringify(e.fieldErrors)
    ) as Error & {
      details?: any;
    };
    err.details = e;
    throw err;
  }
  return result.data;
};
