import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingBag, MessageCircle, Truck, ShieldCheck, Clock, Heart, Sparkles, Flame, Gift } from 'lucide-react';
import { productImages } from '../assets/products';
import { ProductCard } from '../components';
import { notices, products } from '../data';

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={productImages.daisyCollection}
            alt="Anashi candle collection"
            className="w-full h-full object-cover brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-cream/90"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1 bg-white/30 backdrop-blur-md rounded-full text-white text-xs font-bold tracking-widest uppercase mb-6">
              In Stock Now
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-tight">
              Anashi Candles
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 font-light">
              Soft. Aesthetic. Made with Love 🤍
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/shop" className="btn-primary w-full sm:w-auto flex items-center justify-center space-x-2">
                <ShoppingBag size={20} />
                <span>Shop Now</span>
              </Link>
              <a
                href="https://wa.me/91XXXXXXXXXX?text=Hi%20I%20want%20to%20order"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full sm:w-auto flex items-center justify-center space-x-2"
              >
                <MessageCircle size={20} />
                <span>Order on WhatsApp</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white/50 rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Truck size={24} />, title: "Free Delivery", sub: "Available" },
              { icon: <ShieldCheck size={24} />, title: "Cash on Delivery", sub: "Available" },
              { icon: <Clock size={24} />, title: "Ready to Deliver", sub: "In Stock" },
              { icon: <Heart size={24} />, title: "Handmade", sub: "Made with Love" },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm text-light-brown">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-light-brown/60">{feature.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-soft-pink font-bold text-sm uppercase tracking-widest mb-2 block">Product Range</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold">Now In Stock</h2>
            </div>
            <Link to="/shop" className="text-sm font-bold border-b-2 border-soft-pink pb-1 mt-4 md:mt-0">
              View All Products
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-beige relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Why People Pick Anashi</h2>
            <p className="text-light-brown/60">Perfect for gifts, room decor, and cozy vibes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Sparkles size={24} />,
                title: 'Soft Aesthetic Finish',
                text: 'Each candle is handmade with slight variations that make every piece feel unique.',
                image: productImages.roseCandles,
              },
              {
                icon: <Gift size={24} />,
                title: 'Gift-Ready Products',
                text: 'Daisy, heart, bubble, and rose candles are styled for gifting and cute room setups.',
                image: productImages.heartMarbleDisplay,
              },
              {
                icon: <Flame size={24} />,
                title: 'Made for Cozy Moments',
                text: 'Decorative candles that bring warmth, softness, and a premium handmade feel.',
                image: productImages.roseDisplay,
              },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-3xl shadow-sm overflow-hidden flex flex-col text-center relative"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-8 flex flex-col items-center">
                  <div className="w-12 h-12 bg-cream rounded-2xl flex items-center justify-center text-light-brown mb-5">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-3">{item.title}</h3>
                  <p className="text-sm text-light-brown/60 mb-8">{item.text}</p>
                  <Link to="/shop" className="btn-primary w-full">
                    Shop Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructions */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">Important Instructions</h2>
            <p className="text-light-brown/60">Please read before placing your order.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notices.map((notice) => (
              <motion.div
                key={notice}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl shadow-sm text-light-brown/80"
              >
                <p>{notice}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Elements */}
      <section className="py-20 bg-white border-t border-light-brown/5">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div className="rounded-[2rem] overflow-hidden shadow-lg">
              <img
                src={productImages.heartMarbleDisplay}
                alt="Heart candle gift set"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6">Perfect for Gifts, Decor & Cozy Vibes</h2>
              <p className="text-light-brown/70 mb-10">
                We are in stock and ready to deliver. Place your order on WhatsApp and pay with cash on delivery.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="px-6 py-2 bg-beige rounded-full text-xs font-bold uppercase tracking-widest">Limited Stock</span>
                <span className="px-6 py-2 bg-soft-pink rounded-full text-xs font-bold uppercase tracking-widest">COD Available</span>
                <span className="px-6 py-2 bg-accent rounded-full text-xs font-bold uppercase tracking-widest">Free Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Order Now Button (Mobile Only) */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-40">
        <Link to="/shop" className="btn-primary w-full flex items-center justify-center space-x-2 shadow-2xl py-4">
          <ShoppingBag size={20} />
          <span>Shop Now</span>
        </Link>
      </div>
    </div>
  );
};

export default Home;
