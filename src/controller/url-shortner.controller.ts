import { Request, Response } from 'express';

import ResponseUtility from '../utils/response.utils';
import BaseUtility from '../utils/base.utils';
import URLModel from '../model/url.model';
import AppError from '../utils/error.utils';
import { BAD_REQUEST } from '../constant/error.constant';

class URLShortnerController {
  public static generateShortUrl = async (req: Request, res: Response) => {
    const { redirectUrl } = req.body;
    const shortId = BaseUtility.getRandomString();

    const data = await URLModel.create({
      short_id: shortId,
      redirect_url: redirectUrl,
    });

    ResponseUtility.success(res, data, undefined, 201);
  };

  public static redirectShortUrl = async (req: Request, res: Response) => {
    const { shortId } = req.params;

    const url = await URLModel.findOne({ short_id: shortId });
    if (!url) {
      console.error(`Invalid short id: ${shortId}`);
      throw new AppError(BAD_REQUEST, {
        message: 'Invalid short id',
        metaData: { shortId },
      });
    }

    url.visits.push({ timestamp: Date.now() });
    await url.save();

    res.redirect(url.redirect_url);
  };

  public static getAnalytics = async (req: Request, res: Response) => {
    const { shortId } = req.params;

    const url = await URLModel.findOne({ short_id: shortId });
    if (!url) {
      console.error(`Invalid short id: ${shortId}`);
      throw new AppError(BAD_REQUEST, {
        message: 'Invalid short id',
        metaData: { shortId },
      });
    }

    const data = {
      totalClicks: url.visits.length,
      analytics: url.visits,
    };

    ResponseUtility.success(res, data);
  };
}

export default URLShortnerController;
