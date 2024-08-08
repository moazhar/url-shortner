import { Request, Response } from 'express';

import { UserModel } from '../model/user.model';
import { CONFLICT } from '../constant/error.constant';
import BaseUtility from '../utils/base.utils';
import AppError from '../utils/error.utils';
import JWTUtility from '../utils/jwt.utils';

class UserController {
  public static async signUp(req: Request, res: Response) {
    const { firstName, lastName, email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (user) {
      throw new AppError(CONFLICT, {
        message: 'User already exists',
        metaData: { email },
      });
    }

    const hasedPassword = await BaseUtility.hashPassword(password);

    await UserModel.create({
      first_name: firstName,
      last_name: lastName,
      email,
      password: hasedPassword,
    });

    res.redirect('/api/v1/static/signin');
  }

  public static async signIn(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.redirect('/api/v1/static/signin');
    }

    // Verify password
    const isValidPassword = await BaseUtility.verifyPassword(
      user.password,
      password
    );
    if (!isValidPassword) {
      return res.redirect('/api/v1/static/signin');
    }

    /** Using JWT tokens */
    const jwtUtility = JWTUtility.getInstance();
    const token = jwtUtility.getAccessToken({
      id: user.id,
      email: user.email,
    });
    res.cookie('uid', token);

    return res.redirect('/api/v1/static');
  }
}

export default UserController;
