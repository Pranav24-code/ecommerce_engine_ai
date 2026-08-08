import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { config } from '../config/env';
import { User } from '../models/User';
import { Product } from '../models/Product';
import { Category } from '../models/Category';
import { Coupon } from '../models/Coupon';
import { Inventory } from '../models/Inventory';
import { generateEmbedding } from '../embeddings/embeddingService';
import { cacheService } from '../redis/cacheService';
import { mockCategories, products } from './products';

const seedDB = async () => {
  try {
    console.log('[Seed] Connecting to MongoDB Atlas...');
    await mongoose.connect(config.mongoUri);
    console.log('[Seed] Connected to MongoDB.');

    // Clear existing collections
    await Promise.all([
      User.deleteMany({}),
      Product.deleteMany({}),
      Category.deleteMany({}),
      Coupon.deleteMany({}),
      Inventory.deleteMany({})
    ]);
    console.log('[Seed] Cleared existing database collections.');

    // 1. Create Test User Accounts
    const hashedPasswordAdmin = await bcrypt.hash('admin123', 10);
    const hashedPasswordCustomer = await bcrypt.hash('customer123', 10);

    await User.create({
      name: 'Admin Manager',
      email: 'admin@example.com',
      password: hashedPasswordAdmin,
      role: 'admin',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AdminManager',
    });

    await User.create({
      name: 'John Doe',
      email: 'customer@example.com',
      password: hashedPasswordCustomer,
      role: 'customer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JohnDoe',
      addresses: [{ street: '123 Tech Way', city: 'San Francisco', state: 'CA', postalCode: '94105', country: 'USA', isDefault: true }],
    });

    console.log(`[Seed] Created test user accounts:\n  - Admin: admin@example.com / admin123\n  - Customer: customer@example.com / customer123`);

    // 2. Insert Categories
    const categoryDocs = await Category.insertMany(mockCategories);
    console.log(`[Seed] Inserted ${categoryDocs.length} categories.`);

    // 3. Generate AI Vector Embeddings for Product Data
    console.log(`[Seed] Generating AI vector embeddings for ${products.length} catalog products...`);
    const productDocs = [];
    
    for (let i = 0; i < products.length; i++) {
      const prod = products[i];
      const textToEmbed = `${prod.title} ${prod.description} ${prod.category} ${prod.brand} ${prod.tags.join(' ')}`;
      const embedding = await generateEmbedding(textToEmbed);

      productDocs.push({
        ...prod,
        embedding,
      });

      if ((i + 1) % 5 === 0 || i === products.length - 1) {
        console.log(`[Seed] Generated vector embeddings (${i + 1}/${products.length})...`);
      }
    }

    const createdProducts = await Product.insertMany(productDocs);
    console.log(`[Seed] Successfully inserted ${createdProducts.length} products with vector embeddings into MongoDB.`);

    // Update Category product counts
    for (const cat of categoryDocs) {
      const count = createdProducts.filter(p => p.category.toLowerCase() === cat.name.toLowerCase()).length;
      await Category.findByIdAndUpdate(cat._id, { productCount: count });
    }

    // 4. Create Inventory Tracking Records
    const inventoryDocs = createdProducts.map((p, idx) => ({
      product: p._id,
      productTitle: p.title,
      sku: `SKU-${p.category.substring(0, 3).toUpperCase()}-${1000 + idx}`,
      stock: p.stock,
      lowStockThreshold: 5,
      reorderQuantity: 25
    }));
    await Inventory.insertMany(inventoryDocs);
    console.log(`[Seed] Created ${inventoryDocs.length} inventory tracking records.`);

    // 5. Create Promotional Coupons
    await Coupon.insertMany([
      { code: 'SAVE10', discountPercentage: 10, minOrderValue: 50, expiresAt: new Date('2028-12-31') },
      { code: 'WINTER20', discountPercentage: 20, maxDiscount: 50, minOrderValue: 100, expiresAt: new Date('2028-12-31') },
      { code: 'WELCOME15', discountPercentage: 15, minOrderValue: 30, expiresAt: new Date('2028-12-31') }
    ]);
    console.log('[Seed] Created promo coupons: SAVE10, WINTER20, WELCOME15');

    // 6. Invalidate Redis Cache
    try {
      await cacheService.invalidateProductCache();
      console.log('[Seed] Redis catalog cache invalidated.');
    } catch (e) {
      console.log('[Seed] Redis cache notice:', e);
    }

    console.log('[Seed] Database seeding finished successfully!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error);
    process.exit(1);
  }
};

seedDB();
