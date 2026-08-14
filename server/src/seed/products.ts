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
  {
    "name": "Electronics",
    "slug": "electronics",
    "description": "Smartphones, laptops, audio, cameras & smart displays",
    "image": "https://images.unsplash.com/photo-1498049860654-af1a5c566876?w=600"
  },
  {
    "name": "Fashion",
    "slug": "fashion",
    "description": "Jackets, t-shirts, jeans, hoodies & winter apparel",
    "image": "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600"
  },
  {
    "name": "Shoes",
    "slug": "shoes",
    "description": "Running shoes, sneakers, boots & formal footwear",
    "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
  },
  {
    "name": "Beauty",
    "slug": "beauty",
    "description": "Skincare serums, luxury perfumes, cleansers & makeup",
    "image": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600"
  },
  {
    "name": "Home & Kitchen",
    "slug": "home-kitchen",
    "description": "Espresso machines, air fryers, blenders & office chairs",
    "image": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600"
  },
  {
    "name": "Sports & Fitness",
    "slug": "fitness-sports",
    "description": "Smartwatches, yoga mats, dumbbells & activewear",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600"
  },
  {
    "name": "Gaming",
    "slug": "gaming",
    "description": "Mechanical keyboards, gaming mice, headsets & monitors",
    "image": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600"
  },
  {
    "name": "Accessories",
    "slug": "accessories",
    "description": "Leather wallets, sunglasses, travel backpacks & duffels",
    "image": "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600"
  }
];

export const products: SeedProduct[] = [
  {
    "title": "Apple iPhone 15 Pro Max",
    "description": "Titanium design with Super Retina XDR OLED display, A17 Pro chip, 48MP camera system with 5x optical zoom, and Action button.",
    "price": 1199.99,
    "originalPrice": 1299.99,
    "brand": "Apple",
    "stock": 45,
    "rating": 4.9,
    "reviewCount": 245,
    "isFeatured": true,
    "isTrending": true,
    "tags": [
      "iphone",
      "apple",
      "smartphone",
      "electronics",
      "camera",
      "5g",
      "mobile"
    ],
    "images": [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600"
    ],
    "specs": {
      "Screen": "6.7-inch OLED",
      "Processor": "A17 Pro",
      "Storage": "256GB",
      "Connectivity": "5G / Wi-Fi 6E"
    },
    "category": "Electronics"
  },
  {
    "title": "Apple MacBook Pro 16-Inch M3 Max",
    "description": "Powerhouse laptop with Liquid Retina XDR display, 16-core CPU, 40-core GPU, up to 22 hours battery life, and space black finish.",
    "price": 3499.99,
    "originalPrice": 3699.99,
    "brand": "Apple",
    "stock": 12,
    "rating": 4.9,
    "reviewCount": 92,
    "isFeatured": true,
    "isTrending": false,
    "tags": [
      "macbook",
      "laptop",
      "apple",
      "m3",
      "pro",
      "computer",
      "developer"
    ],
    "images": [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600"
    ],
    "specs": {
      "Chip": "M3 Max",
      "RAM": "36GB Unified",
      "Storage": "1TB SSD",
      "Screen": "16.2-inch XDR"
    },
    "category": "Electronics"
  },
  {
    "title": "Sony WH-1000XM5 Wireless ANC Headphones",
    "description": "Industry-leading noise cancellation with 8 microphones, Auto NC Optimizer, crystal clear hands-free calling, and 30-hr battery.",
    "price": 399.99,
    "originalPrice": 449.99,
    "brand": "Sony",
    "stock": 35,
    "rating": 4.9,
    "reviewCount": 520,
    "isFeatured": true,
    "isTrending": true,
    "tags": [
      "sony",
      "audio",
      "headphones",
      "bluetooth",
      "noise cancelling",
      "music"
    ],
    "images": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600"
    ],
    "specs": {
      "Battery": "30 Hours",
      "Drivers": "30mm",
      "ANC": "Dual Processors",
      "Weight": "250g"
    },
    "category": "Electronics"
  },
  {
    "title": "Sony Alpha A7 IV Full-Frame Mirrorless Camera",
    "description": "33MP Exmor R CMOS sensor, 4K 60p video, real-time Eye AF for humans, animals, and birds, and 5-axis optical image stabilization.",
    "price": 2498,
    "originalPrice": 2699.99,
    "brand": "Sony",
    "stock": 15,
    "rating": 4.9,
    "reviewCount": 180,
    "isFeatured": false,
    "isTrending": true,
    "tags": [
      "sony",
      "camera",
      "photography",
      "4k",
      "full frame",
      "electronics"
    ],
    "images": [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600"
    ],
    "specs": {
      "Sensor": "33MP Full-Frame",
      "Video": "4K 60p 10-bit 4:2:2",
      "ISO": "100-51200"
    },
    "category": "Electronics"
  },
  {
    "title": "Samsung Galaxy S24 Ultra 5G",
    "description": "AI-powered flagship smartphone featuring Galaxy AI, 200MP quad-telephoto camera, Snapdragon 8 Gen 3, and integrated S-Pen.",
    "price": 1299.99,
    "originalPrice": 1399.99,
    "brand": "Samsung",
    "stock": 30,
    "rating": 4.8,
    "reviewCount": 198,
    "isFeatured": true,
    "isTrending": true,
    "tags": [
      "samsung",
      "galaxy",
      "smartphone",
      "android",
      "spen",
      "camera",
      "ai"
    ],
    "images": [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600"
    ],
    "specs": {
      "Screen": "6.8-inch Dynamic AMOLED 2X",
      "RAM": "12GB",
      "Storage": "512GB",
      "Battery": "5000mAh"
    },
    "category": "Electronics"
  },
  {
    "title": "Samsung 65-Inch Neo QLED 4K Smart TV",
    "description": "Quantum Matrix Technology with Mini LEDs, Neural Quantum Processor 4K, Dolby Atmos audio, and 120Hz smooth gaming view.",
    "price": 1499.99,
    "originalPrice": 1799.99,
    "brand": "Samsung",
    "stock": 18,
    "rating": 4.8,
    "reviewCount": 145,
    "isFeatured": false,
    "isTrending": false,
    "tags": [
      "samsung",
      "tv",
      "smart tv",
      "qled",
      "4k",
      "home theater"
    ],
    "images": [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600"
    ],
    "specs": {
      "Display": "Neo QLED 4K",
      "Refresh": "120Hz",
      "HDR": "Quantum HDR 32x",
      "Audio": "Dolby Atmos"
    },
    "category": "Electronics"
  },
  {
    "title": "Dell XPS 15 OLED Touch Laptop",
    "description": "3.5K OLED touch display, Intel Core i9 13th Gen, NVIDIA GeForce RTX 4060, 32GB DDR5 RAM, and CNC machined aluminum chassis.",
    "price": 2199.99,
    "originalPrice": 2499.99,
    "brand": "Dell",
    "stock": 14,
    "rating": 4.7,
    "reviewCount": 110,
    "isFeatured": false,
    "isTrending": true,
    "tags": [
      "dell",
      "laptop",
      "xps",
      "oled",
      "intel",
      "rtx 4060",
      "windows"
    ],
    "images": [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600"
    ],
    "specs": {
      "CPU": "Intel i9-13900H",
      "GPU": "RTX 4060 8GB",
      "Screen": "15.6\" 3.5K OLED",
      "RAM": "32GB"
    },
    "category": "Electronics"
  },
  {
    "title": "Dell UltraSharp 27-Inch 4K USB-C Monitor",
    "description": "IPS USB-C hub display with 99% sRGB color gamut, HDR400, 90W power delivery, ergonomic tilt/swivel stand, and ultra-thin bezel.",
    "price": 499.99,
    "originalPrice": 579.99,
    "brand": "Dell",
    "stock": 20,
    "rating": 4.7,
    "reviewCount": 115,
    "isFeatured": false,
    "isTrending": false,
    "tags": [
      "monitor",
      "display",
      "4k",
      "dell",
      "usb-c",
      "office",
      "screen"
    ],
    "images": [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600"
    ],
    "specs": {
      "Resolution": "3840 x 2160",
      "RefreshRate": "60Hz",
      "ColorGamut": "99% sRGB",
      "PowerDelivery": "90W"
    },
    "category": "Electronics"
  },
  {
    "title": "Bose QuietComfort Ultra Noise-Cancelling Earbuds",
    "description": "World-class noise cancellation, breakthrough spatialized audio, CustomTune technology, and up to 6 hours continuous listening.",
    "price": 299,
    "originalPrice": 329,
    "brand": "Bose",
    "stock": 40,
    "rating": 4.8,
    "reviewCount": 230,
    "isFeatured": true,
    "isTrending": true,
    "tags": [
      "bose",
      "earbuds",
      "wireless",
      "noise cancelling",
      "bluetooth",
      "audio"
    ],
    "images": [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600"
    ],
    "specs": {
      "Battery": "6 Hours (24 with Case)",
      "WaterResistance": "IPX4",
      "SpatialAudio": "Bose Immersive"
    },
    "category": "Electronics"
  },
  {
    "title": "Sennheiser Momentum 4 Wireless Headphones",
    "description": "Audiophile-grade 42mm transducer system, adaptive noise cancellation, customizable sound with EQ, and astonishing 60-hour battery life.",
    "price": 349.95,
    "originalPrice": 379.95,
    "brand": "Sennheiser",
    "stock": 22,
    "rating": 4.8,
    "reviewCount": 175,
    "isFeatured": false,
    "isTrending": false,
    "tags": [
      "sennheiser",
      "audio",
      "headphones",
      "wireless",
      "audiophile",
      "bluetooth"
    ],
    "images": [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600"
    ],
    "specs": {
      "Battery": "60 Hours",
      "Codecs": "aptX Adaptive",
      "Driver": "42mm Transducer"
    },
    "category": "Electronics"
  },
  {
    "title": "JBL Charge 5 Portable Waterproof Bluetooth Speaker",
    "description": "Delivers bold JBL Original Pro Sound with optimized long-throw driver, separate tweeter, dual passive bass radiators, and built-in powerbank.",
    "price": 179.95,
    "originalPrice": 199.95,
    "brand": "JBL",
    "stock": 55,
    "rating": 4.8,
    "reviewCount": 380,
    "isFeatured": false,
    "isTrending": true,
    "tags": [
      "jbl",
      "speaker",
      "bluetooth",
      "waterproof",
      "outdoor",
      "audio"
    ],
    "images": [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600"
    ],
    "specs": {
      "Battery": "20 Hours",
      "Rating": "IP67 Waterproof & Dustproof",
      "Power": "40W RMS"
    },
    "category": "Electronics"
  },
  {
    "title": "LG C3 55-Inch OLED evo 4K Smart TV",
    "description": "Self-lit OLED pixels, a9 AI Processor Gen6, 120Hz refresh rate, Dolby Vision IQ, G-Sync & FreeSync support for ultimate gaming.",
    "price": 1396.99,
    "originalPrice": 1699.99,
    "brand": "LG",
    "stock": 16,
    "rating": 4.9,
    "reviewCount": 290,
    "isFeatured": true,
    "isTrending": true,
    "tags": [
      "lg",
      "oled",
      "tv",
      "4k",
      "smart tv",
      "gaming",
      "120hz"
    ],
    "images": [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600"
    ],
    "specs": {
      "Display": "OLED evo 4K",
      "Processor": "a9 AI Gen6",
      "Gaming": "4x HDMI 2.1 120Hz"
    },
    "category": "Electronics"
  },
  {
    "title": "Nike Tech Fleece Full-Zip Hoodie",
    "description": "Lightweight warmth with signature Tech Fleece dual-sided smooth fabric, zippered sleeve pocket, and relaxed athletic cut.",
    "price": 130,
    "originalPrice": 145,
    "brand": "Nike",
    "stock": 45,
    "rating": 4.8,
    "reviewCount": 280,
    "isFeatured": true,
    "isTrending": true,
    "tags": [
      "nike",
      "fashion",
      "hoodie",
      "tech fleece",
      "sweatshirt",
      "streetwear"
    ],
    "images": [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600"
    ],
    "specs": {
      "Material": "66% Cotton / 34% Polyester",
      "Pockets": "Zippered Arm Pocket",
      "Fit": "Standard Athletic"
    },
    "category": "Fashion"
  },
  {
    "title": "Adidas Adicolor Classics Trefoil Track Top",
    "description": "Heritage athletic track jacket featuring stand-up collar, signature 3-Stripes along sleeves, and embroidered Trefoil logo.",
    "price": 80,
    "originalPrice": 90,
    "brand": "Adidas",
    "stock": 50,
    "rating": 4.7,
    "reviewCount": 190,
    "isFeatured": false,
    "isTrending": true,
    "tags": [
      "adidas",
      "jacket",
      "tracktop",
      "fashion",
      "streetwear",
      "vintage"
    ],
    "images": [
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=600"
    ],
    "specs": {
      "Fabric": "100% Recycled Polyester Primeblue",
      "Fit": "Regular",
      "Closure": "Full Zip"
    },
    "category": "Fashion"
  },
  {
    "title": "Puma Essentials Padded Winter Jacket",
    "description": "Warm insulated water-repellent jacket with warmCELL thermal insulation, windCELL weather defense, and fleece-lined pockets.",
    "price": 110,
    "originalPrice": 130,
    "brand": "Puma",
    "stock": 35,
    "rating": 4.7,
    "reviewCount": 130,
    "isFeatured": false,
    "isTrending": false,
    "tags": [
      "puma",
      "jacket",
      "winter",
      "puffer",
      "warm",
      "fashion"
    ],
    "images": [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600"
    ],
    "specs": {
      "Tech": "warmCELL + windCELL",
      "Shell": "100% Polyester",
      "WaterRepellent": "Yes"
    },
    "category": "Fashion"
  },
  {
    "title": "Under Armour Seamless Workout T-Shirt",
    "description": "Soft knit shirt with engineered mesh ventilation placed where you need it most, zero-chafing seamless construction.",
    "price": 45,
    "originalPrice": 50,
    "brand": "Under Armour",
    "stock": 65,
    "rating": 4.6,
    "reviewCount": 140,
    "isFeatured": false,
    "isTrending": false,
    "tags": [
      "under armour",
      "t-shirt",
      "gym",
      "activewear",
      "fashion",
      "breathable"
    ],
    "images": [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600"
    ],
    "specs": {
      "Material": "51% Polyester / 49% Nylon",
      "Fit": "Next-to-skin without squeeze",
      "AntiOdor": "Yes"
    },
    "category": "Fashion"
  },
  {
    "title": "Levi's 501 Original Fit Straight Leg Jeans",
    "description": "The archetype of all jeans since 1873. Iconic straight fit with button fly and durable 100% non-stretch cotton denim.",
    "price": 79.5,
    "originalPrice": 89.5,
    "brand": "Levi's",
    "stock": 70,
    "rating": 4.8,
    "reviewCount": 450,
    "isFeatured": true,
    "isTrending": true,
    "tags": [
      "levi's",
      "jeans",
      "denim",
      "501",
      "fashion",
      "pants",
      "classic"
    ],
    "images": [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600"
    ],
    "specs": {
      "Material": "100% Cotton Denim",
      "Leg": "Straight",
      "Fly": "Button Fly"
    },
    "category": "Fashion"
  },
  {
    "title": "Levi's Classic Vintage Denim Trucker Jacket",
    "description": "Timeless trucker denim jacket crafted from 100% heavyweight cotton denim with button flap chest pockets and adjustable waist tabs.",
    "price": 89.99,
    "originalPrice": 99.99,
    "brand": "Levi's",
    "stock": 40,
    "rating": 4.7,
    "reviewCount": 195,
    "isFeatured": false,
    "isTrending": true,
    "tags": [
      "jacket",
      "denim",
      "jeans",
      "fashion",
      "casual",
      "vintage",
      "outerwear"
    ],
    "images": [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600"
    ],
    "specs": {
      "Material": "100% Cotton Denim",
      "Fit": "Regular Trucker",
      "Care": "Machine Wash Cold"
    },
    "category": "Fashion"
  },
  {
    "title": "Tommy Hilfiger Essential Solid Oxford Shirt",
    "description": "Classic long sleeve button-down shirt woven from soft breathable oxford cotton with iconic flag embroidery on chest.",
    "price": 69.5,
    "originalPrice": 85,
    "brand": "Tommy Hilfiger",
    "stock": 42,
    "rating": 4.6,
    "reviewCount": 110,
    "isFeatured": false,
    "isTrending": false,
    "tags": [
      "tommy hilfiger",
      "shirt",
      "oxford",
      "fashion",
      "button down",
      "casual"
    ],
    "images": [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600"
    ],
    "specs": {
      "Material": "100% Organic Cotton",
      "Fit": "Regular Fit",
      "Collar": "Button-Down"
    },
    "category": "Fashion"
  },
  {
    "title": "Calvin Klein Modern Cotton Bralette & Jogger Set",
    "description": "Ultra-soft flexible cotton modal blend lougewear set featuring iconic repeating Calvin Klein logo waistband.",
    "price": 85,
    "originalPrice": 100,
    "brand": "Calvin Klein",
    "stock": 50,
    "rating": 4.8,
    "reviewCount": 260,
    "isFeatured": false,
    "isTrending": true,
    "tags": [
      "calvin klein",
      "loungewear",
      "fashion",
      "cotton",
      "joggers",
      "casual"
    ],
    "images": [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600"
    ],
    "specs": {
      "Fabric": "53% Cotton / 35% Modal / 12% Elastane",
      "Waistband": "Signature Elastic"
    },
    "category": "Fashion"
  },
  {
    "title": "Ralph Lauren Icon Cable-Knit Cotton Sweater",
    "description": "Timeless crewneck sweater crafted from combed cotton with dimensional cable-knit texture and signature pony embroidery.",
    "price": 148,
    "originalPrice": 168,
    "brand": "Ralph Lauren",
    "stock": 30,
    "rating": 4.9,
    "reviewCount": 175,
    "isFeatured": true,
    "isTrending": false,
    "tags": [
      "ralph lauren",
      "sweater",
      "cable knit",
      "fashion",
      "cotton",
      "luxury"
    ],
    "images": [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600"
    ],
    "specs": {
      "Material": "100% Combed Cotton",
      "Knit": "Cable Knit",
      "Neckline": "Crewneck"
    },
    "category": "Fashion"
  },
  {
    "title": "Ultra-Warm Sub-Zero Winter Down Parka",
    "description": "Heavyweight insulated puffer coat designed for extreme snowfall, sub-zero temperatures, waterproof shell, fleece-lined hood.",
    "price": 189.99,
    "originalPrice": 249.99,
    "brand": "ArcticShield",
    "stock": 35,
    "rating": 4.9,
    "reviewCount": 142,
    "isFeatured": true,
    "isTrending": true,
    "tags": [
      "winter",
      "jacket",
      "warm",
      "snowfall",
      "coat",
      "waterproof",
      "cold weather",
      "fashion"
    ],
    "images": [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600"
    ],
    "specs": {
      "Material": "100% Nylon Shell",
      "Insulation": "800-fill Goose Down",
      "Waterproof": "10,000mm Rating"
    },
    "category": "Fashion"
  },
  {
    "title": "Zara Oversized Wool Blend Coat",
    "description": "Tailored double-breasted long coat made from rich wool blend with lapel collar, welt front pockets and back vent.",
    "price": 169,
    "originalPrice": 199,
    "brand": "Zara",
    "stock": 25,
    "rating": 4.7,
    "reviewCount": 140,
    "isFeatured": false,
    "isTrending": true,
    "tags": [
      "zara",
      "coat",
      "wool",
      "fashion",
      "outerwear",
      "winter"
    ],
    "images": [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600"
    ],
    "specs": {
      "Material": "60% Wool / 40% Polyester",
      "Style": "Double-Breasted",
      "Length": "Long"
    },
    "category": "Fashion"
  },
  {
    "title": "H&M Relaxed Fit Heavyweight Sweatpants",
    "description": "Cozy cotton-blend fleece joggers with elasticated drawstring waist, diagonal side pockets, and elasticated cuffs.",
    "price": 34.99,
    "originalPrice": 42,
    "brand": "H&M",
    "stock": 80,
    "rating": 4.5,
    "reviewCount": 310,
    "isFeatured": false,
    "isTrending": false,
    "tags": [
      "h&m",
      "sweatpants",
      "joggers",
      "fleece",
      "casual",
      "fashion"
    ],
    "images": [
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600"
    ],
    "specs": {
      "Fabric": "80% Cotton / 20% Polyester",
      "Fit": "Relaxed Fit"
    },
    "category": "Fashion"
  },
  {
    "title": "Nike Air Max 270 Supreme Cushion",
    "description": "Boasting the biggest wrist-to-toe Air unit yet, Nike Air Max 270 delivers super-soft comfort and responsive stride.",
    "price": 159.99,
    "originalPrice": 179.99,
    "brand": "Nike",
    "stock": 45,
    "rating": 4.9,
    "reviewCount": 320,
    "isFeatured": true,
    "isTrending": true,
    "tags": [
      "nike",
      "shoes",
      "sneakers",
      "air max",
      "running",
      "cushion"
    ],
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=600"
    ],
    "specs": {
      "Material": "Breathable Mesh",
      "Sole": "Rubber Air Unit",
      "Closure": "Lace-Up"
    },
    "category": "Shoes"
  },
  {
    "title": "Nike Pegasus 40 Road Running Shoes",
    "description": "Workhorse with wings. Engineered mesh upper with tuned support and responsive Zoom Air cushioning for everyday runs.",
    "price": 130,
    "originalPrice": 145,
    "brand": "Nike",
    "stock": 50,
    "rating": 4.8,
    "reviewCount": 215,
    "isFeatured": false,
    "isTrending": true,
    "tags": [
      "nike",
      "shoes",
      "pegasus",
      "running",
      "marathon",
      "road"
    ],
    "images": [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600"
    ],
    "specs": {
      "Cushioning": "React Foam + Zoom Air",
      "Surface": "Road",
      "Weight": "285g"
    },
    "category": "Shoes"
  },
  {
    "title": "Adidas Ultraboost Light Running Shoes",
    "description": "Experience epic energy return with Light BOOST cushioning, Primeknit upper, and Continental rubber outsole.",
    "price": 180,
    "originalPrice": 200,
    "brand": "Adidas",
    "stock": 40,
    "rating": 4.9,
    "reviewCount": 410,
    "isFeatured": true,
    "isTrending": true,
    "tags": [
      "adidas",
      "shoes",
      "ultraboost",
      "sneakers",
      "running",
      "primeknit"
    ],
    "images": [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600",
      "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=600"
    ],
    "specs": {
      "Midsole": "Light BOOST",
      "Upper": "Primeknit+",
      "Outsole": "Continental Rubber"
    },
    "category": "Shoes"
  },
  {
    "title": "Adidas Originals NMD_R1 V2",
    "description": "Futuristic street style sneaker featuring full-length Boost midsole, signature heel plug elements, and lightweight textile upper.",
    "price": 140,
    "originalPrice": 160,
    "brand": "Adidas",
    "stock": 35,
    "rating": 4.7,
    "reviewCount": 185,
    "isFeatured": false,
    "isTrending": false,
    "tags": [
      "adidas",
      "nmd",
      "shoes",
      "streetwear",
      "sneakers",
      "lifestyle"
    ],
    "images": [
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=600"
    ],
    "specs": {
      "Upper": "Textile",
      "Fit": "Sock-like",
      "Sole": "Boost Midsole"
    },
    "category": "Shoes"
  },
  {
    "title": "Puma Velocity Nitro 2 Running Shoes",
    "description": "All-in-one neutral running shoe for any distance with lightweight NITRO foam cushioning and high-traction PUMAGRIP rubber.",
    "price": 120,
    "originalPrice": 135,
    "brand": "Puma",
    "stock": 30,
    "rating": 4.7,
    "reviewCount": 140,
    "isFeatured": false,
    "isTrending": true,
    "tags": [
      "puma",
      "shoes",
      "nitro",
      "running",
      "footwear",
      "athletic"
    ],
    "images": [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600"
    ],
    "specs": {
      "Foam": "NITRO Advanced Technology",
      "Outsole": "PUMAGRIP",
      "Arch": "Neutral"
    },
    "category": "Shoes"
  },
  {
    "title": "Puma Suede Classic XXI Sneakers",
    "description": "The iconic low-top sneaker featuring plush full suede upper, synthetic leather lining, and classic Puma Formstrip pattern.",
    "price": 75,
    "originalPrice": 85,
    "brand": "Puma",
    "stock": 60,
    "rating": 4.6,
    "reviewCount": 290,
    "isFeatured": false,
    "isTrending": false,
    "tags": [
      "puma",
      "suede",
      "classic",
      "shoes",
      "sneakers",
      "casual"
    ],
    "images": [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600"
    ],
    "specs": {
      "Upper": "Full Suede",
      "Collar": "Padded",
      "Sole": "Rubber Cupsole"
    },
    "category": "Shoes"
  },
  {
    "title": "Reebok Nano X3 Adventure Cross Trainer",
    "description": "Built for indoor and outdoor fitness with Lift and Run Chassis system, Floatride Energy foam, and rugged water-resistant upper.",
    "price": 140,
    "originalPrice": 150,
    "brand": "Reebok",
    "stock": 25,
    "rating": 4.8,
    "reviewCount": 165,
    "isFeatured": false,
    "isTrending": false,
    "tags": [
      "reebok",
      "shoes",
      "nano",
      "training",
      "gym",
      "workout"
    ],
    "images": [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600"
    ],
    "specs": {
      "System": "LARC System",
      "Midsole": "Floatride Energy Foam",
      "Drop": "7mm"
    },
    "category": "Shoes"
  },
  {
    "title": "Asics GEL-Kayano 30 Stability Shoes",
    "description": "Advanced stability running shoe featuring 4D GUIDANCE SYSTEM, PureGEL technology, and FF BLAST PLUS ECO cushioning for ultra-smooth rides.",
    "price": 160,
    "originalPrice": 175,
    "brand": "Asics",
    "stock": 32,
    "rating": 4.9,
    "reviewCount": 210,
    "isFeatured": true,
    "isTrending": true,
    "tags": [
      "asics",
      "gel kayano",
      "shoes",
      "running",
      "stability",
      "marathon"
    ],
    "images": [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600"
    ],
    "specs": {
      "Tech": "PureGEL + 4D Guidance",
      "Cushioning": "FF BLAST PLUS ECO",
      "Pronation": "Overpronation / Neutral"
    },
    "category": "Shoes"
  },
  {
    "title": "Under Armour HOVR Phantom 3 SE",
    "description": "High-performance running shoe with UA HOVR responsive cushioning, stretch-knit collar, and molded midfoot panel for secure lockdown.",
    "price": 140,
    "originalPrice": 160,
    "brand": "Under Armour",
    "stock": 28,
    "rating": 4.7,
    "reviewCount": 125,
    "isFeatured": false,
    "isTrending": false,
    "tags": [
      "under armour",
      "shoes",
      "hovr",
      "running",
      "gym",
      "athletic"
    ],
    "images": [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600"
    ],
    "specs": {
      "Technology": "UA HOVR Cushioning",
      "Upper": "Engineered Knit",
      "Outsole": "Full Rubber"
    },
    "category": "Shoes"
  },
  {
    "title": "New Balance 990v6 Made in USA",
    "description": "Legendary premium sneaker combining FuelCell foam midsole with ENCAP rim support and mesh/pigskin suede construction.",
    "price": 199.99,
    "originalPrice": 220,
    "brand": "New Balance",
    "stock": 20,
    "rating": 4.9,
    "reviewCount": 380,
    "isFeatured": true,
    "isTrending": true,
    "tags": [
      "new balance",
      "990v6",
      "shoes",
      "sneakers",
      "premium",
      "lifestyle"
    ],
    "images": [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600"
    ],
    "specs": {
      "Cushioning": "FuelCell Foam + ENCAP",
      "Upper": "Pigskin & Mesh",
      "Origin": "Made in USA"
    },
    "category": "Shoes"
  },
  {
    "title": "Vans Old Skool Core Classics",
    "description": "The timeless side-stripe skate shoe built with durable canvas & suede uppers, re-enforced toe caps, and signature rubber waffle outsoles.",
    "price": 70,
    "originalPrice": 75,
    "brand": "Vans",
    "stock": 80,
    "rating": 4.8,
    "reviewCount": 520,
    "isFeatured": false,
    "isTrending": false,
    "tags": [
      "vans",
      "old skool",
      "skate",
      "shoes",
      "sneakers",
      "casual"
    ],
    "images": [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600"
    ],
    "specs": {
      "Upper": "Canvas & Suede",
      "Outsole": "Signature Waffle Rubber",
      "Closure": "Lace-Up"
    },
    "category": "Shoes"
  },
  {
    "title": "Converse Chuck Taylor All Star High Top",
    "description": "The world famous high-top canvas sneaker with medial eyelets, star ankle patch, and durable vulcanized rubber sole.",
    "price": 65,
    "originalPrice": 70,
    "brand": "Converse",
    "stock": 75,
    "rating": 4.8,
    "reviewCount": 610,
    "isFeatured": false,
    "isTrending": true,
    "tags": [
      "converse",
      "chuck taylor",
      "high top",
      "shoes",
      "sneakers",
      "canvas"
    ],
    "images": [
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=600"
    ],
    "specs": {
      "Upper": "Heavy Canvas",
      "Sole": "Vulcanized Rubber",
      "Style": "High Top Icon"
    },
    "category": "Shoes"
  },
  {
    "title": "Waterproof Gore-Tex Trail Hiking Boots",
    "description": "All-terrain outdoor hiking boots featuring Gore-Tex waterproof membrane, Vibram rubber lugs, reinforced toe cap, and ankle support.",
    "price": 169.99,
    "originalPrice": 199.99,
    "brand": "Salomon",
    "stock": 25,
    "rating": 4.9,
    "reviewCount": 118,
    "isFeatured": true,
    "isTrending": false,
    "tags": [
      "shoes",
      "boots",
      "hiking",
      "waterproof",
      "goretex",
      "outdoor",
      "trail"
    ],
    "images": [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600"
    ],
    "specs": {
      "Membrane": "Gore-Tex Waterproof",
      "Outsole": "Vibram Megagrip",
      "ShaftHeight": "Ankle High"
    },
    "category": "Shoes"
  },
  {
    "title": "Classic Leather Oxford Dress Shoes",
    "description": "Handcrafted full-grain leather oxford formal shoes with Goodyear welt construction, memory foam padded footbed, and stacked leather heel.",
    "price": 139.99,
    "originalPrice": 179.99,
    "brand": "Clarks",
    "stock": 30,
    "rating": 4.7,
    "reviewCount": 82,
    "isFeatured": false,
    "isTrending": false,
    "tags": [
      "shoes",
      "oxford",
      "formal",
      "leather",
      "dress shoes",
      "business"
    ],
    "images": [
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600"
    ],
    "specs": {
      "Material": "100% Full-Grain Leather",
      "Sole": "Leather & Rubber Composite",
      "Construction": "Goodyear Welted"
    },
    "category": "Shoes"
  },
  {
    "title": "The Ordinary Hyaluronic Acid 2% + B5",
    "description": "Hydration support formula with ultra-pure, vegan hyaluronic acid and Vitamin B5 for deep multi-depth skin hydration.",
    "price": 14.5,
    "originalPrice": 18,
    "brand": "The Ordinary",
    "stock": 90,
    "rating": 4.8,
    "reviewCount": 650,
    "isFeatured": true,
    "isTrending": true,
    "tags": [
      "beauty",
      "skincare",
      "serum",
      "hyaluronic acid",
      "the ordinary",
      "hydration"
    ],
    "images": [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600"
    ],
    "specs": {
      "Volume": "30ml",
      "Target": "Dehydration",
      "SkinType": "All Skin Types"
    },
    "category": "Beauty"
  },
  {
    "title": "The Ordinary Niacinamide 10% + Zinc 1%",
    "description": "High-strength vitamin and mineral blemish formula designed to reduce the appearance of skin blemishes and congestion.",
    "price": 12,
    "originalPrice": 15,
    "brand": "The Ordinary",
    "stock": 100,
    "rating": 4.7,
    "reviewCount": 820,
    "isFeatured": false,
    "isTrending": true,
    "tags": [
      "beauty",
      "skincare",
      "niacinamide",
      "serum",
      "the ordinary",
      "blemish"
    ],
    "images": [
      "https://images.unsplash.com/photo-1608248597379-8616e4557039?w=600"
    ],
    "specs": {
      "Volume": "30ml",
      "Focus": "Blemish Control",
      "pH": "5.5 - 6.5"
    },
    "category": "Beauty"
  },
  {
    "title": "Dior Sauvage Eau de Parfum 100ml",
    "description": "Iconic masculine fragrance featuring fresh notes of Calabrian bergamot, Sichuan pepper, and warm woody Papua New Guinean vanilla.",
    "price": 145,
    "originalPrice": 165,
    "brand": "Dior",
    "stock": 30,
    "rating": 4.9,
    "reviewCount": 490,
    "isFeatured": true,
    "isTrending": true,
    "tags": [
      "dior",
      "perfume",
      "sauvage",
      "beauty",
      "fragrance",
      "cologne"
    ],
    "images": [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600"
    ],
    "specs": {
      "Volume": "100ml / 3.4 oz",
      "Concentration": "Eau de Parfum",
      "Scent": "Woody Fresh"
    },
    "category": "Beauty"
  },
  {
    "title": "Dior Miss Dior Eau de Parfum Spray",
    "description": "A floral bouquet fragrance built around Grasse rose, Centifolia rose, lily-of-the-valley, and soft peony notes.",
    "price": 138,
    "originalPrice": 155,
    "brand": "Dior",
    "stock": 25,
    "rating": 4.8,
    "reviewCount": 310,
    "isFeatured": false,
    "isTrending": false,
    "tags": [
      "dior",
      "perfume",
      "miss dior",
      "beauty",
      "fragrance",
      "floral"
    ],
    "images": [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600"
    ],
    "specs": {
      "Volume": "50ml",
      "Notes": "Rose, Peony, Iris"
    },
    "category": "Beauty"
  },
  {
    "title": "CeraVe Hydrating Facial Cleanser for Normal to Dry Skin",
    "description": "Gentle non-foaming facial wash developed with dermatologists, containing 3 essential ceramides and hyaluronic acid.",
    "price": 18.99,
    "originalPrice": 22,
    "brand": "CeraVe",
    "stock": 85,
    "rating": 4.8,
    "reviewCount": 540,
    "isFeatured": false,
    "isTrending": true,
    "tags": [
      "cerave",
      "cleanser",
      "skincare",
      "beauty",
      "face wash",
      "ceramides"
    ],
    "images": [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600"
    ],
    "specs": {
      "Volume": "473ml / 16 oz",
      "SkinType": "Normal to Dry",
      "Formula": "Non-comedogenic"
    },
    "category": "Beauty"
  },
  {
    "title": "CeraVe AM Facial Moisturizing Lotion SPF 30",
    "description": "Oil-free morning moisturizer with broad spectrum sun protection, Niacinamide, Hyaluronic Acid, and Ceramides.",
    "price": 19.5,
    "originalPrice": 23,
    "brand": "CeraVe",
    "stock": 75,
    "rating": 4.7,
    "reviewCount": 380,
    "isFeatured": false,
    "isTrending": false,
    "tags": [
      "cerave",
      "moisturizer",
      "spf30",
      "sunscreen",
      "skincare",
      "beauty"
    ],
    "images": [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600"
    ],
    "specs": {
      "SPF": "30 Broad Spectrum",
      "Volume": "89ml",
      "Texture": "Lightweight Cream"
    },
    "category": "Beauty"
  },
  {
    "title": "Estée Lauder Advanced Night Repair Synchronized Multi-Recovery",
    "description": "Deep penetrating night serum that reduces visible signs of aging with Chronolux Power Signal Technology and Hyaluronic Acid.",
    "price": 115,
    "originalPrice": 128,
    "brand": "Estée Lauder",
    "stock": 28,
    "rating": 4.9,
    "reviewCount": 410,
    "isFeatured": true,
    "isTrending": true,
    "tags": [
      "estee lauder",
      "serum",
      "anti-aging",
      "skincare",
      "beauty",
      "luxury"
    ],
    "images": [
      "https://images.unsplash.com/photo-1608248597379-8616e4557039?w=600"
    ],
    "specs": {
      "Volume": "50ml",
      "Target": "Lines, Firmness, Radiance"
    },
    "category": "Beauty"
  },
  {
    "title": "La Roche-Posay Anthelios Melt-in Milk Sunscreen SPF 60",
    "description": "Fast-absorbing dry touch sunscreen for face and body with Cell-Ox Shield technology and antioxidants.",
    "price": 37.99,
    "originalPrice": 42,
    "brand": "La Roche-Posay",
    "stock": 60,
    "rating": 4.8,
    "reviewCount": 290,
    "isFeatured": false,
    "isTrending": true,
    "tags": [
      "la roche posay",
      "sunscreen",
      "spf60",
      "skincare",
      "beauty"
    ],
    "images": [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600"
    ],
    "specs": {
      "SPF": "60 Water Resistant",
      "Volume": "150ml",
      "Finish": "Velvety Non-Greasy"
    },
    "category": "Beauty"
  },
  {
    "title": "Fenty Beauty Gloss Bomb Universal Lip Luminizer",
    "description": "The ultimate gotta-have-it lip gloss with explosive shine and nourishing shea butter in universal flattering shades.",
    "price": 21,
    "originalPrice": 25,
    "brand": "Fenty Beauty",
    "stock": 65,
    "rating": 4.8,
    "reviewCount": 470,
    "isFeatured": false,
    "isTrending": true,
    "tags": [
      "fenty beauty",
      "lip gloss",
      "makeup",
      "beauty",
      "gloss bomb"
    ],
    "images": [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600"
    ],
    "specs": {
      "Shade": "Fenty Glow",
      "Scent": "Peach-Vanilla",
      "Finish": "High Shine"
    },
    "category": "Beauty"
  },
  {
    "title": "MAC Matte Lipstick - Ruby Woo",
    "description": "The legendary intense vivid blue-red shade with long-wearing creamy matte finish and rich color payoff.",
    "price": 23,
    "originalPrice": 26,
    "brand": "MAC",
    "stock": 55,
    "rating": 4.9,
    "reviewCount": 510,
    "isFeatured": false,
    "isTrending": false,
    "tags": [
      "mac",
      "lipstick",
      "ruby woo",
      "makeup",
      "beauty",
      "red lipstick"
    ],
    "images": [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600"
    ],
    "specs": {
      "Finish": "Matte",
      "Weight": "3g",
      "Color": "Retro Matte Ruby Woo"
    },
    "category": "Beauty"
  },
  {
    "title": "DeLonghi Magnifica S Automatic Espresso Machine",
    "description": "Compact bean-to-cup espresso maker with integrated burr grinder, traditional milk frother steam wand, and customizable coffee strength.",
    "price": 549.99,
    "originalPrice": 649.99,
    "brand": "DeLonghi",
    "stock": 15,
    "rating": 4.8,
    "reviewCount": 280,
    "isFeatured": true,
    "isTrending": true,
    "tags": [
      "delonghi",
      "espresso",
      "coffee",
      "kitchen",
      "appliance",
      "barista"
    ],
    "images": [
      "https://images.unsplash.com/photo-1517668808822-9ebe02f2a6ee?w=600"
    ],
    "specs": {
      "Pump": "15-Bar Pressure",
      "Grinder": "13-Setting Conical Burr",
      "Tank": "1.8L"
    },
    "category": "Home & Kitchen"
  },
  {
    "title": "DeLonghi Dedica Deluxe Pump Espresso Maker",
    "description": "Ultra-slim 6-inch wide stainless steel espresso machine with adjustable cappuccino system and thermoblock heating.",
    "price": 299.95,
    "originalPrice": 349.95,
    "brand": "DeLonghi",
    "stock": 22,
    "rating": 4.7,
    "reviewCount": 195,
    "isFeatured": false,
    "isTrending": false,
    "tags": [
      "delonghi",
      "espresso",
      "coffee machine",
      "kitchen"
    ],
    "images": [
      "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600"
    ],
    "specs": {
      "Width": "15cm Slim Design",
      "Pressure": "15-Bar",
      "Body": "Full Metal"
    },
    "category": "Home & Kitchen"
  },
  {
    "title": "Ninja Foodi 6-in-1 2-Basket Air Fryer 8-Quart",
    "description": "Air fryer with 2 independent zones letting you cook 2 foods, 2 ways at the same time with DualZone technology.",
    "price": 179.99,
    "originalPrice": 199.99,
    "brand": "Ninja",
    "stock": 40,
    "rating": 4.9,
    "reviewCount": 620,
    "isFeatured": true,
    "isTrending": true,
    "tags": [
      "ninja",
      "air fryer",
      "kitchen",
      "foodi",
      "cooking",
      "appliance"
    ],
    "images": [
      "https://images.unsplash.com/photo-1585515320310-259814833e62?w=600"
    ],
    "specs": {
      "Capacity": "8 Quarts (2x 4Qt)",
      "Functions": "Air Fry, Roast, Reheat, Dehydrate"
    },
    "category": "Home & Kitchen"
  },
  {
    "title": "Ninja Professional Plus Kitchen System Blender 1400W",
    "description": "High performance blender with Auto-iQ preset programs, 72 oz pitcher, 64 oz food processor bowl, and single-serve cups.",
    "price": 199.99,
    "originalPrice": 229.99,
    "brand": "Ninja",
    "stock": 30,
    "rating": 4.8,
    "reviewCount": 310,
    "isFeatured": false,
    "isTrending": true,
    "tags": [
      "ninja",
      "blender",
      "food processor",
      "kitchen",
      "smoothie"
    ],
    "images": [
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600"
    ],
    "specs": {
      "Motor": "1400 Peak Watts",
      "Blades": "Pro Extractor Blades",
      "Programs": "Auto-iQ 5 Presets"
    },
    "category": "Home & Kitchen"
  },
  {
    "title": "Vitamix 5200 Professional-Grade Blender",
    "description": "Industry-standard countertop blender with aircraft-grade stainless steel blades, variable speed control, and self-cleaning feature.",
    "price": 449.95,
    "originalPrice": 499.95,
    "brand": "Vitamix",
    "stock": 18,
    "rating": 4.9,
    "reviewCount": 510,
    "isFeatured": true,
    "isTrending": false,
    "tags": [
      "vitamix",
      "blender",
      "kitchen",
      "professional",
      "smoothies",
      "soup"
    ],
    "images": [
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600"
    ],
    "specs": {
      "Container": "64 oz BPA-Free",
      "Blades": "Laser-Cut Hardened Steel",
      "Warranty": "7 Years"
    },
    "category": "Home & Kitchen"
  },
  {
    "title": "Herman Miller Aeron Ergonomic Office Chair",
    "description": "Iconic ergonomic desk chair featuring Pellicle 8Z breathable suspension mesh, PostureFit SL spinal support, and fully adjustable arms.",
    "price": 1295,
    "originalPrice": 1450,
    "brand": "Herman Miller",
    "stock": 10,
    "rating": 4.9,
    "reviewCount": 390,
    "isFeatured": true,
    "isTrending": true,
    "tags": [
      "herman miller",
      "aeron",
      "chair",
      "ergonomic",
      "office",
      "furniture"
    ],
    "images": [
      "https://images.unsplash.com/photo-1580481072645-022f9a6d1270?w=600"
    ],
    "specs": {
      "Mesh": "8Z Pellicle Suspension",
      "Tilt": "Harmonic 2 Tilt",
      "WeightCapacity": "350 lbs"
    },
    "category": "Home & Kitchen"
  },
  {
    "title": "Instant Pot Duo 7-in-1 Electric Pressure Cooker 6 Qt",
    "description": "Replaces 7 appliances: pressure cooker, slow cooker, rice cooker, steamer, saute pan, yogurt maker, and food warmer.",
    "price": 89.99,
    "originalPrice": 99.99,
    "brand": "Instant Pot",
    "stock": 55,
    "rating": 4.8,
    "reviewCount": 780,
    "isFeatured": false,
    "isTrending": true,
    "tags": [
      "instant pot",
      "pressure cooker",
      "kitchen",
      "appliance",
      "cooking"
    ],
    "images": [
      "https://images.unsplash.com/photo-1585515320310-259814833e62?w=600"
    ],
    "specs": {
      "Size": "6 Quarts",
      "Presets": "13 One-Touch Smart Programs",
      "Pot": "Stainless Steel"
    },
    "category": "Home & Kitchen"
  },
  {
    "title": "Keurig K-Elite Single Serve Coffee Maker",
    "description": "Premium coffee brewer featuring Strong Brew button, iced coffee setting, 75oz water reservoir, and 5 cup size options.",
    "price": 149.99,
    "originalPrice": 189.99,
    "brand": "Keurig",
    "stock": 35,
    "rating": 4.7,
    "reviewCount": 290,
    "isFeatured": false,
    "isTrending": false,
    "tags": [
      "keurig",
      "coffee maker",
      "k-cup",
      "kitchen",
      "appliance"
    ],
    "images": [
      "https://images.unsplash.com/photo-1517668808822-9ebe02f2a6ee?w=600"
    ],
    "specs": {
      "Sizes": "4, 6, 8, 10, 12 oz",
      "Reservoir": "75 oz Removable",
      "Feature": "Iced Coffee Mode"
    },
    "category": "Home & Kitchen"
  },
  {
    "title": "KitchenAid Artisan Series 5-Quart Stand Mixer",
    "description": "Legendary tilt-head stand mixer with 10 speeds, 5-quart stainless steel bowl with comfortable handle, includes flat beater & dough hook.",
    "price": 379.99,
    "originalPrice": 449.99,
    "brand": "KitchenAid",
    "stock": 20,
    "rating": 4.9,
    "reviewCount": 630,
    "isFeatured": true,
    "isTrending": true,
    "tags": [
      "kitchenaid",
      "stand mixer",
      "baking",
      "kitchen",
      "appliance"
    ],
    "images": [
      "https://images.unsplash.com/photo-1590794056226-77ef3a8147e1?w=600"
    ],
    "specs": {
      "Capacity": "5 Quarts",
      "Speeds": "10 Speeds",
      "Attachments": "Wire Whip, Dough Hook, Flat Beater"
    },
    "category": "Home & Kitchen"
  },
  {
    "title": "Dyson V15 Detect Cordless Vacuum Cleaner",
    "description": "Intelligent cordless vacuum with laser illumination that reveals invisible dust, piezo sensor count display, and 60 minutes run time.",
    "price": 649.99,
    "originalPrice": 749.99,
    "brand": "Dyson",
    "stock": 15,
    "rating": 4.8,
    "reviewCount": 420,
    "isFeatured": true,
    "isTrending": true,
    "tags": [
      "dyson",
      "vacuum",
      "cleaner",
      "cordless",
      "home",
      "appliance"
    ],
    "images": [
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600"
    ],
    "specs": {
      "RunTime": "60 Minutes",
      "Suction": "230 AW",
      "Filtration": "99.99% to 0.3 microns"
    },
    "category": "Home & Kitchen"
  },
  {
    "title": "Garmin Fenix 7 Pro Solar Multisport GPS Watch",
    "description": "Ultimate rugged outdoor smartwatch with Power Sapphire solar charging lens, built-in LED flashlight, endurance score, and topo maps.",
    "price": 799.99,
    "originalPrice": 899.99,
    "brand": "Garmin",
    "stock": 15,
    "rating": 4.9,
    "reviewCount": 290,
    "isFeatured": true,
    "isTrending": true,
    "tags": [
      "garmin",
      "fenix",
      "smartwatch",
      "gps",
      "fitness",
      "sports",
      "solar"
    ],
    "images": [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600"
    ],
    "specs": {
      "Display": "1.3\" Solar Memory-in-Pixel",
      "Battery": "Up to 22 Days in Smartwatch Mode",
      "Flashlight": "Multi-LED"
    },
    "category": "Sports & Fitness"
  },
  {
    "title": "Garmin Forerunner 265 Running Smartwatch",
    "description": "Colorful AMOLED display GPS running watch with training readiness metrics, morning report, HRV status, and up to 13 days battery.",
    "price": 449.99,
    "originalPrice": 499.99,
    "brand": "Garmin",
    "stock": 25,
    "rating": 4.8,
    "reviewCount": 190,
    "isFeatured": false,
    "isTrending": true,
    "tags": [
      "garmin",
      "forerunner",
      "running watch",
      "smartwatch",
      "fitness",
      "sports"
    ],
    "images": [
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600"
    ],
    "specs": {
      "Screen": "1.3\" AMOLED Touchscreen",
      "Weight": "47g",
      "GPS": "SatIQ Multi-Band"
    },
    "category": "Sports & Fitness"
  },
  {
    "title": "Apple Watch Ultra 2 GPS + Cellular 49mm",
    "description": "Rugged titanium case, bright 3000-nit Display, Precision Dual-Frequency GPS, 36-hour battery life, and specialized bands for athletes.",
    "price": 799,
    "originalPrice": 849,
    "brand": "Apple",
    "stock": 20,
    "rating": 4.9,
    "reviewCount": 450,
    "isFeatured": true,
    "isTrending": true,
    "tags": [
      "apple watch",
      "ultra 2",
      "smartwatch",
      "apple",
      "fitness",
      "sports",
      "titanium"
    ],
    "images": [
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600"
    ],
    "specs": {
      "Case": "49mm Titanium",
      "Brightness": "3000 nits",
      "WaterResistance": "100m"
    },
    "category": "Sports & Fitness"
  },
  {
    "title": "Bowflex SelectTech 552 Adjustable Dumbbells Pair",
    "description": "Adjusts from 5 to 52.5 lbs per dumbbell in 2.5 lb increments with intuitive dial system, replacing 15 pairs of weights.",
    "price": 429,
    "originalPrice": 549,
    "brand": "Bowflex",
    "stock": 22,
    "rating": 4.8,
    "reviewCount": 510,
    "isFeatured": true,
    "isTrending": true,
    "tags": [
      "bowflex",
      "dumbbells",
      "weights",
      "fitness",
      "gym",
      "workout",
      "sports"
    ],
    "images": [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600"
    ],
    "specs": {
      "Range": "5 to 52.5 lbs",
      "Increments": "2.5 lbs",
      "Material": "Steel & Molded Durable Rubber"
    },
    "category": "Sports & Fitness"
  },
  {
    "title": "Lululemon The Mat 5mm Made for Yoga",
    "description": "Extra cushioning 5mm mat made with sustainably sourced natural rubber base, smooth absorbent top layer for sweaty hot yoga.",
    "price": 98,
    "originalPrice": 110,
    "brand": "Lululemon",
    "stock": 50,
    "rating": 4.8,
    "reviewCount": 310,
    "isFeatured": false,
    "isTrending": false,
    "tags": [
      "lululemon",
      "yoga mat",
      "fitness",
      "pilates",
      "sports",
      "workout"
    ],
    "images": [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600"
    ],
    "specs": {
      "Thickness": "5mm",
      "Material": "FSC-certified Natural Rubber",
      "Dimensions": "71\" x 26\""
    },
    "category": "Sports & Fitness"
  },
  {
    "title": "Nike Pro Dri-FIT Long Sleeve Compression Shirt",
    "description": "Lightweight stretchy fabric with Dri-FIT moisture-wicking technology to keep you dry and supported during intense workouts.",
    "price": 38,
    "originalPrice": 45,
    "brand": "Nike",
    "stock": 60,
    "rating": 4.7,
    "reviewCount": 220,
    "isFeatured": false,
    "isTrending": false,
    "tags": [
      "nike",
      "compression",
      "dri-fit",
      "sports",
      "fitness",
      "activewear"
    ],
    "images": [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600"
    ],
    "specs": {
      "Fabric": "92% Polyester / 8% Spandex",
      "Tech": "Dri-FIT Moisture Management"
    },
    "category": "Sports & Fitness"
  },
  {
    "title": "Under Armour Project Rock Training Gym Bag",
    "description": "Heavy duty UA Storm water-resistant technology duffel with tough abrasion-resistant bottom panel, designed with Dwayne Johnson.",
    "price": 85,
    "originalPrice": 100,
    "brand": "Under Armour",
    "stock": 35,
    "rating": 4.8,
    "reviewCount": 180,
    "isFeatured": false,
    "isTrending": true,
    "tags": [
      "under armour",
      "project rock",
      "gym bag",
      "duffel",
      "sports",
      "fitness"
    ],
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600"
    ],
    "specs": {
      "Tech": "UA Storm Water Repellent",
      "Volume": "48 Liters",
      "ShoeCompartment": "Yes"
    },
    "category": "Sports & Fitness"
  },
  {
    "title": "TRX All-in-One Bodyweight Suspension Trainer",
    "description": "Full body workout system using leverage and your bodyweight. Includes suspension anchor, door anchor, and mesh travel bag.",
    "price": 169.95,
    "originalPrice": 199.95,
    "brand": "TRX",
    "stock": 30,
    "rating": 4.8,
    "reviewCount": 290,
    "isFeatured": false,
    "isTrending": false,
    "tags": [
      "trx",
      "suspension trainer",
      "fitness",
      "gym",
      "calisthenics",
      "home gym"
    ],
    "images": [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600"
    ],
    "specs": {
      "WeightCapacity": "350 lbs",
      "Material": "Industrial-grade Nylon Webbing"
    },
    "category": "Sports & Fitness"
  },
  {
    "title": "Sony PlayStation 5 Console Slim Digital Edition",
    "description": "Next-gen PS5 slim gaming console with 1TB SSD, DualSense wireless controller with haptic feedback, 4K 120Hz output, and Tempest 3D Audio.",
    "price": 449.99,
    "originalPrice": 499.99,
    "brand": "Sony",
    "stock": 25,
    "rating": 4.9,
    "reviewCount": 310,
    "isFeatured": true,
    "isTrending": true,
    "tags": [
      "ps5",
      "playstation",
      "gaming",
      "console",
      "sony",
      "4k"
    ],
    "images": [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600"
    ],
    "specs": {
      "Storage": "1TB Custom NVMe SSD",
      "Resolution": "4K @ 120Hz",
      "Controller": "DualSense Wireless"
    },
    "category": "Gaming"
  },
  {
    "title": "Sony DualSense Edge Wireless Controller",
    "description": "Ultra-customizable pro controller for PS5 with remappable buttons, changeable stick caps, back paddle triggers, and profile settings.",
    "price": 199.99,
    "originalPrice": 219.99,
    "brand": "Sony",
    "stock": 30,
    "rating": 4.8,
    "reviewCount": 175,
    "isFeatured": false,
    "isTrending": true,
    "tags": [
      "ps5",
      "dualsense",
      "controller",
      "sony",
      "gaming",
      "esports"
    ],
    "images": [
      "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=600"
    ],
    "specs": {
      "Feature": "Changeable Stick Modules",
      "BackButtons": "2 Swappable Sets",
      "Cable": "Braided USB-C"
    },
    "category": "Gaming"
  },
  {
    "title": "Microsoft Xbox Series X Console 1TB",
    "description": "The fastest, most powerful Xbox ever. 12 teraflops of processing power, 4K resolution gaming up to 120FPS, and Velocity Architecture.",
    "price": 499.99,
    "originalPrice": 549.99,
    "brand": "Microsoft",
    "stock": 20,
    "rating": 4.9,
    "reviewCount": 410,
    "isFeatured": true,
    "isTrending": true,
    "tags": [
      "xbox",
      "series x",
      "microsoft",
      "gaming",
      "console",
      "4k"
    ],
    "images": [
      "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=600"
    ],
    "specs": {
      "GPU": "12 TFLOPS RDNA 2",
      "Storage": "1TB NVMe SSD",
      "Drive": "4K UHD Blu-ray"
    },
    "category": "Gaming"
  },
  {
    "title": "Razer BlackWidow V4 Pro RGB Mechanical Keyboard",
    "description": "Full-blown mechanical keyboard with Razer Green Clicky switches, Command Dial, 8 dedicated macro keys, and underglow Chroma lighting.",
    "price": 229.99,
    "originalPrice": 249.99,
    "brand": "Razer",
    "stock": 35,
    "rating": 4.8,
    "reviewCount": 165,
    "isFeatured": false,
    "isTrending": true,
    "tags": [
      "razer",
      "keyboard",
      "mechanical",
      "rgb",
      "gaming",
      "blackwidow"
    ],
    "images": [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600"
    ],
    "specs": {
      "Switches": "Razer Green Mechanical",
      "Keycaps": "Doubleshot ABS",
      "Polling": "Up to 8000Hz"
    },
    "category": "Gaming"
  },
  {
    "title": "Razer DeathAdder V3 Pro Ultra-Lightweight Mouse",
    "description": "63g ultra-lightweight ergonomic wireless esports mouse with Focus Pro 30K Optical Sensor and Gen-3 Optical Mouse Switches.",
    "price": 149.99,
    "originalPrice": 169.99,
    "brand": "Razer",
    "stock": 40,
    "rating": 4.9,
    "reviewCount": 280,
    "isFeatured": true,
    "isTrending": true,
    "tags": [
      "razer",
      "mouse",
      "gaming",
      "esports",
      "wireless",
      "deathadder"
    ],
    "images": [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600"
    ],
    "specs": {
      "Sensor": "Focus Pro 30K DPI",
      "Weight": "63g",
      "Battery": "Up to 90 Hours"
    },
    "category": "Gaming"
  },
  {
    "title": "Logitech G PRO X 2 LIGHTSPEED Wireless Gaming Headset",
    "description": "Esports-grade wireless headset featuring 50mm Graphene drivers, LIGHTSPEED wireless, Bluetooth, and DTS Headphone:X 2.0 surround.",
    "price": 249.99,
    "originalPrice": 279.99,
    "brand": "Logitech G",
    "stock": 28,
    "rating": 4.8,
    "reviewCount": 220,
    "isFeatured": false,
    "isTrending": true,
    "tags": [
      "logitech",
      "headset",
      "gaming",
      "wireless",
      "graphene",
      "audio"
    ],
    "images": [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600"
    ],
    "specs": {
      "Drivers": "50mm Graphene",
      "Battery": "Up to 50 Hours",
      "Wireless": "LIGHTSPEED 2.4GHz + BT"
    },
    "category": "Gaming"
  },
  {
    "title": "Logitech G502 HERO High Performance Wired Gaming Mouse",
    "description": "HERO 25K sensor with 25,600 DPI, 11 customizable buttons, adjustable weight system, and LIGHTSYNC RGB backlighting.",
    "price": 49.99,
    "originalPrice": 79.99,
    "brand": "Logitech G",
    "stock": 75,
    "rating": 4.8,
    "reviewCount": 890,
    "isFeatured": false,
    "isTrending": false,
    "tags": [
      "logitech",
      "g502",
      "mouse",
      "gaming",
      "hero",
      "rgb"
    ],
    "images": [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600"
    ],
    "specs": {
      "Sensor": "HERO 25K",
      "Buttons": "11 Programmable",
      "Weights": "5x 3.6g Removable"
    },
    "category": "Gaming"
  },
  {
    "title": "ASUS ROG Swift 27-Inch 1440P 360Hz OLED Gaming Monitor",
    "description": "QHD (2560 x 1440) OLED panel with lightning-fast 360Hz refresh rate, 0.03ms response time, custom heatsink, and G-SYNC compatibility.",
    "price": 899.99,
    "originalPrice": 999.99,
    "brand": "ASUS",
    "stock": 12,
    "rating": 4.9,
    "reviewCount": 140,
    "isFeatured": true,
    "isTrending": true,
    "tags": [
      "asus",
      "rog",
      "monitor",
      "oled",
      "360hz",
      "gaming",
      "1440p"
    ],
    "images": [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600"
    ],
    "specs": {
      "Panel": "27\" OLED 1440p",
      "Refresh": "360Hz",
      "Response": "0.03ms GTG"
    },
    "category": "Gaming"
  },
  {
    "title": "Bellroy Minimalist Leather Sleeve Wallet",
    "description": "Crafted from premium environmentally certified leather featuring RFID blocking layer, quick card pull tab, and holds up to 8 cards.",
    "price": 55,
    "originalPrice": 65,
    "brand": "Bellroy",
    "stock": 55,
    "rating": 4.7,
    "reviewCount": 180,
    "isFeatured": false,
    "isTrending": true,
    "tags": [
      "bellroy",
      "wallet",
      "leather",
      "rfid",
      "accessories",
      "cardholder"
    ],
    "images": [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600"
    ],
    "specs": {
      "Material": "Certified Leather",
      "Protection": "RFID Shield",
      "Capacity": "4-8 Cards"
    },
    "category": "Accessories"
  },
  {
    "title": "Bellroy Classic Backpack Compact 16L",
    "description": "Streamlined laptop backpack with padded 13\" laptop sleeve, quick-access top pocket, and water-resistant woven fabric.",
    "price": 139,
    "originalPrice": 159,
    "brand": "Bellroy",
    "stock": 25,
    "rating": 4.8,
    "reviewCount": 140,
    "isFeatured": false,
    "isTrending": false,
    "tags": [
      "bellroy",
      "backpack",
      "accessories",
      "laptop bag",
      "travel"
    ],
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600"
    ],
    "specs": {
      "Volume": "16 Liters",
      "Laptop": "Fits up to 13\"",
      "Fabric": "100% Recycled Water-Resistant"
    },
    "category": "Accessories"
  },
  {
    "title": "Ray-Ban Classic Polarized Wayfarer Sunglasses",
    "description": "Iconic black acetate sunglasses with polarized G-15 green glass lenses delivering 100% UV protection and clarity.",
    "price": 180,
    "originalPrice": 210,
    "brand": "Ray-Ban",
    "stock": 45,
    "rating": 4.8,
    "reviewCount": 420,
    "isFeatured": true,
    "isTrending": true,
    "tags": [
      "ray-ban",
      "sunglasses",
      "polarized",
      "wayfarer",
      "accessories",
      "eyewear"
    ],
    "images": [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600"
    ],
    "specs": {
      "Frame": "Black Acetate",
      "Lens": "G-15 Polarized Glass",
      "UV": "100% UV400"
    },
    "category": "Accessories"
  },
  {
    "title": "Ray-Ban Aviator Classic Gold Sunglasses",
    "description": "Originally designed for US aviators in 1937, featuring gold metal frame, tear-drop shape, and dark green G-15 lenses.",
    "price": 171,
    "originalPrice": 195,
    "brand": "Ray-Ban",
    "stock": 40,
    "rating": 4.9,
    "reviewCount": 380,
    "isFeatured": false,
    "isTrending": true,
    "tags": [
      "ray-ban",
      "aviator",
      "sunglasses",
      "gold",
      "accessories",
      "eyewear"
    ],
    "images": [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600"
    ],
    "specs": {
      "Frame": "Arista Gold Metal",
      "Lens": "G-15 Crystal Green",
      "Size": "Standard 58mm"
    },
    "category": "Accessories"
  },
  {
    "title": "Herschel Little America Travel Backpack 30L",
    "description": "Signature mountaineering style backpack with magnetic strap closures, padded fleece-lined 15\" laptop sleeve, and front pocket.",
    "price": 109.99,
    "originalPrice": 130,
    "brand": "Herschel",
    "stock": 50,
    "rating": 4.8,
    "reviewCount": 350,
    "isFeatured": true,
    "isTrending": true,
    "tags": [
      "herschel",
      "backpack",
      "travel",
      "accessories",
      "laptop sleeve"
    ],
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600"
    ],
    "specs": {
      "Volume": "30 Liters",
      "Laptop": "Padded Fleece 15\"",
      "Drawstring": "Cinch Closure"
    },
    "category": "Accessories"
  },
  {
    "title": "Herschel Novel Duffel Bag 42L with Shoe Compartment",
    "description": "Ideal weekend duffel featuring signature shoe compartment, removable padded shoulder strap, and waterproof zipper.",
    "price": 90,
    "originalPrice": 110,
    "brand": "Herschel",
    "stock": 35,
    "rating": 4.7,
    "reviewCount": 220,
    "isFeatured": false,
    "isTrending": false,
    "tags": [
      "herschel",
      "duffel",
      "travel",
      "accessories",
      "gym bag",
      "weekend"
    ],
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600"
    ],
    "specs": {
      "Capacity": "42 Liters",
      "ShoeGarage": "Side Access",
      "Straps": "Articulated Padded"
    },
    "category": "Accessories"
  },
  {
    "title": "Tommy Hilfiger Leather Passcase Bifold Wallet",
    "description": "100% genuine cowhide leather wallet featuring 6 card slots, removable passcase ID window, and bill compartment.",
    "price": 38,
    "originalPrice": 48,
    "brand": "Tommy Hilfiger",
    "stock": 65,
    "rating": 4.6,
    "reviewCount": 240,
    "isFeatured": false,
    "isTrending": false,
    "tags": [
      "tommy hilfiger",
      "wallet",
      "leather",
      "accessories",
      "bifold"
    ],
    "images": [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600"
    ],
    "specs": {
      "Material": "100% Genuine Leather",
      "Passcase": "Removable",
      "Slots": "6 Card Slots"
    },
    "category": "Accessories"
  },
  {
    "title": "Oakley Holbrook Prizm Black Polarized Sunglasses",
    "description": "Iconic American frame design accented by metal rivets, lightweight O Matter frame material, and Prizm lens technology.",
    "price": 194,
    "originalPrice": 224,
    "brand": "Oakley",
    "stock": 30,
    "rating": 4.8,
    "reviewCount": 260,
    "isFeatured": false,
    "isTrending": true,
    "tags": [
      "oakley",
      "sunglasses",
      "prizm",
      "holbrook",
      "accessories",
      "sports"
    ],
    "images": [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600"
    ],
    "specs": {
      "Technology": "Prizm Black Polarized",
      "Frame": "O Matter Stress-Resistant"
    },
    "category": "Accessories"
  }
];
