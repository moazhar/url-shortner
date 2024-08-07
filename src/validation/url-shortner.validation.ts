import Joi from 'joi';

import { requiredStringValidation } from './index';

export const generateShortUrlBodyValidation = Joi.object({
  redirectUrl: requiredStringValidation,
});

export const redirectShortUrlPathValidation = Joi.object({
  shortId: requiredStringValidation,
});
