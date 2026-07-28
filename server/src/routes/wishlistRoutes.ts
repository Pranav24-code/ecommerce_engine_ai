import { Router } from 'express';
import { getWishlist, toggleWishlist } from '../controllers/wishlistController';
import { jwtAuth } from '../middleware/jwtAuth';

const router = Router();

router.use(jwtAuth);
router.get('/', getWishlist);
router.post('/toggle', toggleWishlist);

export default router;
