import express from 'express';

import catchAsync from '../middleware/async-execute.middleware';
import validate from '../middleware/validation.middleware';
import URLShortnerController from '../controller/url-shortner.controller';
import {
  generateShortUrlBodyValidation,
  redirectShortUrlPathValidation,
} from '../validation/url-shortner.validation';

const router = express.Router();

router.post(
  '/',
  catchAsync(validate({ b: generateShortUrlBodyValidation })),
  catchAsync(URLShortnerController.generateShortUrl)
);

router.get(
  '/:shortId',
  catchAsync(validate({ p: redirectShortUrlPathValidation })),
  catchAsync(URLShortnerController.redirectShortUrl)
);

router.get(
  '/analytics/:shortId',
  catchAsync(validate({ p: redirectShortUrlPathValidation })),
  catchAsync(URLShortnerController.getAnalytics)
);

export default router;
