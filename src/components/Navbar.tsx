import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, ShoppingBag, User, X } from 'lucide-react';

import { brandName } from '../data';
import { useCart } from '../context';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Track Order', to: '/tracking' },
];

export default function Navbar() {
  const location = useLocation();
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition duration-300 ${scrolled ? 'px-4 py-3' : 'px-4 py-5'}`}>
      <div className={`mx-auto max-w-7xl rounded-full border border-white/60 px-5 py-3 shadow-soft backdrop-blur-xl ${scrolled ? 'bg-white/85' : 'bg-white/70'}`}>
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="font-display text-2xl text-stone-900">
            {brandName}
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm transition ${isActive ? 'text-stone-950' : 'text-stone-600 hover:text-stone-900'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/admin" className="icon-button hidden sm:inline-flex" aria-label="Admin panel">
              <User size={18} />
            </Link>
            <Link to="/cart" className="icon-button relative" aria-label="Shopping cart">
              <ShoppingBag size={18} />
              {totalItems ? (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-stone-900 text-[10px] text-white">
                  {totalItems}
                </span>
              ) : null}
            </Link>
            <button type="button" className="icon-button lg:hidden" onClick={() => setMobileOpen((value) => !value)} aria-label="Toggle menu">
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <nav className="mt-4 grid gap-2 border-t border-stone-200 pt-4 lg:hidden">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-sm ${isActive ? 'bg-stone-900 text-white' : 'bg-stone-50 text-stone-700'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink to="/admin" className="rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-700">
              Admin
            </NavLink>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
