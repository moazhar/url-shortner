import { Request, Response } from 'express';

import URLModel from '../model/url.model';

class StaticController {
  public static renderHomePage = async (req: Request, res: Response) => {
    const urls = await URLModel.find();

    res.render('home', { urls });
  };
}

export default StaticController;
