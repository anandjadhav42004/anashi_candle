import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, MessageCircle, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-beige pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-3xl font-serif font-bold tracking-widest text-light-brown mb-6 block">
              ANASHI
            </Link>
            <p className="text-light-brown/70 max-w-md mb-6">
              Soft little candles, made with love. We bring aesthetic, handmade vibes to your space at an affordable price.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-all">
                <Instagram size={20} />
              </a>
              <a href="https://wa.me/91XXXXXXXXXX" className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-all">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-soft-pink transition-colors">Home</Link></li>
              <li><Link to="/shop" className="hover:text-soft-pink transition-colors">Shop All</Link></li>
              <li><Link to="/cart" className="hover:text-soft-pink transition-colors">My Cart</Link></li>
              <li><Link to="/checkout" className="hover:text-soft-pink transition-colors">Checkout</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-6">Support</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-soft-pink transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-soft-pink transition-colors">Refund Policy</a></li>
              <li><a href="#" className="hover:text-soft-pink transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-soft-pink transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-light-brown/10 pt-8 flex flex-col md:row justify-between items-center text-xs text-light-brown/50">
          <p>© 2026 ANASHI. All rights reserved.</p>
          <p className="mt-2 md:mt-0 flex items-center">
            Made with <Heart size={12} className="mx-1 text-soft-pink fill-soft-pink" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
