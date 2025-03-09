import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import env from '../config/environment.js';
import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError.js';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode =
    err instanceof ApiError
      ? err.statusCode
      : StatusCodes.INTERNAL_SERVER_ERROR;

  const responseError: any = {
    statusCode,
    message: err.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
  };

  if (env.NODE_ENV === 'development') {
    responseError.stack = err.stack;
  }

  res.status(statusCode).json(responseError);
};

export default errorHandler;
