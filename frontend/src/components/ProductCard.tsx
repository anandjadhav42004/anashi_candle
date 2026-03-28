import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { useCart } from '../context';
import { Product } from '../data';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card-aesthetic group"
    >
      <Link to={`/product/${product.id}`} className="block relative aspect-[3/4] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4">
          <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors">
            <Heart size={18} className="text-light-brown" />
          </button>
        </div>
        {product.isBestSeller && (
          <div className="absolute top-4 left-4 bg-soft-pink text-light-brown text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
            Best Seller
          </div>
        )}
      </Link>

      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <Link to={`/product/${product.id}`}>
            <h3 className="font-serif font-bold text-lg group-hover:text-light-brown/70 transition-colors">
              {product.name}
            </h3>
          </Link>
          <span className="font-bold text-light-brown">₹{product.price}</span>
        </div>
        <p className="text-xs text-light-brown/60 mb-4 line-clamp-1">
          {product.category} • Handmade
        </p>
        
        <button
          onClick={() => addToCart(product, 1)}
          className="w-full flex items-center justify-center space-x-2 py-2 border border-light-brown/20 rounded-full text-sm font-medium hover:bg-light-brown hover:text-cream transition-all duration-300"
        >
          <Plus size={16} />
          <span>Add to Cart</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
