
import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../store';
import { ProductCard } from '../components/ProductCard';
// Added missing 'Search' import
import { SlidersHorizontal, ChevronDown, Grid, LayoutGrid, Filter, Search } from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const { state } = useApp();
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('Newest');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const categoryParam = searchParams.get('category');
  const themeParam = searchParams.get('theme');

  const filteredProducts = useMemo(() => {
    return state.products.filter(p => {
      if (categoryParam && p.category !== categoryParam) return false;
      if (themeParam && p.theme !== themeParam) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      if (selectedThemes.length > 0 && !selectedThemes.includes(p.theme || '')) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'Price: Low to High') return a.price - b.price;
      if (sortBy === 'Price: High to Low') return b.price - a.price;
      if (sortBy === 'Popularity') return b.reviewsCount - a.reviewsCount;
      return 0; // Newest by default
    });
  }, [state.products, categoryParam, themeParam, sortBy, priceRange, selectedThemes]);

  const themes = ['Marvel', 'DC', 'Anime', 'Disney', 'Harry Potter'];

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
            <a href="/" className="hover:text-red-600">Home</a>
            <span>/</span>
            <span className="text-gray-900">{categoryParam || themeParam || 'All Collections'}</span>
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">
            {categoryParam || themeParam || 'The Complete Collection'}
            <span className="text-red-600 ml-3 text-lg font-bold">({filteredProducts.length} items)</span>
          </h1>
          <p className="text-gray-500 font-medium max-w-2xl">Discover official merchandise and premium quality originals designed for the fan in you.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className={`lg:w-72 flex-shrink-0 space-y-10 lg:block ${showFilters ? 'block' : 'hidden'}`}>
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest mb-6 border-b-2 border-red-600 pb-2 inline-block">Filter By Price</h3>
              <div className="space-y-4">
                <input 
                  type="range" 
                  min="0" 
                  max="5000" 
                  value={priceRange[1]} 
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full accent-red-600"
                />
                <div className="flex justify-between text-xs font-bold text-gray-500">
                  <span>₹0</span>
                  <span className="text-red-600">Up to ₹{priceRange[1]}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase tracking-widest mb-6">Themes</h3>
              <div className="space-y-3">
                {themes.map(t => (
                  <label key={t} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500"
                      checked={selectedThemes.includes(t)}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedThemes([...selectedThemes, t]);
                        else setSelectedThemes(selectedThemes.filter(theme => theme !== t));
                      }}
                    />
                    <span className="text-sm font-bold text-gray-600 group-hover:text-black transition-colors">{t}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase tracking-widest mb-6">Stock Status</h3>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500" />
                <span className="text-sm font-bold text-gray-600">Exclude Out of Stock</span>
              </label>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="flex-grow">
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-6">
                 <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg"
                 >
                   <Filter size={16} /> Filters
                 </button>
                 <div className="hidden sm:flex items-center gap-4 text-gray-400">
                   <Grid size={20} className="text-gray-900 cursor-pointer" />
                   <LayoutGrid size={20} className="cursor-pointer hover:text-gray-900" />
                 </div>
              </div>
              
              <div className="flex items-center gap-4">
                 <span className="text-xs font-black text-gray-400 uppercase tracking-widest hidden sm:block">Sort By:</span>
                 <div className="relative group">
                    <button className="flex items-center gap-10 bg-gray-50 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest border-2 border-transparent hover:border-gray-200 transition-all">
                      {sortBy}
                      <ChevronDown size={14} />
                    </button>
                    <div className="absolute top-full right-0 w-56 bg-white shadow-2xl rounded-2xl p-2 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 border border-gray-100">
                      {['Popularity', 'Newest', 'Price: Low to High', 'Price: High to Low'].map(opt => (
                        <button 
                          key={opt}
                          onClick={() => setSortBy(opt)}
                          className={`w-full text-left px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-50 hover:text-red-600 transition-colors ${sortBy === opt ? 'text-red-600 bg-red-50' : 'text-gray-700'}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                 </div>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-10">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
              {filteredProducts.length === 0 && (
                <div className="col-span-full py-32 text-center">
                   <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                      <Search size={40} />
                   </div>
                   <h3 className="text-2xl font-black uppercase mb-2">No items found</h3>
                   <p className="text-gray-500 font-medium">Try adjusting your filters or search terms.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
