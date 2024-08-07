import crypto from 'crypto';

class BaseUtility {
  public static getRandomString = (length = 8) =>
    crypto.randomBytes(length).toString('base64url');
}

export default BaseUtility;
