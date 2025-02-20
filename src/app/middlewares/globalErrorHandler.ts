import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import config from '../config';
import AppError from '../CustomError/app-error';
import { TErrorSource } from '../CustomError/error-interface';
import { handleCastError } from '../CustomError/handle-cast-error';
import { handleDuplicateError } from '../CustomError/handle-duplicate-error';
import { zodErrorHandler } from '../CustomError/ZodError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';

  let errorSources: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong!',
    },
  ];

  // Handling ZodError specifically
    if (err instanceof ZodError) {
      const simplifiedError = zodErrorHandler(err);
      statusCode = simplifiedError?.statusCode;
      message = simplifiedError?.message;
      errorSources = simplifiedError?.errorSources;
    } else if (err?.name === 'ValidationEror') {
      const simplifiedError = zodErrorHandler(err);
      statusCode = simplifiedError?.statusCode;
      message = simplifiedError?.message;
      errorSources = simplifiedError?.errorSources;
    } else if (err?.name === 'CastError') {
      const simplifiedError = handleCastError(err);
      statusCode = simplifiedError?.statusCode;
      message = simplifiedError?.message;
      errorSources = simplifiedError?.errorSources;
    } else if (err?.code === 11000) {
      const simplifiedError = handleDuplicateError(err);
      statusCode = simplifiedError?.statusCode;
      message = simplifiedError?.message;
      errorSources = simplifiedError?.errorSources;
    } else if (err instanceof AppError) {
      statusCode = err?.statusCode;
      message = err?.message;
        errorSources = [{
            path: '',
            message : err?.message
      }]
    } else if (err instanceof Error) {
        message = err?.message;
        errorSources = [
          {
            path: '',
            message: err?.message,
          },
        ];
    }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    gotError: err,
    stack : config.NODE_ENV === 'development' ? err?.stack : null
  });
};

export default globalErrorHandler;

/*
Error pattern
--------------
--------------
--- Success 
--- Message 
--- errorSource : [
    path : '',
    message : ''
]
--- stack
 */
