import { StatusCodes } from 'http-status-codes';

export const BAD_REQUEST = {
  customErrorCode: 4000,
  message: 'Bad Request',
  httpCode: StatusCodes.BAD_REQUEST,
};

export const NOT_AUTHORIZED = {
  customErrorCode: 4010,
  message: 'Not Authorized',
  httpCode: StatusCodes.UNAUTHORIZED,
};

export const RESOURCE_NOT_FOUND = {
  customErrorCode: 4040,
  message: 'Not Found',
  httpCode: StatusCodes.NOT_FOUND,
};

export const CONFLICT = {
  customErrorCode: 4090,
  message: 'Resource Already Exists',
  httpCode: StatusCodes.CONFLICT,
};

export const SERVER_ERROR = {
  customErrorCode: 5000,
  message: 'Internal Server Error',
  httpCode: StatusCodes.INTERNAL_SERVER_ERROR,
};
