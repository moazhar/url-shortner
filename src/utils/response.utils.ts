import { type Response } from 'express';
import AppError from './error.utils';

class ResponseUtility {
  public static success(
    res: Response,
    data: any,
    message = 'Success',
    statusCode = 200
  ) {
    const responseBody = {
      status: 'success',
      message,
      data,
    };

    res.status(statusCode).json(responseBody);
  }

  public static error(res: Response, err: AppError | Error) {
    const customError = err instanceof AppError;

    const statusCode = customError && err.httpCode ? err.httpCode : 500;
    const message = customError ? err.message : 'Internal Server Error';
    const customErrorCode = customError ? err.customErrorCode : 500;
    const metaData = customError ? err.metaData : undefined;
    const stack = process.env.NODE_ENV === 'development' ? err.stack : {};

    const responseBody = {
      status: 'error',
      message,
      customErrorCode,
      metaData,
      stack,
    };

    res.status(statusCode).json(responseBody);
  }
}

export default ResponseUtility;
