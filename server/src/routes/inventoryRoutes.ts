import { Router } from 'express';
import { getInventoryList, updateStock } from '../controllers/inventoryController';
import { jwtAuth } from '../middleware/jwtAuth';
import { adminOnly } from '../middleware/adminOnly';

const router = Router();

router.use(jwtAuth, adminOnly);
router.get('/', getInventoryList);
router.put('/update', updateStock);

export default router;
