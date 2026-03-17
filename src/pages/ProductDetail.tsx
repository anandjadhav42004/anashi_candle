import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingBag, MessageCircle, Heart, Minus, Plus, ArrowLeft, Truck, ShieldCheck } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="text-2xl mb-4">Product not found</h1>
        <Link to="/shop" className="btn-primary">Back to Shop</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor || product.colors[0]);
    // Optional: show toast or redirect
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor || product.colors[0]);
    navigate('/cart');
  };

  const handleWhatsApp = () => {
    const text = `Hi! I want to order ${quantity} x ${product.name} (${selectedColor || product.colors[0]}) for ₹${product.price * quantity}.`;
    window.open(`https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="pt-32 pb-20 bg-cream min-h-screen">
      <div className="container mx-auto px-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-sm font-medium text-light-brown/60 hover:text-light-brown mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-3xl overflow-hidden shadow-xl aspect-[3/4]"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-8">
              <span className="text-soft-pink font-bold text-sm uppercase tracking-widest mb-2 block">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-light-brown">₹{product.price}</span>
                <span className="px-3 py-1 bg-soft-pink/30 text-light-brown text-[10px] font-bold rounded-full">
                  Only ₹30 😍
                </span>
              </div>
              <p className="text-light-brown/70 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Color Selection */}
            <div className="mb-8">
              <h3 className="text-sm font-bold mb-4 uppercase tracking-wider">Select Color</h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                      (selectedColor === color || (!selectedColor && product.colors[0] === color))
                        ? 'bg-light-brown text-cream'
                        : 'bg-white text-light-brown hover:bg-soft-pink/20'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-10">
              <h3 className="text-sm font-bold mb-4 uppercase tracking-wider">Quantity</h3>
              <div className="flex items-center space-x-6">
                <div className="flex items-center bg-white rounded-full p-1 shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-cream rounded-full transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-12 text-center font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-cream rounded-full transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <span className="text-xs text-light-brown/40">Limited Stock Available</span>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <button onClick={handleAddToCart} className="btn-secondary flex items-center justify-center space-x-2">
                <ShoppingBag size={20} />
                <span>Add to Cart</span>
              </button>
              <button onClick={handleBuyNow} className="btn-primary flex items-center justify-center space-x-2">
                <span>Buy Now</span>
              </button>
              <button
                onClick={handleWhatsApp}
                className="sm:col-span-2 py-4 border-2 border-light-brown/10 rounded-full font-bold flex items-center justify-center space-x-2 hover:bg-white transition-all"
              >
                <MessageCircle size={20} className="text-green-500" />
                <span>Order via WhatsApp</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-light-brown/10">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white rounded-xl shadow-sm">
                  <Truck size={20} className="text-light-brown" />
                </div>
                <div>
                  <h4 className="text-xs font-bold">Free Delivery</h4>
                  <p className="text-[10px] text-light-brown/50">In Parul Hostels</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white rounded-xl shadow-sm">
                  <ShieldCheck size={20} className="text-light-brown" />
                </div>
                <div>
                  <h4 className="text-xs font-bold">Cash on Delivery</h4>
                  <p className="text-[10px] text-light-brown/50">Available</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
