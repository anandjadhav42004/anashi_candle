import { Link } from 'react-router-dom';
import { ArrowRight, Check, Flame, Gift, ShieldCheck, Sparkles, Truck } from 'lucide-react';

import {
  brandMetrics,
  brandName,
  brandTagline,
  galleryImages,
  instagramUrl,
  notices,
  testimonials,
  whatsappNumber,
} from '../data';
import { useCart } from '../context';
import { PageMeta, ProductCard, RatingStars, SectionHeading } from '../components';

export default function Home() {
  const { products } = useCart();
  const featuredProducts = products.filter((product) => product.featured).slice(0, 4);
  const bestSellers = products.slice(0, 3);
  const galleryPreview = galleryImages.slice(0, 6);

  return (
    <div className="overflow-hidden">
      <PageMeta title="Aesthetic Handmade Candles" description="ANASHI CANDLES offers soft aesthetic handmade candles for gifts, room decor, and cozy vibes." />

      <section className="hero-shell pt-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-18 pt-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div>
            <p className="eyebrow mb-5">Now in stock and ready to deliver</p>
            <h1 className="font-display text-5xl leading-[0.95] text-stone-950 sm:text-6xl lg:text-8xl">
              {brandName}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-stone-700">{brandTagline}</p>
            <p className="mt-4 max-w-xl text-base leading-7 text-stone-600">Perfect for gifts, room decor, and cozy vibes. DM to place your order now.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/shop" className="button-primary">
                Order Now
              </Link>
              <Link to="/shop" className="button-secondary">
                Explore Candles
              </Link>
            </div>
            <div className="mt-8 grid gap-4 text-sm text-stone-700 sm:grid-cols-3">
              <div className="feature-pill">
                <Truck size={16} />
                <span>Free delivery available</span>
              </div>
              <div className="feature-pill">
                <ShieldCheck size={16} />
                <span>Cash on Delivery</span>
              </div>
              <div className="feature-pill">
                <Gift size={16} />
                <span>In stock now</span>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <img src={featuredProducts[0]?.image} alt={featuredProducts[0]?.name} className="hero-image sm:mt-12" />
            <div className="grid gap-4">
              <img src={featuredProducts[1]?.image} alt={featuredProducts[1]?.name} className="hero-image h-64 sm:h-72" />
              <div className="rounded-[2rem] bg-stone-900 p-6 text-white shadow-soft">
                <p className="text-sm uppercase tracking-[0.25em] text-stone-300">Store notice</p>
                <p className="mt-4 text-2xl font-medium">All candles are non-refundable. Slight variation is part of the aesthetic finish.</p>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi, I want to order candles.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm text-stone-200"
                >
                  Order on WhatsApp
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-4 md:grid-cols-4">
            {brandMetrics.map((metric) => (
              <article key={metric.label} className="stat-card">
                <p className="text-sm uppercase tracking-[0.2em] text-stone-500">{metric.label}</p>
                <p className="mt-3 font-display text-4xl text-stone-950">{metric.value}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="In Stock Candles"
              title="Soft handmade candles in cute shapes and aesthetic colors."
              description="Daisy, bubble, heart, and rose candles are available now with simple pricing and COD support."
            />
            <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-medium text-stone-900">
              View all candles
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-[#f8f2ed]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[0.95fr,1.05fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="About ANASHI"
              title="A small candle brand focused on soft, aesthetic pieces made with love."
              description="ANASHI CANDLES is built around simple handmade designs that feel giftable, pretty, and cozy from the moment they arrive."
            />
            <div className="mt-8 space-y-4 text-sm leading-7 text-stone-600">
              <p>Each candle is designed to work beautifully as decor before it is ever lit, with colors and shapes that suit bedrooms, study tables, and thoughtful gifts.</p>
              <p>Because every piece is handmade, slight color and design variation may happen, which is part of the charm and finish of the product.</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {bestSellers.map((product) => (
              <article key={product.id} className="overflow-hidden rounded-[2rem] bg-white shadow-soft">
                <img src={product.image} alt={product.name} loading="lazy" className="h-60 w-full object-cover" />
                <div className="p-5">
                  <p className="badge mb-3 inline-flex">{product.badge}</p>
                  <h3 className="font-display text-2xl text-stone-900">{product.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{product.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Why Choose Our Candles"
            title="Clear pricing, simple ordering, and aesthetic handmade designs."
            description="The important details stay visible up front: stock status, free delivery, COD, and candle care instructions."
            align="center"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Sparkles,
                title: 'Soft aesthetic look',
                text: 'Cute shapes, gentle colors, and handmade finishes that work for decor and gifting.',
              },
              {
                icon: Check,
                title: 'Simple ordering',
                text: 'The catalog keeps prices, available colors, stock status, and key notes visible without extra clutter.',
              },
              {
                icon: Flame,
                title: 'Safety-first care',
                text: 'Important burn and storage guidance stays visible across the storefront so expectations are clear.',
              },
            ].map((item) => (
              <article key={item.title} className="rounded-[2rem] border border-stone-200 bg-white p-7 shadow-soft">
                <item.icon size={22} className="text-stone-900" />
                <h3 className="mt-5 font-display text-2xl text-stone-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-stone-950 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Customer Testimonials"
            title="Loved for gifting, decor, and cozy vibes."
            description="Customers usually mention the handmade finish, cute presentation, and how easy the candles are to gift."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article key={testimonial.id} className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
                <RatingStars rating={testimonial.rating} />
                <p className="mt-5 text-lg leading-8 text-stone-100">“{testimonial.quote}”</p>
                <div className="mt-6 text-sm text-stone-300">
                  <p>{testimonial.name}</p>
                  <p>{testimonial.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Instagram / Candle Gallery"
              title="A closer look at the candle styles and colors."
              description="Browse the gallery for daisy, heart, rose, and other aesthetic candle setups."
            />
            <a href={instagramUrl} target="_blank" rel="noreferrer" className="button-secondary">
              Visit Instagram
            </a>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryPreview.map((image) => (
              <article key={image.id} className="overflow-hidden rounded-[2rem]">
                <img src={image.image} alt={image.alt} loading="lazy" className="h-72 w-full object-cover transition duration-500 hover:scale-105" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-[#fff8f4]">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Store Notices"
            title="Important instructions before ordering and use."
            description="These notes stay visible because they directly affect delivery expectations, refunds, and candle safety."
            align="center"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {notices.map((notice) => (
              <article key={notice} className="rounded-[1.75rem] border border-stone-200 bg-white p-5 text-sm leading-7 text-stone-600 shadow-soft">
                {notice}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-[#ead9cb] px-6 py-14 text-center shadow-soft md:px-12">
          <SectionHeading
            eyebrow="Order on DM"
            title="ANASHI CANDLES is in stock and ready to deliver."
            description="Use WhatsApp or Instagram DM to place your order for gifts, decor pieces, and cozy room candles."
            align="center"
          />
        </div>
      </section>
    </div>
  );
}
