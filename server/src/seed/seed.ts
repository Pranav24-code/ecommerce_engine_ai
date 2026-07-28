import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { config } from '../config/env';
import { User } from '../models/User';
import { Product } from '../models/Product';
import { Category } from '../models/Category';
import { Coupon } from '../models/Coupon';
import { Inventory } from '../models/Inventory';
import { generateEmbedding } from '../embeddings/embeddingService';

const mockCategories = [
  { name: 'Electronics', slug: 'electronics', description: 'Smartphones, laptops, audio & tech accessories', image: 'https://images.unsplash.com/photo-1498049860654-af1a5c566876?w=500' },
  { name: 'Footwear', slug: 'footwear', description: 'Sneakers, running shoes, boots & formal wear', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500' },
  { name: 'Apparel & Winter Wear', slug: 'apparel-winter', description: 'Warm jackets, hoodies, coats, denim & t-shirts', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500' },
  { name: 'Home & Kitchen', slug: 'home-kitchen', description: 'Smart home decor, coffee machines & appliances', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500' },
  { name: 'Fitness & Sports', slug: 'fitness-sports', description: 'Smartwatches, gym gear & activewear', image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500' }
];

const mockProductsData = [
  {
    title: 'Ultra-Warm Winter Down Parka Jacket',
    description: 'Heavyweight insulated puffer coat designed for extreme snowfall, sub-zero temperatures, waterproof shell, fleece-lined hood.',
    price: 189.99,
    originalPrice: 249.99,
    category: 'Apparel & Winter Wear',
    brand: 'ArcticShield',
    stock: 25,
    images: ['https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600', 'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=600'],
    rating: 4.8,
    reviewCount: 42,
    isFeatured: true,
    isTrending: true,
    tags: ['winter', 'jacket', 'warm', 'snowfall', 'coat', 'waterproof', 'cold weather'],
    specs: { Material: '100% Nylon', Insulation: '800-fill Down', Waterproof: 'Yes (10,000mm)' }
  },
  {
    title: 'ProSound Noise Cancelling Headphones',
    description: 'Active Noise Cancellation (ANC) wireless over-ear Bluetooth headphones with 40-hour battery life, spatial audio & deep bass.',
    price: 299.99,
    originalPrice: 349.99,
    category: 'Electronics',
    brand: 'SoundCore',
    stock: 18,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600', 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600'],
    rating: 4.9,
    reviewCount: 128,
    isFeatured: true,
    isTrending: true,
    tags: ['audio', 'headphones', 'bluetooth', 'noise cancelling', 'music', 'anc'],
    specs: { BatteryLife: '40 hours', Connectivity: 'Bluetooth 5.3', ANC: 'Hybrid Active' }
  },
  {
    title: 'RunnerPro Light Responsive Sneakers',
    description: 'Ultra-lightweight breathable mesh running shoes with cloud foam cushion midsole and high-traction rubber outsole.',
    price: 119.99,
    originalPrice: 149.99,
    category: 'Footwear',
    brand: 'Velocity',
    stock: 30,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600'],
    rating: 4.7,
    reviewCount: 89,
    isFeatured: true,
    isTrending: false,
    tags: ['shoes', 'sneakers', 'running', 'sports', 'footwear', 'breathable'],
    specs: { Weight: '240g', Insole: 'Memory Foam', Terrain: 'Road / Trail' }
  },
  {
    title: 'Smart Barista Espresso Coffee Machine',
    description: '15-Bar Italian pump espresso maker with built-in milk frother, precise thermal PID temperature control & stainless steel body.',
    price: 249.99,
    originalPrice: 299.99,
    category: 'Home & Kitchen',
    brand: 'BrewMaster',
    stock: 12,
    images: ['https://images.unsplash.com/photo-1517668808822-9ebe02f2a6ee?w=600', 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600'],
    rating: 4.6,
    reviewCount: 56,
    isFeatured: true,
    isTrending: false,
    tags: ['coffee', 'espresso', 'kitchen', 'appliance', 'barista', 'latte'],
    specs: { PumpPressure: '15 Bar', WaterTank: '1.8L', Power: '1350W' }
  },
  {
    title: 'Titanium Tough GPS Smartwatch',
    description: 'Rugged outdoor smartwatch with heart rate monitor, SPO2 sensor, multi-sport GPS tracking and 14-day battery.',
    price: 199.99,
    originalPrice: 229.99,
    category: 'Fitness & Sports',
    brand: 'PulseTech',
    stock: 22,
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600', 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600'],
    rating: 4.8,
    reviewCount: 94,
    isFeatured: false,
    isTrending: true,
    tags: ['smartwatch', 'fitness', 'tracker', 'gps', 'heart rate', 'titanium'],
    specs: { Display: '1.4" AMOLED', WaterResistance: '5ATM (50m)', Battery: '14 Days' }
  },
  {
    title: 'Ergonomic Mesh Office Chair',
    description: 'High-back desk chair with lumbar support, adjustable 3D armrests, tilt lock and breathable mesh for all-day comfort.',
    price: 179.99,
    originalPrice: 219.99,
    category: 'Home & Kitchen',
    brand: 'FlexiDesk',
    stock: 15,
    images: ['https://images.unsplash.com/photo-1580481072645-022f9a6d1270?w=600'],
    rating: 4.5,
    reviewCount: 37,
    isFeatured: false,
    isTrending: false,
    tags: ['chair', 'office', 'ergonomic', 'furniture', 'desk', 'lumbar'],
    specs: { MaxWeight: '300 lbs', Material: 'Breathable Mesh', Recline: '90-135 degrees' }
  }
];

const seedDB = async () => {
  try {
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

    // Create Test Accounts
    const hashedPasswordAdmin = await bcrypt.hash('admin123', 10);
    const hashedPasswordCustomer = await bcrypt.hash('customer123', 10);

    const adminUser = await User.create({
      name: 'Admin Manager',
      email: 'admin@example.com',
      password: hashedPasswordAdmin,
      role: 'admin',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AdminManager',
    });

    const customerUser = await User.create({
      name: 'John Doe',
      email: 'customer@example.com',
      password: hashedPasswordCustomer,
      role: 'customer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JohnDoe',
      addresses: [{ street: '123 Tech Way', city: 'San Francisco', state: 'CA', postalCode: '94105', country: 'USA', isDefault: true }],
    });

    console.log(`[Seed] Created test users:\n  - Admin: admin@example.com / admin123\n  - Customer: customer@example.com / customer123`);

    // Insert Categories
    const categories = await Category.insertMany(mockCategories);
    console.log(`[Seed] Inserted ${categories.length} categories.`);

    // Insert Products with generated Vector Embeddings
    console.log('[Seed] Generating vector embeddings for product catalog...');
    const productDocs = [];
    for (const prod of mockProductsData) {
      const textToEmbed = `${prod.title} ${prod.description} ${prod.category} ${prod.tags.join(' ')}`;
      const embedding = await generateEmbedding(textToEmbed);

      productDocs.push({
        ...prod,
        embedding
      });
    }

    const createdProducts = await Product.insertMany(productDocs);
    console.log(`[Seed] Successfully created ${createdProducts.length} products with 384-dim vector embeddings.`);

    // Create Inventory tracking records
    const inventoryDocs = createdProducts.map((p, idx) => ({
      product: p._id,
      productTitle: p.title,
      sku: `SKU-${1000 + idx}`,
      stock: p.stock,
      lowStockThreshold: 5,
      reorderQuantity: 20
    }));
    await Inventory.insertMany(inventoryDocs);
    console.log(`[Seed] Created ${inventoryDocs.length} inventory records.`);

    // Create Sample Promo Coupons
    await Coupon.insertMany([
      { code: 'SAVE10', discountPercentage: 10, minOrderValue: 50, expiresAt: new Date('2027-12-31') },
      { code: 'WINTER20', discountPercentage: 20, maxDiscount: 50, minOrderValue: 100, expiresAt: new Date('2027-12-31') },
      { code: 'WELCOME15', discountPercentage: 15, minOrderValue: 30, expiresAt: new Date('2027-12-31') }
    ]);
    console.log('[Seed] Created sample coupons: SAVE10, WINTER20, WELCOME15');

    console.log('[Seed] Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error);
    process.exit(1);
  }
};

seedDB();
