import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, MessageCircle, Phone } from 'lucide-react';

import { brandName, brandTagline, contactEmail, instagramUrl, supportPhone, whatsappNumber } from '../data';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) {
      return;
    }
    setSubmitted(true);
    setEmail('');
  };

  return (
    <footer className="border-t border-stone-200 bg-[#f7f1ea]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1.4fr,1fr,1fr,1.1fr]">
        <div>
          <Link to="/" className="font-display text-3xl text-stone-900">
            {brandName}
          </Link>
          <p className="mt-4 max-w-md text-sm leading-7 text-stone-600">{brandTagline}</p>
          <div className="mt-6 flex gap-3">
            <a href={instagramUrl} target="_blank" rel="noreferrer" className="icon-button" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi, I want to order candles.')}`}
              target="_blank"
              rel="noreferrer"
              className="icon-button"
              aria-label="WhatsApp"
            >
              <MessageCircle size={18} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-display text-xl text-stone-900">Navigation</h3>
          <div className="mt-4 grid gap-3 text-sm text-stone-600">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/tracking">Track Order</Link>
          </div>
        </div>

        <div>
          <h3 className="font-display text-xl text-stone-900">Policies</h3>
          <div className="mt-4 grid gap-3 text-sm leading-7 text-stone-600">
            <p>All candles are non-refundable</p>
            <p>Slight color or design variation may occur</p>
            <p>Keep away from direct heat before use</p>
            <p>Use on a heat-safe surface</p>
            <p>Never leave candles unattended</p>
          </div>
        </div>

        <div>
          <h3 className="font-display text-xl text-stone-900">Newsletter</h3>
          <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email address"
              className="w-full rounded-full border border-stone-200 bg-white px-5 py-3 text-sm outline-none transition focus:border-stone-400"
            />
            <button type="submit" className="button-primary w-full">
              Subscribe
            </button>
          </form>
          <p className="mt-3 text-sm text-stone-500">
            {submitted ? 'You are subscribed for restocks and offers.' : 'Get restocks, offers, and candle updates.'}
          </p>
          <div className="mt-6 space-y-2 text-sm text-stone-600">
            <p className="inline-flex items-center gap-2">
              <Mail size={16} />
              <span>{contactEmail}</span>
            </p>
            <p className="inline-flex items-center gap-2">
              <Phone size={16} />
              <span>{supportPhone}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-stone-200 px-4 py-5 text-center text-xs text-stone-500">
        © 2026 {brandName}. Light up your moments.
      </div>
    </footer>
  );
}
