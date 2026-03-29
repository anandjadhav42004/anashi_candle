import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

import { Product } from '../data';
import { useCart } from '../context';
import RatingStars from './RatingStars';

interface ProductCardProps {
  key?: string;
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const outOfStock = product.stock === 0;

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="group block">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#f2e6dc]">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-80 w-full object-cover transition duration-700 group-hover:scale-105"
          />
          {product.badge ? <span className="badge absolute left-4 top-4">{product.badge}</span> : null}
          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-full bg-white/90 px-4 py-2 text-xs text-stone-600 backdrop-blur">
            <span>{product.category}</span>
            <span>{outOfStock ? 'Sold Out' : `Only ${product.stock} left`}</span>
          </div>
        </div>
      </Link>
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link to={`/product/${product.id}`} className="font-display text-2xl text-stone-900">
              {product.name}
            </Link>
            <div className="mt-2 flex items-center gap-2 text-sm text-stone-500">
              <RatingStars rating={product.rating} />
              <span>{product.rating.toFixed(1)}</span>
              <span>({product.reviewCount})</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-stone-900">Rs.{product.price}</p>
            {product.compareAtPrice ? <p className="text-sm text-stone-400 line-through">Rs.{product.compareAtPrice}</p> : null}
          </div>
        </div>
        <button
          type="button"
          disabled={outOfStock}
          onClick={() =>
            addToCart(product, {
              quantity: 1,
              color: product.colors[0],
              fragrance: product.fragrances[0],
              customMessage: '',
              giftPackaging: false,
            })
          }
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-stone-200 px-4 py-3 text-sm font-medium text-stone-900 transition hover:border-stone-900 hover:bg-stone-900 hover:text-white disabled:cursor-not-allowed disabled:border-stone-200 disabled:bg-stone-100 disabled:text-stone-400"
        >
          <ShoppingBag size={16} />
          <span>{outOfStock ? 'Out of stock' : 'Quick add to cart'}</span>
        </button>
      </div>
    </article>
  );
}
