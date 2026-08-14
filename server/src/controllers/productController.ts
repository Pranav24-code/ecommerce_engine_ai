import { Request, Response } from 'express';
import { Product } from '../models/Product';
import { cacheService } from '../redis/cacheService';
import { generateEmbedding } from '../embeddings/embeddingService';

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, brand, minPrice, maxPrice, isFeatured, sort, page = 1, limit = 100 } = req.query;
    const cacheKey = `products:all:${JSON.stringify(req.query)}`;

    const cachedData = await cacheService.get(cacheKey);
    if (cachedData) {
      res.json({ success: true, cached: true, data: cachedData });
      return;
    }

    const filter: any = {};
    if (category && category !== 'All') filter.category = new RegExp(String(category), 'i');
    if (brand) filter.brand = new RegExp(String(brand), 'i');
    if (isFeatured === 'true') filter.isFeatured = true;

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    let sortOptions: any = { createdAt: -1 };
    if (sort === 'price_asc') sortOptions = { price: 1 };
    if (sort === 'price_desc') sortOptions = { price: -1 };
    if (sort === 'popular') sortOptions = { rating: -1, reviewCount: -1 };

    const skip = (Number(page) - 1) * Number(limit);
    const [products, total] = await Promise.all([
      Product.find(filter).sort(sortOptions).skip(skip).limit(Number(limit)),
      Product.countDocuments(filter),
    ]);

    const responsePayload = {
      products,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
      },
    };

    await cacheService.set(cacheKey, responsePayload, 300);
    res.json({ success: true, cached: false, data: responsePayload });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getFeaturedProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const cacheKey = 'featured';
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      res.json({ success: true, cached: true, data: cached });
      return;
    }

    const products = await Product.find({ isFeatured: true }).limit(10);
    await cacheService.set(cacheKey, products, 600);
    res.json({ success: true, cached: false, data: products });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const cacheKey = `product:${id}`;

    const cached = await cacheService.get(cacheKey);
    if (cached) {
      res.json({ success: true, cached: true, data: cached });
      return;
    }

    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }

    await cacheService.set(cacheKey, product, 600);
    res.json({ success: true, cached: false, data: product });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, price, originalPrice, category, brand, stock, images, tags, specs, isFeatured } = req.body;
    
    // Generate AI vector embedding
    const embeddingText = `${title} ${description} ${category} ${(tags || []).join(' ')}`;
    const embedding = await generateEmbedding(embeddingText);

    const product = await Product.create({
      title,
      description,
      price,
      originalPrice: originalPrice || price,
      category,
      brand: brand || 'Generic',
      stock: stock || 10,
      images: images || ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'],
      tags: tags || [],
      specs: specs || {},
      isFeatured: isFeatured || false,
      embedding,
    });

    await cacheService.invalidateProductCache(undefined, category);
    res.status(201).json({ success: true, message: 'Product created successfully', data: product });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.title || updates.description || updates.category) {
      const existing = await Product.findById(id);
      if (existing) {
        const fullText = `${updates.title || existing.title} ${updates.description || existing.description} ${updates.category || existing.category}`;
        updates.embedding = await generateEmbedding(fullText);
      }
    }

    const product = await Product.findByIdAndUpdate(id, updates, { new: true });
    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }

    await cacheService.invalidateProductCache(id, product.category);
    res.json({ success: true, message: 'Product updated successfully', data: product });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }

    await cacheService.invalidateProductCache(id, product.category);
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
