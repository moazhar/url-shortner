import { sign, verify } from 'jsonwebtoken';

import env from '../../env';
import { User } from '../model/user.model';

class JWTUtility {
  private static instance: JWTUtility;

  private readonly secretKey: string;

  private readonly accessTokenExpiry: number;

  private readonly refreshTokenExpiry: number;

  constructor() {
    this.secretKey = env.JWT_SECRET_KEY;
    this.accessTokenExpiry = env.JWT_ACCESS_TOKEN_EXPIRY;
    this.refreshTokenExpiry = env.REFRESH_ACCESS_TOKEN_EXPIRY;
  }

  public static getInstance() {
    if (!JWTUtility.instance) {
      JWTUtility.instance = new JWTUtility();
    }

    return JWTUtility.instance;
  }

  public getAccessToken(user: Partial<User>) {
    const payload = {
      id: user.id,
      email: user.email,
    };

    return sign(payload, this.secretKey, {
      expiresIn: this.accessTokenExpiry,
    });
  }

  public getRefreshToken(user: Partial<User>) {
    const payload = {
      id: user.id,
      email: user.email,
    };

    return sign(payload, this.secretKey, {
      expiresIn: this.refreshTokenExpiry,
    });
  }

  public verifyAccessOrRefreshToken(token: string) {
    return verify(token, this.secretKey);
  }
}

export default JWTUtility;
