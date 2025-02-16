import mongoose, { Mongoose } from "mongoose";
import { TErrorSource, TGenericErrorResponse } from "./error-interface";

export const mongooseValidationErrorHandler = (err: mongoose.Error.ValidationError) : TGenericErrorResponse => {
    const errorSources: TErrorSource = Object.values(err.errors).map((val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return {
            path: val.path,
            message: val.message
        }
    })
    
    return {
      statusCode: 400,
      message: 'Zod validation error!',
      errorSources,
    };
}