import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingBag, MessageCircle, Truck, ShieldCheck, Clock, Heart, Star } from 'lucide-react';
import { products, combos, reviews } from '../data/products';
import ProductCard from '../components/ProductCard';

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=1920"
            alt="Aesthetic Candles"
            className="w-full h-full object-cover brightness-[0.85]"
            referrerPolicy="no-referrer"
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
              Handmade with Love ❤️
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-tight">
              Soft little candles,<br />made with love
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 font-light">
              Only <span className="font-bold text-soft-pink">₹30</span> each 😍
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
              { icon: <Truck size={24} />, title: "Free Delivery", sub: "In Parul Hostels" },
              { icon: <ShieldCheck size={24} />, title: "Cash on Delivery", sub: "Available" },
              { icon: <Clock size={24} />, title: "Fast Shipping", sub: "3–4 Days" },
              { icon: <Heart size={24} />, title: "Handmade", sub: "With Love ❤️" },
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
              <span className="text-soft-pink font-bold text-sm uppercase tracking-widest mb-2 block">Our Favorites</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold">Best Sellers</h2>
            </div>
            <Link to="/shop" className="text-sm font-bold border-b-2 border-soft-pink pb-1 mt-4 md:mt-0">
              View All Products
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Combo Section */}
      <section className="py-20 bg-beige relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Most Loved Combos ❤️</h2>
            <p className="text-light-brown/60">Perfect for gifting or treating yourself!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {combos.map((combo) => (
              <motion.div
                key={combo.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-8 rounded-3xl shadow-sm flex flex-col items-center text-center relative"
              >
                <div className="absolute -top-3 -right-3 bg-soft-pink text-light-brown text-xs font-bold px-4 py-1 rounded-full shadow-md">
                  {combo.tag}
                </div>
                <h3 className="text-2xl font-serif font-bold mb-2">{combo.name}</h3>
                <p className="text-sm text-light-brown/60 mb-6">{combo.description}</p>
                <div className="text-4xl font-bold text-light-brown mb-8">
                  ₹{combo.price}
                  <span className="text-sm font-normal text-light-brown/40 ml-2">for {combo.count} candles</span>
                </div>
                <Link to="/shop" className="btn-primary w-full">
                  Shop Combo
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">What Our Customers Say</h2>
            <div className="flex justify-center space-x-1">
              {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={16} className="fill-soft-pink text-soft-pink" />)}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl shadow-sm italic text-light-brown/80"
              >
                <p className="mb-4">"{review.text}"</p>
                <div className="font-bold text-xs not-italic text-light-brown">— {review.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Elements */}
      <section className="py-20 bg-white border-t border-light-brown/5">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-6">Perfect Gift 🎁</h2>
            <p className="text-light-brown/70 mb-10">
              Our candles are designed to be the perfect gift for your friends, family, or even yourself. Aesthetic, affordable, and made with love.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-6 py-2 bg-beige rounded-full text-xs font-bold uppercase tracking-widest">Limited Stock</span>
              <span className="px-6 py-2 bg-soft-pink rounded-full text-xs font-bold uppercase tracking-widest">Only ₹30 😍</span>
              <span className="px-6 py-2 bg-accent rounded-full text-xs font-bold uppercase tracking-widest">Free Delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Order Now Button (Mobile Only) */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-40">
        <Link to="/shop" className="btn-primary w-full flex items-center justify-center space-x-2 shadow-2xl py-4">
          <ShoppingBag size={20} />
          <span>Shop Now — Only ₹30</span>
        </Link>
      </div>
    </div>
  );
};

export default Home;
