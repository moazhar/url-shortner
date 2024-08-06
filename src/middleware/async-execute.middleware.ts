import { type Request, type Response, type NextFunction } from 'express';

const catchAsync =
  (controller: any) =>
  (request: Request, response: Response, next: NextFunction) => {
    controller(request, response, next).catch(next);
  };

export default catchAsync;
