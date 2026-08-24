import { Request, Response } from 'express';
import { Product } from '../models/Product';
import { cacheService } from '../redis/cacheService';
import { generateEmbedding } from '../embeddings/embeddingService';
import { products as seedProducts } from '../seed/products';

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, brand, minPrice, maxPrice, isFeatured, sort, page = 1, limit = 100 } = req.query;
    const cacheKey = `products:all:${JSON.stringify(req.query)}`;

    const cachedData = await cacheService.get(cacheKey);
    if (cachedData) {
      res.json({ success: true, cached: true, data: cachedData });
      return;
    }

    let productsList: any[] = [];
    let total = 0;

    try {
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
      const [dbProducts, dbTotal] = await Promise.all([
        Product.find(filter).sort(sortOptions).skip(skip).limit(Number(limit)),
        Product.countDocuments(filter),
      ]);
      productsList = dbProducts;
      total = dbTotal;
    } catch (dbErr) {
      console.warn('[MongoDB Fallback] Product query failed, serving seed data fallback:', (dbErr as Error).message);
      // Fallback filtering over seed products
      let filtered = [...seedProducts];
      if (category && category !== 'All') {
        filtered = filtered.filter(p => p.category.toLowerCase().includes(String(category).toLowerCase()));
      }
      if (brand) {
        filtered = filtered.filter(p => p.brand.toLowerCase().includes(String(brand).toLowerCase()));
      }
      if (isFeatured === 'true') {
        filtered = filtered.filter(p => p.isFeatured);
      }
      if (minPrice) filtered = filtered.filter(p => p.price >= Number(minPrice));
      if (maxPrice) filtered = filtered.filter(p => p.price <= Number(maxPrice));

      if (sort === 'price_asc') filtered.sort((a, b) => a.price - b.price);
      else if (sort === 'price_desc') filtered.sort((a, b) => b.price - a.price);
      else if (sort === 'popular') filtered.sort((a, b) => b.rating - a.rating);

      total = filtered.length;
      const skip = (Number(page) - 1) * Number(limit);
      productsList = filtered.slice(skip, skip + Number(limit)).map((p, i) => ({
        _id: `fallback-${i}`,
        ...p,
        createdAt: new Date().toISOString()
      }));
    }

    const responsePayload = {
      products: productsList,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)) || 1,
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

    let products: any[] = [];
    try {
      products = await Product.find({ isFeatured: true }).limit(10);
      if (!products || products.length === 0) throw new Error('No DB products');
    } catch (dbErr) {
      console.warn('[MongoDB Fallback] Featured products query failed, using seed fallback');
      products = seedProducts.filter(p => p.isFeatured).slice(0, 10).map((p, i) => ({
        _id: `featured-fallback-${i}`,
        ...p
      }));
    }

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

    let product: any = null;
    try {
      product = await Product.findById(id);
    } catch (dbErr) {
      console.warn('[MongoDB Fallback] Product findById failed, searching seed fallback');
    }

    if (!product) {
      // Find in seedProducts by index or title slug match
      const fallbackIndex = parseInt(id.replace(/[^0-9]/g, ''), 10);
      if (!isNaN(fallbackIndex) && seedProducts[fallbackIndex]) {
        product = { _id: id, ...seedProducts[fallbackIndex] };
      } else {
        const found = seedProducts.find(p => p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === id.toLowerCase() || p.title === id);
        if (found) product = { _id: id, ...found };
        else if (seedProducts.length > 0) product = { _id: id, ...seedProducts[0] };
      }
    }

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
