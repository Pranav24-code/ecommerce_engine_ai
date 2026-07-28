import { Router } from 'express';
import { getCategories, createCategory, deleteCategory } from '../controllers/categoryController';
import { jwtAuth } from '../middleware/jwtAuth';
import { adminOnly } from '../middleware/adminOnly';

const router = Router();

router.get('/', getCategories);
router.post('/', jwtAuth, adminOnly, createCategory);
router.delete('/:id', jwtAuth, adminOnly, deleteCategory);

export default router;
