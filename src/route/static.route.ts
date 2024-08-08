import express from 'express';

import catchAsync from '../middleware/async-execute.middleware';
import StaticController from '../controller/static.controller';
import { checkAuth } from '../middleware/authenticate.middleware';

const router = express.Router();

router.get(
  '/',
  catchAsync(checkAuth),
  catchAsync(StaticController.renderHomePage)
);
router.get('/signup', catchAsync(StaticController.renderSignUpPage));
router.get('/signin', catchAsync(StaticController.renderSignInPage));

export default router;
