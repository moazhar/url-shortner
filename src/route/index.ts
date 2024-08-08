import express from 'express';

import urlRoute from './url-shortner.route';
import staticRoute from './static.route';
import userRoute from './user.route';

const router = express.Router();

router.use('/url-shortner', urlRoute);
router.use('/static', staticRoute);
router.use('/users', userRoute);

export default router;
