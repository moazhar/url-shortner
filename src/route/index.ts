import express from 'express';

import urlRoute from './url-shortner.route';
import staticRoute from './static.route';

const router = express.Router();

router.use('/url-shortner', urlRoute);
router.use('/static', staticRoute);

export default router;
