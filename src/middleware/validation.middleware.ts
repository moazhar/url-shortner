import { Request, Response, NextFunction } from 'express';

import AppError from '../utils/error.utils';
import { BAD_REQUEST } from '../constant/error.constant';
import ResponseUtility from '../utils/response.utils';

const validate =
  (validators: object) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = Object.entries(validators).map(([type, schema]) => {
        let errorObj;

        switch (type) {
          case 'p':
            errorObj = schema.validate(req.params).error;
            break;
          case 'q':
            errorObj = schema.validate(req.query).error;
            break;
          case 'h':
            errorObj = schema.validate(req.headers).error;
            break;
          case 'b':
            errorObj = schema.validate(req.body).error;
            break;
          default:
            errorObj = new AppError(BAD_REQUEST, {
              message: `Unexpected validation type: ${type}`,
            });
        }
        return errorObj ? errorObj.message : null;
      });
      const errorMessages = errors.filter(
        (error) => error !== null
      ) as string[];

      if (errorMessages.length > 0) {
        const errorText = errorMessages.join(',').replace(/"/g, "'");
        throw new AppError(BAD_REQUEST, { message: errorText });
      }

      next();
    } catch (error: any) {
      ResponseUtility.error(res, error);
    }
  };

export default validate;
