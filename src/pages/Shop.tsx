import React, { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { ProductCard } from '../components';
import { products } from '../data';

const Shop = () => {
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Newest');
  const [search, setSearch] = useState('');

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = products
    .filter(p => (filter === 'All' || p.category === filter))
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'Price: Low to High') return a.price - b.price;
      if (sort === 'Price: High to Low') return b.price - a.price;
      return 0;
    });

  return (
    <div className="pt-32 pb-20 bg-cream min-h-screen">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif font-bold mb-4">Shop All Candles</h1>
          <p className="text-light-brown/60">Explore our collection of aesthetic handmade candles.</p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  filter === cat ? 'bg-light-brown text-cream' : 'bg-white text-light-brown hover:bg-soft-pink/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-light-brown/40" size={18} />
              <input
                type="text"
                placeholder="Search candles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-2 bg-white rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-soft-pink/50"
              />
            </div>
            
            <div className="relative group">
              <button className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full text-sm font-medium">
                <span>{sort}</span>
                <ChevronDown size={16} />
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 overflow-hidden">
                {['Newest', 'Price: Low to High', 'Price: High to Low'].map(s => (
                  <button
                    key={s}
                    onClick={() => setSort(s)}
                    className="w-full text-left px-6 py-3 text-sm hover:bg-cream transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-light-brown/40">No candles found matching your search.</p>
            <button
              onClick={() => {setFilter('All'); setSearch('');}}
              className="mt-4 text-light-brown font-bold border-b-2 border-soft-pink"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
