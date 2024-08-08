import Joi from 'joi';

import {
  requiredStringValidation,
  stringValidation,
  emailValidation,
} from './index';

export const signupBodyValidation = Joi.object({
  firstName: stringValidation.allow(''),
  lastName: requiredStringValidation,
  email: emailValidation.required(),
  password: requiredStringValidation,
});

export const signinBodyValidation = Joi.object({
  email: emailValidation.required(),
  password: requiredStringValidation,
});
