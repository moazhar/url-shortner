import { type NextFunction, type Request, type Response } from 'express';
import ResponseUtility from '../utils/response.utils';
import type AppError from '../utils/error.utils';

const errorHandler = (
  error: AppError | Error,
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  ResponseUtility.error(response, error);
};

export default errorHandler;
