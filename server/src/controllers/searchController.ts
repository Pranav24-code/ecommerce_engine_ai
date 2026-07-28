import { Request, Response } from 'express';
import { performHybridSearch } from '../embeddings/embeddingService';
import { cacheService } from '../redis/cacheService';

export const searchProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { q, category, minPrice, maxPrice, limit = 20 } = req.query;
    const queryStr = String(q || '').trim();

    if (!queryStr) {
      res.json({ success: true, data: [], message: 'Empty query' });
      return;
    }

    const cacheKey = `search:${queryStr}:${category || 'all'}:${minPrice || '0'}:${maxPrice || 'max'}`;
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      res.json({ success: true, cached: true, data: cached });
      return;
    }

    const results = await performHybridSearch(
      queryStr,
      category ? String(category) : undefined,
      minPrice ? Number(minPrice) : undefined,
      maxPrice ? Number(maxPrice) : undefined,
      Number(limit)
    );

    await cacheService.set(cacheKey, results, 300);
    res.json({ success: true, cached: false, data: results, count: results.length });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
