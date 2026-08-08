export interface SeedProduct {
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  category: string;
  brand: string;
  stock: number;
  images: string[];
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isTrending: boolean;
  tags: string[];
  specs: Record<string, string>;
}

export const mockCategories = [
  { name: 'Electronics', slug: 'electronics', description: 'Smartphones, laptops, audio, cameras & smart displays', image: 'https://images.unsplash.com/photo-1498049860654-af1a5c566876?w=600' },
  { name: 'Fashion', slug: 'fashion', description: 'Jackets, t-shirts, jeans, hoodies & winter apparel', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600' },
  { name: 'Shoes', slug: 'shoes', description: 'Running shoes, sneakers, boots & formal footwear', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600' },
  { name: 'Beauty', slug: 'beauty', description: 'Skincare serums, luxury perfumes, cleansers & makeup', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600' },
  { name: 'Home & Kitchen', slug: 'home-kitchen', description: 'Espresso machines, air fryers, blenders & office chairs', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600' },
  { name: 'Sports & Fitness', slug: 'fitness-sports', description: 'Smartwatches, yoga mats, dumbbells & activewear', image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600' },
  { name: 'Gaming', slug: 'gaming', description: 'Mechanical keyboards, gaming mice, headsets & monitors', image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600' },
  { name: 'Accessories', slug: 'accessories', description: 'Leather wallets, sunglasses, travel backpacks & duffels', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600' },
];

export const products: SeedProduct[] = [
  // ─── ELECTRONICS ───────────────────────────────────────────────
  {
    title: 'Apple iPhone 15 Pro Max',
    description: 'Titanium design with Super Retina XDR OLED display, A17 Pro chip, 48MP camera system with 5x optical zoom, and Action button.',
    price: 1199.99,
    originalPrice: 1299.99,
    category: 'Electronics',
    brand: 'Apple',
    stock: 45,
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600'
    ],
    rating: 4.9,
    reviewCount: 245,
    isFeatured: true,
    isTrending: true,
    tags: ['iphone', 'apple', 'smartphone', 'electronics', 'camera', '5g', 'mobile'],
    specs: { Screen: '6.7-inch OLED', Processor: 'A17 Pro', Storage: '256GB', Connectivity: '5G / Wi-Fi 6E' }
  },
  {
    title: 'ProSound ANC Noise Cancelling Headphones',
    description: 'Active Noise Cancellation (ANC) wireless over-ear Bluetooth headphones with 40-hour battery life, spatial audio & deep bass.',
    price: 299.99,
    originalPrice: 349.99,
    category: 'Electronics',
    brand: 'Sony',
    stock: 28,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600'
    ],
    rating: 4.8,
    reviewCount: 184,
    isFeatured: true,
    isTrending: true,
    tags: ['audio', 'headphones', 'bluetooth', 'noise cancelling', 'music', 'anc', 'wireless'],
    specs: { Battery: '40 Hours', Driver: '40mm Neodymium', NoiseCancellation: 'Hybrid ANC', Weight: '250g' }
  },
  {
    title: 'Samsung Galaxy S24 Ultra 5G',
    description: 'AI-powered flagship smartphone featuring Galaxy AI, 200MP quad-telephoto camera, Snapdragon 8 Gen 3, and integrated S-Pen.',
    price: 1299.99,
    originalPrice: 1399.99,
    category: 'Electronics',
    brand: 'Samsung',
    stock: 30,
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600'
    ],
    rating: 4.8,
    reviewCount: 198,
    isFeatured: true,
    isTrending: true,
    tags: ['samsung', 'galaxy', 'smartphone', 'android', 'spen', 'camera', 'ai'],
    specs: { Screen: '6.8-inch Dynamic AMOLED 2X', RAM: '12GB', Storage: '512GB', Battery: '5000mAh' }
  },
  {
    title: 'Apple MacBook Pro 16-Inch M3 Max',
    description: 'Powerhouse laptop with Liquid Retina XDR display, 16-core CPU, 40-core GPU, up to 22 hours battery life, and space black finish.',
    price: 3499.99,
    originalPrice: 3699.99,
    category: 'Electronics',
    brand: 'Apple',
    stock: 12,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600'
    ],
    rating: 4.9,
    reviewCount: 92,
    isFeatured: true,
    isTrending: false,
    tags: ['macbook', 'laptop', 'apple', 'm3', 'pro', 'computer', 'developer'],
    specs: { Chip: 'M3 Max', RAM: '36GB Unified', Storage: '1TB SSD', Screen: '16.2-inch XDR' }
  },
  {
    title: 'UltraSharp 27-Inch 4K USB-C Monitor',
    description: 'IPS USB-C hub display with 99% sRGB color gamut, HDR400, 90W power delivery, ergonomic tilt/swivel stand, and ultra-thin bezel.',
    price: 499.99,
    originalPrice: 579.99,
    category: 'Electronics',
    brand: 'Dell',
    stock: 20,
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600'
    ],
    rating: 4.7,
    reviewCount: 115,
    isFeatured: false,
    isTrending: false,
    tags: ['monitor', 'display', '4k', 'dell', 'usb-c', 'office', 'screen'],
    specs: { Resolution: '3840 x 2160', RefreshRate: '60Hz', ColorGamut: '99% sRGB', PowerDelivery: '90W' }
  },

  // ─── FASHION ──────────────────────────────────────────────────
  {
    title: 'Ultra-Warm Sub-Zero Winter Down Parka',
    description: 'Heavyweight insulated puffer coat designed for extreme snowfall, sub-zero temperatures, waterproof shell, fleece-lined hood.',
    price: 189.99,
    originalPrice: 249.99,
    category: 'Fashion',
    brand: 'ArcticShield',
    stock: 35,
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600',
      'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=600'
    ],
    rating: 4.9,
    reviewCount: 142,
    isFeatured: true,
    isTrending: true,
    tags: ['winter', 'jacket', 'warm', 'snowfall', 'coat', 'waterproof', 'cold weather', 'fashion'],
    specs: { Material: '100% Nylon Shell', Insulation: '800-fill Goose Down', Waterproof: '10,000mm Rating', Hood: 'Fleece Lined Detachable' }
  },
  {
    title: 'Classic Vintage Denim Jacket',
    description: 'Timeless trucker denim jacket crafted from 100% heavyweight cotton denim with button flap chest pockets and adjustable waist tabs.',
    price: 79.99,
    originalPrice: 99.99,
    category: 'Fashion',
    brand: "Levi's",
    stock: 50,
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600'
    ],
    rating: 4.6,
    reviewCount: 88,
    isFeatured: false,
    isTrending: true,
    tags: ['jacket', 'denim', 'jeans', 'fashion', 'casual', 'vintage', 'outerwear'],
    specs: { Material: '100% Cotton Denim', Fit: 'Regular Trucker', Care: 'Machine Wash Cold' }
  },
  {
    title: 'Heavyweight Fleece Pullover Hoodie',
    description: 'Cozy brushed fleece hoodie featuring double-layer drawstring hood, kangaroo pocket, ribbed cuffs, and shrink-resistant fabric.',
    price: 59.99,
    originalPrice: 74.99,
    category: 'Fashion',
    brand: 'Champion',
    stock: 65,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600'
    ],
    rating: 4.7,
    reviewCount: 160,
    isFeatured: false,
    isTrending: false,
    tags: ['hoodie', 'fleece', 'sweatshirt', 'fashion', 'casual', 'warm', 'streetwear'],
    specs: { Fabric: '80% Cotton / 20% Polyester', Weight: '400 GSM', Pocket: 'Front Kangaroo' }
  },
  {
    title: 'Slim Fit Oxford Cotton Shirt',
    description: 'Versatile long-sleeve oxford button-down shirt made from breathable combed cotton, suitable for business casual or weekend wear.',
    price: 49.99,
    originalPrice: 65.00,
    category: 'Fashion',
    brand: 'Ralph Lauren',
    stock: 40,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600'
    ],
    rating: 4.5,
    reviewCount: 74,
    isFeatured: false,
    isTrending: false,
    tags: ['shirt', 'oxford', 'button-down', 'formal', 'casual', 'cotton'],
    specs: { Weave: 'Oxford Cotton', Collar: 'Button-Down', Fit: 'Slim Fit' }
  },

  // ─── SHOES ────────────────────────────────────────────────────
  {
    title: 'RunnerPro Light Responsive Sneakers',
    description: 'Ultra-lightweight breathable mesh running shoes with cloud foam cushion midsole, responsive energy return and high-traction rubber outsole.',
    price: 119.99,
    originalPrice: 149.99,
    category: 'Shoes',
    brand: 'Nike',
    stock: 55,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600'
    ],
    rating: 4.8,
    reviewCount: 210,
    isFeatured: true,
    isTrending: true,
    tags: ['shoes', 'sneakers', 'running', 'sports', 'footwear', 'breathable', 'marathon'],
    specs: { Weight: '240g', Cushioning: 'CloudFoam Air', Terrain: 'Road & Track', Closure: 'Lace-up' }
  },
  {
    title: 'Waterproof Gore-Tex Trail Hiking Boots',
    description: 'All-terrain outdoor hiking boots featuring Gore-Tex waterproof membrane, Vibram rubber lugs, reinforced toe cap, and ankle support.',
    price: 169.99,
    originalPrice: 199.99,
    category: 'Shoes',
    brand: 'Salomon',
    stock: 25,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600'
    ],
    rating: 4.9,
    reviewCount: 118,
    isFeatured: true,
    isTrending: false,
    tags: ['shoes', 'boots', 'hiking', 'waterproof', 'goretex', 'outdoor', 'trail'],
    specs: { Membrane: 'Gore-Tex Waterproof', Outsole: 'Vibram Megagrip', ShaftHeight: 'Ankle High' }
  },
  {
    title: 'Classic Leather Oxford Dress Shoes',
    description: 'Handcrafted full-grain leather oxford formal shoes with Goodyear welt construction, memory foam padded footbed, and stacked leather heel.',
    price: 139.99,
    originalPrice: 179.99,
    category: 'Shoes',
    brand: 'Clarks',
    stock: 30,
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600'
    ],
    rating: 4.7,
    reviewCount: 82,
    isFeatured: false,
    isTrending: false,
    tags: ['shoes', 'oxford', 'formal', 'leather', 'dress shoes', 'business'],
    specs: { Material: '100% Full-Grain Leather', Sole: 'Leather & Rubber Composite', Construction: 'Goodyear Welted' }
  },
  {
    title: 'Retro High-Top Streetwear Sneakers',
    description: 'Iconic retro high-top basketball sneakers featuring genuine leather upper, padded collar, and durable rubber cupsole.',
    price: 129.99,
    originalPrice: 150.00,
    category: 'Shoes',
    brand: 'Jordan',
    stock: 40,
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600'
    ],
    rating: 4.8,
    reviewCount: 230,
    isFeatured: false,
    isTrending: true,
    tags: ['shoes', 'sneakers', 'hightop', 'streetwear', 'retro', 'basketball'],
    specs: { Upper: 'Leather & Synthetic', Cushioning: 'Air Sole Unit', Style: 'Retro High' }
  },

  // ─── BEAUTY ───────────────────────────────────────────────────
  {
    title: 'Advanced Hyaluronic Hydrating Serum',
    description: 'Intense moisture boosting serum infused with pure triple molecular hyaluronic acid, vitamin B5, and botanical peptides for smooth plump skin.',
    price: 45.00,
    originalPrice: 58.00,
    category: 'Beauty',
    brand: 'The Ordinary',
    stock: 80,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600',
      'https://images.unsplash.com/photo-1608248597379-8616e4557039?w=600'
    ],
    rating: 4.9,
    reviewCount: 312,
    isFeatured: true,
    isTrending: true,
    tags: ['beauty', 'skincare', 'serum', 'hyaluronic acid', 'hydrating', 'glow', 'face'],
    specs: { Volume: '50ml', SkinType: 'All Skin Types', KeyIngredients: 'Hyaluronic Acid 2% + B5', ParabenFree: 'Yes' }
  },
  {
    title: 'Luxury Eau de Parfum Intense 100ml',
    description: 'Captivating fragrance featuring top notes of bergamot & pink pepper, heart of Bulgarian rose, and warm sandalwood amber base notes.',
    price: 135.00,
    originalPrice: 160.00,
    category: 'Beauty',
    brand: 'Dior',
    stock: 22,
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600'
    ],
    rating: 4.8,
    reviewCount: 95,
    isFeatured: false,
    isTrending: true,
    tags: ['perfume', 'beauty', 'fragrance', 'eau de parfum', 'luxury', 'scent'],
    specs: { Volume: '100ml / 3.4 oz', FragranceFamily: 'Woody Floral Amber', Concentration: 'Eau de Parfum' }
  },
  {
    title: 'Organic Botanical Vitamin C Face Cleanser',
    description: 'Gentle foaming facial wash packed with antioxidant Vitamin C, green tea extract, and aloe vera to brighten dull complexion.',
    price: 28.50,
    originalPrice: 35.00,
    category: 'Beauty',
    brand: 'CeraVe',
    stock: 60,
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600'
    ],
    rating: 4.6,
    reviewCount: 140,
    isFeatured: false,
    isTrending: false,
    tags: ['beauty', 'cleanser', 'vitamin c', 'face wash', 'skincare', 'organic'],
    specs: { Volume: '200ml', Form: 'Foaming Gel', CrueltyFree: 'Yes' }
  },

  // ─── HOME & KITCHEN ───────────────────────────────────────────
  {
    title: 'Smart Barista Espresso Machine with Milk Frother',
    description: '15-Bar Italian pump espresso maker featuring built-in steam wand milk frother, PID thermal temperature control & brushed stainless steel chassis.',
    price: 249.99,
    originalPrice: 299.99,
    category: 'Home & Kitchen',
    brand: 'DeLonghi',
    stock: 18,
    images: [
      'https://images.unsplash.com/photo-1517668808822-9ebe02f2a6ee?w=600',
      'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600'
    ],
    rating: 4.7,
    reviewCount: 135,
    isFeatured: true,
    isTrending: true,
    tags: ['coffee', 'espresso', 'kitchen', 'appliance', 'barista', 'latte', 'cappuccino'],
    specs: { Pressure: '15-Bar Italian Pump', WaterTank: '1.8L Removable', Power: '1350W', Body: 'Stainless Steel' }
  },
  {
    title: 'Digital XL 5.5L Air Fryer Oven',
    description: 'Rapid hot-air circulation air fryer with 8 one-touch cooking presets, non-stick dishwasher safe basket, and 85% less oil frying technology.',
    price: 119.99,
    originalPrice: 149.99,
    category: 'Home & Kitchen',
    brand: 'Ninja',
    stock: 40,
    images: [
      'https://images.unsplash.com/photo-1585515320310-259814833e62?w=600'
    ],
    rating: 4.8,
    reviewCount: 220,
    isFeatured: false,
    isTrending: true,
    tags: ['air fryer', 'kitchen', 'appliance', 'cooking', 'healthy', 'ninja'],
    specs: { Capacity: '5.5 Liters', TemperatureRange: '105F - 400F', Presets: '8 Digital Programs' }
  },
  {
    title: 'FlexiDesk Ergonomic Mesh Office Chair',
    description: 'High-back desk chair with dynamic lumbar support, 3D adjustable armrests, synchronized tilt mechanism, and breathable mesh backing.',
    price: 179.99,
    originalPrice: 219.99,
    category: 'Home & Kitchen',
    brand: 'Herman Miller',
    stock: 22,
    images: [
      'https://images.unsplash.com/photo-1580481072645-022f9a6d1270?w=600'
    ],
    rating: 4.6,
    reviewCount: 98,
    isFeatured: false,
    isTrending: false,
    tags: ['chair', 'office', 'ergonomic', 'furniture', 'desk chair', 'mesh'],
    specs: { MaxWeight: '300 lbs', Material: 'Breathable Nylon Mesh', Recline: '90° - 135°', Base: 'Heavy-Duty Chrome' }
  },
  {
    title: 'High-Speed Professional Kitchen Blender',
    description: '1400W commercial grade countertop blender with hardened stainless steel blades, pulse feature, and 64oz BPA-free pitcher for smoothies & soups.',
    price: 159.99,
    originalPrice: 199.99,
    category: 'Home & Kitchen',
    brand: 'Vitamix',
    stock: 25,
    images: [
      'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600'
    ],
    rating: 4.7,
    reviewCount: 88,
    isFeatured: false,
    isTrending: false,
    tags: ['blender', 'kitchen', 'smoothie', 'appliance', 'food processor'],
    specs: { Power: '1400 Watts', JarCapacity: '64 oz (2 Liters)', Blades: 'Laser-Cut Stainless Steel' }
  },

  // ─── SPORTS & FITNESS ─────────────────────────────────────────
  {
    title: 'Titanium Tough GPS Fitness Smartwatch',
    description: 'Rugged outdoor multi-sport smartwatch with wrist-based heart rate monitor, Pulse Ox SPO2 sensor, Topo maps, and 14-day solar battery.',
    price: 199.99,
    originalPrice: 249.99,
    category: 'Sports & Fitness',
    brand: 'Garmin',
    stock: 32,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600'
    ],
    rating: 4.9,
    reviewCount: 175,
    isFeatured: true,
    isTrending: true,
    tags: ['smartwatch', 'fitness', 'tracker', 'gps', 'garmin', 'heart rate', 'sports'],
    specs: { Display: '1.4" AMOLED Screen', WaterRating: '10 ATM (100m)', BatteryLife: 'Up to 14 Days' }
  },
  {
    title: 'SelectTech Adjustable Dumbbell Pair (5-52 lbs)',
    description: 'Space-saving adjustable dumbbells replacing 15 sets of weights, using dial system to adjust from 5 lbs up to 52.5 lbs in 2.5 lb increments.',
    price: 379.99,
    originalPrice: 429.99,
    category: 'Sports & Fitness',
    brand: 'Bowflex',
    stock: 15,
    images: [
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600'
    ],
    rating: 4.8,
    reviewCount: 140,
    isFeatured: false,
    isTrending: true,
    tags: ['dumbbells', 'fitness', 'weights', 'gym', 'workout', 'adjustable'],
    specs: { WeightRange: '5 to 52.5 lbs per dumbbell', Increments: '2.5 lbs', Material: 'Thermoplastic Rubber & Steel' }
  },
  {
    title: 'Premium 6mm Non-Slip Eco Yoga Mat',
    description: 'Extra thick high-density TPE eco-friendly yoga mat with alignment grid lines, non-slip textured grip surface, and shoulder carrying strap.',
    price: 39.99,
    originalPrice: 49.99,
    category: 'Sports & Fitness',
    brand: 'Lululemon',
    stock: 70,
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600'
    ],
    rating: 4.7,
    reviewCount: 110,
    isFeatured: false,
    isTrending: false,
    tags: ['yoga', 'mat', 'fitness', 'pilates', 'exercise', 'workout'],
    specs: { Thickness: '6mm', Material: 'Non-Toxic Recyclable TPE', Dimensions: '72" L x 24" W' }
  },

  // ─── GAMING ───────────────────────────────────────────────────
  {
    title: 'Sony PlayStation 5 Console Slim Digital Edition',
    description: 'Next-gen PS5 slim gaming console with 1TB SSD, DualSense wireless controller with haptic feedback, 4K 120Hz output, and Tempest 3D Audio.',
    price: 449.99,
    originalPrice: 499.99,
    category: 'Gaming',
    brand: 'Sony',
    stock: 25,
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600'
    ],
    rating: 4.9,
    reviewCount: 310,
    isFeatured: true,
    isTrending: true,
    tags: ['ps5', 'playstation', 'gaming', 'console', 'sony', '4k'],
    specs: { Storage: '1TB Custom NVMe SSD', Resolution: '4K @ 120Hz', Controller: 'DualSense Wireless' }
  },
  {
    title: 'RGB Mechanical Gaming Keyboard (Cherry MX Red)',
    description: 'Pro gaming mechanical keyboard with per-key RGB backlighting, linear Cherry MX Red switches, aircraft-grade aluminum frame, and magnetic wrist rest.',
    price: 129.99,
    originalPrice: 159.99,
    category: 'Gaming',
    brand: 'Razer',
    stock: 45,
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600'
    ],
    rating: 4.8,
    reviewCount: 165,
    isFeatured: false,
    isTrending: true,
    tags: ['keyboard', 'mechanical', 'gaming', 'rgb', 'razer', 'cherry mx'],
    specs: { SwitchType: 'Cherry MX Red Linear', Lighting: 'Per-Key RGB Chroma', Keycaps: 'Double-shot PBT' }
  },
  {
    title: 'Wireless Ultra-Lightweight Ergonomic Gaming Mouse',
    description: '60g hyper-lightweight wireless gaming mouse with 26,000 DPI optical sensor, optical switches, 80-hour rechargeable battery, and PTFE skates.',
    price: 89.99,
    originalPrice: 109.99,
    category: 'Gaming',
    brand: 'Logitech G',
    stock: 50,
    images: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600'
    ],
    rating: 4.7,
    reviewCount: 142,
    isFeatured: false,
    isTrending: false,
    tags: ['mouse', 'gaming', 'wireless', 'logitech', 'esports', 'lightweight'],
    specs: { Sensor: 'HERO 25K Sensor', DPI: 'Up to 25,600', Weight: '63 grams', Battery: '70 Hours' }
  },

  // ─── ACCESSORIES ──────────────────────────────────────────────
  {
    title: 'Minimalist RFID Blocking Slim Leather Wallet',
    description: 'Crafted from premium top-grain Italian leather featuring RFID blocking layer, quick card pop-up slider mechanism, and holds up to 10 cards.',
    price: 39.99,
    originalPrice: 49.99,
    category: 'Accessories',
    brand: 'Bellroy',
    stock: 65,
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600'
    ],
    rating: 4.7,
    reviewCount: 180,
    isFeatured: false,
    isTrending: true,
    tags: ['wallet', 'leather', 'rfid', 'accessories', 'cardholder', 'slim'],
    specs: { Material: 'Top-Grain Leather', Security: 'RFID Blocking Shield', Capacity: '10 Cards + Cash Clip' }
  },
  {
    title: 'Polarized Classic Wayfarer Sunglasses',
    description: 'Iconic polarized sunglasses with UV400 protective crystal lenses, lightweight acetate frame, and scratch-resistant coating.',
    price: 89.99,
    originalPrice: 119.99,
    category: 'Accessories',
    brand: 'Ray-Ban',
    stock: 40,
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600'
    ],
    rating: 4.8,
    reviewCount: 155,
    isFeatured: false,
    isTrending: false,
    tags: ['sunglasses', 'polarized', 'rayban', 'accessories', 'eyewear', 'uv400'],
    specs: { LensType: 'Polarized G-15 Glass', UVProtection: '100% UV400', Frame: 'Acetate' }
  },
  {
    title: 'Water-Resistant Travel Laptop Backpack 30L',
    description: 'Durable weather-resistant travel backpack featuring 15.6" padded laptop sleeve, hidden anti-theft back pocket, USB charging port & luggage strap.',
    price: 69.99,
    originalPrice: 89.99,
    category: 'Accessories',
    brand: 'Herschel',
    stock: 35,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600'
    ],
    rating: 4.8,
    reviewCount: 124,
    isFeatured: false,
    isTrending: false,
    tags: ['backpack', 'travel', 'laptop bag', 'accessories', 'water resistant'],
    specs: { Capacity: '30 Liters', LaptopSleeve: 'Fits up to 15.6 inch', Fabric: '600D Ballistic Polyester' }
  }
];
