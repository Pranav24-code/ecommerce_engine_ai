import { Request, Response } from 'express';
import { Category } from '../models/Category';
import { cacheService } from '../redis/cacheService';
import { mockCategories } from '../seed/products';

export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const cacheKey = 'categories:all';
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      res.json({ success: true, cached: true, data: cached });
      return;
    }

    let categories: any[] = [];
    try {
      categories = await Category.find().sort({ name: 1 });
      if (!categories || categories.length === 0) throw new Error('No DB categories');
    } catch (dbErr) {
      console.warn('[MongoDB Fallback] Category query failed, returning mock categories');
      categories = mockCategories.map((c, i) => ({
        _id: `cat-fallback-${i}`,
        ...c
      }));
    }

    await cacheService.set(cacheKey, categories, 1800);
    res.json({ success: true, cached: false, data: categories });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, image } = req.body;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    const category = await Category.create({ name, slug, description, image });
    await cacheService.del('categories:all');
    
    res.status(201).json({ success: true, data: category });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    await cacheService.del('categories:all');
    res.json({ success: true, message: 'Category deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
