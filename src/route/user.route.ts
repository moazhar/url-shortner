import express from 'express';

import catchAsync from '../middleware/async-execute.middleware';
import UserController from '../controller/user.controller';
import {
  signupBodyValidation,
  signinBodyValidation,
} from '../validation/user.validation';
import validate from '../middleware/validation.middleware';

const router = express.Router();

router.post(
  '/signup',
  catchAsync(validate({ b: signupBodyValidation })),
  catchAsync(UserController.signUp)
);

router.post(
  '/login',
  catchAsync(validate({ b: signinBodyValidation })),
  catchAsync(UserController.signIn)
);

export default router;
