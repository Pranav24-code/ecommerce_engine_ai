import { Router } from 'express';
import { getDashboardOverview, getSalesTrends } from '../controllers/analyticsController';
import { jwtAuth } from '../middleware/jwtAuth';
import { adminOnly } from '../middleware/adminOnly';

const router = Router();

router.use(jwtAuth, adminOnly);
router.get('/overview', getDashboardOverview);
router.get('/sales-trends', getSalesTrends);

export default router;
