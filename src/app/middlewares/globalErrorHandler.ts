/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { IGenericErrorMessage } from '../../interfaces/error';
import { errorLogger } from '../../logger';

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  config.node_env !== 'production'
    ? console.log('Global error hander', error)
    : errorLogger.error(error);

  let statusCode = 500;
  let message = 'Something went wrong';
  let errorMessages: IGenericErrorMessage[] = [];

  // 1
  if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error.message,
          },
        ]
      : [];
  }

  // 2
  else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.node_env !== 'production' ? error?.stack : undefined,
  });
};

export default globalErrorHandler;
