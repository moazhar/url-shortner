import { Request, Response } from 'express';
import mongoose from 'mongoose';

import ResponseUtility from '../utils/response.utils';
import BaseUtility from '../utils/base.utils';
import { URLModel } from '../model/url.model';
import AppError from '../utils/error.utils';
import { BAD_REQUEST } from '../constant/error.constant';
import { CustomRequest } from '../types/custom.types';

class URLShortnerController {
  public static generateShortUrl = async (
    req: CustomRequest,
    res: Response
  ) => {
    const { redirectUrl } = req.body;
    const { id } = req.user;
    const shortId = BaseUtility.getRandomString();

    const data = await URLModel.create({
      userId: new mongoose.Types.ObjectId(id),
      short_id: shortId,
      redirect_url: redirectUrl,
    });

    res.render('home', { id: data.short_id });
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

    url.visits?.push({ timestamp: new Date() });
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
      totalClicks: url.visits?.length,
      analytics: url.visits,
    };

    ResponseUtility.success(res, data);
  };
}

export default URLShortnerController;
