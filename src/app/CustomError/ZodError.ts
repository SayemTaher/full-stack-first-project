import { ZodError, ZodIssue } from "zod";
import { TErrorSource, TGenericErrorResponse } from "./error-interface";

export const zodErrorHandler = (err: ZodError) : TGenericErrorResponse => {
  const errorSources: TErrorSource = err.issues.map((issue: ZodIssue) => ({
    path: issue?.path[issue.path.length - 1],
    message: issue.message,
  }));

  return {
    statusCode: 400,
    message: 'Zod validation error!',
    errorSources,
  };
};