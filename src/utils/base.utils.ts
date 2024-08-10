import crypto from 'crypto';
import bcrypt from 'bcryptjs';

import PASSWORD_SALT_ROUND from '../constant/base.constant';

class BaseUtility {
  public static getRandomString = (length = 8) =>
    crypto.randomBytes(length).toString('base64url');

  public static hashPassword = async (password: string) => {
    return bcrypt.hashSync(password, PASSWORD_SALT_ROUND);
  };

  public static verifyPassword = async (
    hasedPassword: string,
    password: string
  ) => {
    return bcrypt.compareSync(password, hasedPassword);
  };

  public static getRandomUUID = () => crypto.randomUUID();
}

export default BaseUtility;
