import { Router } from 'express';
import {
  getAllProducts,
  getFeaturedProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';
import { jwtAuth } from '../middleware/jwtAuth';
import { adminOnly } from '../middleware/adminOnly';

const router = Router();

router.get('/', getAllProducts);
router.get('/featured', getFeaturedProducts);
router.get('/:id', getProductById);

// Admin protected endpoints
router.post('/', jwtAuth, adminOnly, createProduct);
router.put('/:id', jwtAuth, adminOnly, updateProduct);
router.delete('/:id', jwtAuth, adminOnly, deleteProduct);

export default router;
