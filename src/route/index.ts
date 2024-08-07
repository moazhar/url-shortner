import express from 'express';

import urlRoute from './url-shortner.route';

const router = express.Router();

router.use('/url-shortner', urlRoute);

export default router;
