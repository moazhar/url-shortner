import { Response, NextFunction } from 'express';

import JWTUtility from '../utils/jwt.utils';
import { CustomRequest, JWTTokenPayload } from '../types/custom.types';

export const isAuthenticated = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const cookie = req.cookies?.uid;

  if (!cookie) {
    return res.redirect('/api/v1/static/signin');
  }

  try {
    /** Using JWT tokens */
    const jwtUtility = JWTUtility.getInstance();
    const decoded = jwtUtility.verifyAccessOrRefreshToken(
      cookie
    ) as JWTTokenPayload;

    req.user = decoded;

    return next();
  } catch (error: any) {
    console.error('Token verification failed:', error.message);
    return res.redirect('/api/v1/static/signin');
  }
};

export const checkAuth = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const cookie = req.cookies?.uid;

  if (!cookie) {
    return next();
  }

  try {
    const jwtUtility = JWTUtility.getInstance();
    const decoded = jwtUtility.verifyAccessOrRefreshToken(
      cookie
    ) as JWTTokenPayload;
    req.user = decoded;
  } catch (error: any) {
    console.error('Token verification failed:', error.message);
    return res.redirect('/api/v1/static/signin');
  }

  return next();
};
