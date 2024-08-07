import express from 'express';

import catchAsync from '../middleware/async-execute.middleware';
import StaticController from '../controller/static.controller';

const route = express.Router();

route.get('/', catchAsync(StaticController.renderHomePage));

export default route;
