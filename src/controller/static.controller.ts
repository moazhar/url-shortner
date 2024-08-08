import { Request, Response } from 'express';

import { URLModel } from '../model/url.model';
import { CustomRequest } from '../types/custom.types';

class StaticController {
  public static renderHomePage = async (req: CustomRequest, res: Response) => {
    if (!req.user) res.redirect('/api/v1/static/signin');

    const urls = await URLModel.find({ userId: req.user.id });

    res.render('home', { urls });
  };

  public static renderSignUpPage = async (req: Request, res: Response) => {
    res.render('signup');
  };

  public static renderSignInPage = async (req: Request, res: Response) => {
    res.render('signin');
  };
}

export default StaticController;
