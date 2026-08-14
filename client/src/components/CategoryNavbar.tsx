import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Smartphone, 
  Shirt, 
  Footprints, 
  Sparkles, 
  Home, 
  Dumbbell, 
  Gamepad2, 
  Briefcase, 
  ChevronDown, 
  Grid, 
  Flame,
  Award
} from 'lucide-react';
import { api } from '../services/api';

interface SubCategory {
  name: string;
  brandTags?: string[];
}

interface CategoryMenu {
  id: string;
  name: string;
  icon: React.ReactNode;
  subcategories: SubCategory[];
  featuredBrands: string[];
}

export const CategoryNavbar: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await api.get('/categories');
        if (res.data.success) {
          setCategories(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load menu categories:', err);
      }
    };
    fetchCats();
  }, []);

  const departmentData: CategoryMenu[] = [
    {
      id: 'Electronics',
      name: 'Electronics',
      icon: <Smartphone className="w-4 h-4 text-sky-500" />,
      subcategories: [
        { name: 'Mobiles & Smartphones', brandTags: ['Apple', 'Samsung'] },
        { name: 'Laptops & Computers', brandTags: ['Dell', 'Apple'] },
        { name: 'Headphones & Audio', brandTags: ['Sony', 'Bose', 'Sennheiser', 'JBL'] },
        { name: 'Cameras & Photography', brandTags: ['Sony'] },
        { name: 'Smart Home & Displays', brandTags: ['LG', 'Samsung'] },
      ],
      featuredBrands: ['Apple', 'Sony', 'Samsung', 'Dell', 'Bose', 'Sennheiser', 'JBL', 'LG']
    },
    {
      id: 'Fashion',
      name: 'Fashion',
      icon: <Shirt className="w-4 h-4 text-rose-500" />,
      subcategories: [
        { name: "Men's Apparel & Jackets", brandTags: ['Nike', 'Adidas', 'Levi\'s'] },
        { name: "Women's Collection", brandTags: ['Zara', 'H&M', 'Tommy Hilfiger'] },
        { name: 'Winter Wear & Fleeces', brandTags: ['Puma', 'Under Armour'] },
        { name: 'Casual T-Shirts & Tops', brandTags: ['Ralph Lauren', 'Calvin Klein'] },
      ],
      featuredBrands: ['Nike', 'Adidas', 'Puma', 'Levi\'s', 'Tommy Hilfiger', 'Calvin Klein', 'Zara', 'H&M']
    },
    {
      id: 'Shoes',
      name: 'Footwear & Shoes',
      icon: <Footprints className="w-4 h-4 text-emerald-500" />,
      subcategories: [
        { name: 'Performance Running Shoes', brandTags: ['Nike', 'Asics', 'New Balance'] },
        { name: 'Lifestyle & Sneakers', brandTags: ['Adidas', 'Vans', 'Converse'] },
        { name: 'Cross Training & Gym', brandTags: ['Reebok', 'Under Armour', 'Puma'] },
        { name: 'Outdoor & Trail Boots', brandTags: ['Salomon', 'Clarks'] },
      ],
      featuredBrands: ['Nike', 'Adidas', 'Puma', 'Reebok', 'Asics', 'New Balance', 'Vans', 'Converse', 'Salomon']
    },
    {
      id: 'Beauty',
      name: 'Beauty & Personal Care',
      icon: <Sparkles className="w-4 h-4 text-purple-500" />,
      subcategories: [
        { name: 'Skincare & Serums', brandTags: ['The Ordinary', 'CeraVe', 'La Roche-Posay'] },
        { name: 'Luxury Fragrance & Perfume', brandTags: ['Dior', 'Estée Lauder'] },
        { name: 'Makeup Essentials', brandTags: ['Fenty Beauty', 'MAC'] },
      ],
      featuredBrands: ['The Ordinary', 'Dior', 'CeraVe', 'Estée Lauder', 'La Roche-Posay', 'Fenty Beauty', 'MAC']
    },
    {
      id: 'Home & Kitchen',
      name: 'Home & Kitchen',
      icon: <Home className="w-4 h-4 text-amber-500" />,
      subcategories: [
        { name: 'Espresso & Coffee Makers', brandTags: ['DeLonghi', 'Keurig', 'Nespresso'] },
        { name: 'Air Fryers & Blenders', brandTags: ['Ninja', 'Vitamix', 'Instant Pot'] },
        { name: 'Ergonomic Furniture', brandTags: ['Herman Miller'] },
        { name: 'Kitchen Appliances', brandTags: ['KitchenAid', 'Dyson'] },
      ],
      featuredBrands: ['DeLonghi', 'Ninja', 'Vitamix', 'Herman Miller', 'Instant Pot', 'Keurig', 'KitchenAid', 'Dyson']
    },
    {
      id: 'Sports & Fitness',
      name: 'Sports & Fitness',
      icon: <Dumbbell className="w-4 h-4 text-orange-500" />,
      subcategories: [
        { name: 'Smart Fitness Watches', brandTags: ['Garmin', 'Apple'] },
        { name: 'Home Gym & Dumbbells', brandTags: ['Bowflex', 'TRX'] },
        { name: 'Activewear & Gear', brandTags: ['Lululemon', 'Nike', 'Under Armour'] },
      ],
      featuredBrands: ['Garmin', 'Apple', 'Bowflex', 'Lululemon', 'Nike', 'Under Armour', 'TRX']
    },
    {
      id: 'Gaming',
      name: 'Gaming & Peripherals',
      icon: <Gamepad2 className="w-4 h-4 text-indigo-500" />,
      subcategories: [
        { name: 'Consoles & Handhelds', brandTags: ['Sony', 'Microsoft'] },
        { name: 'Gaming Keyboards & Mice', brandTags: ['Razer', 'Logitech G'] },
        { name: 'OLED Monitors & Displays', brandTags: ['ASUS'] },
      ],
      featuredBrands: ['Sony', 'Microsoft', 'Razer', 'Logitech G', 'ASUS']
    },
    {
      id: 'Accessories',
      name: 'Accessories & Travel',
      icon: <Briefcase className="w-4 h-4 text-teal-500" />,
      subcategories: [
        { name: 'Backpacks & Travel Bags', brandTags: ['Bellroy', 'Herschel'] },
        { name: 'Designer Eyewear & Shades', brandTags: ['Ray-Ban', 'Oakley'] },
        { name: 'Wallets & Leather Accessories', brandTags: ['Bellroy', 'Tommy Hilfiger'] },
      ],
      featuredBrands: ['Bellroy', 'Ray-Ban', 'Herschel', 'Tommy Hilfiger', 'Oakley']
    }
  ];

  return (
    <>
      <nav 
        className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 relative z-50 shadow-sm"
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-11 text-xs font-semibold text-slate-700 dark:text-slate-200 overflow-x-auto scrollbar-hidden">
            
            {/* All Departments Button */}
            <Link
              to="/products"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold shrink-0 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 transition-colors"
            >
              <Grid className="w-3.5 h-3.5" /> All Departments
            </Link>

            {/* Department Nav Links */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {departmentData.map((dept) => (
                <div
                  key={dept.id}
                  className="relative"
                  onMouseEnter={() => setActiveMenu(dept.id)}
                >
                  <button
                    onClick={() => navigate(`/products?category=${encodeURIComponent(dept.id)}`)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-150 ${
                      activeMenu === dept.id
                        ? 'bg-primary-600 text-white font-bold shadow-sm'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {dept.icon}
                    <span className="whitespace-nowrap">{dept.name}</span>
                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeMenu === dept.id ? 'rotate-180 text-white' : 'text-slate-400'}`} />
                  </button>
                </div>
              ))}
            </div>

            {/* Special Deals Link */}
            <Link
              to="/products?sort=discount"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold shrink-0 hover:bg-rose-500 hover:text-white transition-colors"
            >
              <Flame className="w-3.5 h-3.5" /> Top Deals
            </Link>

          </div>
        </div>

        {/* ─── Mega Menu Dropdown Panel ─────────────────────────────── */}
        {activeMenu && (
          <div className="absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-2xl z-50">
            <div className="max-w-7xl mx-auto px-6 py-6">
              {departmentData
                .filter((d) => d.id === activeMenu)
                .map((dept) => (
                  <div key={dept.id} className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    
                    {/* Category Details Column */}
                    <div className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-display font-extrabold text-base">
                        {dept.icon} {dept.name}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        Explore wide variety of authentic products from top global brands with AI vector discovery.
                      </p>
                      <Link
                        to={`/products?category=${encodeURIComponent(dept.id)}`}
                        onClick={() => setActiveMenu(null)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline pt-2"
                      >
                        View All {dept.name} Products &rarr;
                      </Link>
                    </div>

                    {/* Subcategories Column */}
                    <div className="md:col-span-2 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Popular Subcategories</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {dept.subcategories.map((sub, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              setActiveMenu(null);
                              navigate(`/products?category=${encodeURIComponent(dept.id)}`);
                            }}
                            className="p-3.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-primary-50 dark:hover:bg-primary-950/60 border border-slate-200/80 dark:border-slate-700/80 cursor-pointer shadow-xs transition-colors group"
                          >
                            <div className="font-semibold text-xs text-slate-900 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                              {sub.name}
                            </div>
                            {sub.brandTags && (
                              <div className="text-[10px] text-slate-400 mt-1 truncate">
                                Brands: {sub.brandTags.join(', ')}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Featured Brands Badge Column */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-amber-500" /> Featured Brands
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {dept.featuredBrands.map((brand, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setActiveMenu(null);
                              navigate(`/products?search=${encodeURIComponent(brand)}`);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 text-slate-700 dark:text-slate-300 text-[11px] font-semibold border border-slate-200 dark:border-slate-700/50 transition-colors"
                          >
                            {brand}
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                ))}
            </div>
          </div>
        )}
      </nav>

      {/* Dimmed Background Overlay behind Mega Menu */}
      {activeMenu && (
        <div 
          className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-xs transition-opacity"
          onMouseEnter={() => setActiveMenu(null)}
          onClick={() => setActiveMenu(null)}
        />
      )}
    </>
  );
};
