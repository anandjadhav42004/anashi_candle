import { FormEvent, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CheckCircle2, Minus, Plus, Truck } from 'lucide-react';

import { PageMeta, RatingStars } from '../components';
import { useCart } from '../context';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, addReview } = useCart();
  const product = useMemo(() => products.find((item) => item.id === id), [id, products]);

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(product?.colors[0] ?? '');
  const [fragrance, setFragrance] = useState(product?.fragrances[0] ?? '');
  const [customMessage, setCustomMessage] = useState('');
  const [giftPackaging, setGiftPackaging] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [reviewForm, setReviewForm] = useState({ author: '', title: '', comment: '', rating: 5 });

  if (!product) {
    return (
      <div className="page-shell">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="font-display text-4xl text-stone-900">Product not found</h1>
          <Link to="/shop" className="button-primary mt-6 inline-flex">
            Back to shop
          </Link>
        </div>
      </div>
    );
  }

  const outOfStock = product.stock === 0;

  const handleAddToCart = () => {
    const result = addToCart(product, {
      quantity,
      color,
      fragrance,
      customMessage,
      giftPackaging,
    });
    setStatusMessage(result.message);
  };

  const handleBuyNow = () => {
    const result = addToCart(product, {
      quantity,
      color,
      fragrance,
      customMessage,
      giftPackaging,
    });
    setStatusMessage(result.message);

    if (result.ok) {
      navigate('/checkout');
    }
  };

  const handleReviewSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addReview(product.id, {
      author: reviewForm.author,
      title: reviewForm.title,
      comment: reviewForm.comment,
      rating: reviewForm.rating,
    });
    setReviewForm({ author: '', title: '', comment: '', rating: 5 });
  };

  return (
    <div className="page-shell">
      <PageMeta title={product.name} description={product.description} />

      <div className="mx-auto max-w-7xl px-4">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-stone-500">
          Back to shop
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.02fr,0.98fr]">
          <div className="grid gap-4">
            <div className="overflow-hidden rounded-[2.5rem] bg-[#f3e7dc]">
              <img src={product.images[activeImage]} alt={product.name} className="h-[28rem] w-full object-cover transition duration-500 hover:scale-110" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`overflow-hidden rounded-[1.5rem] border ${index === activeImage ? 'border-stone-900' : 'border-transparent'}`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="h-28 w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow mb-3">{product.category}</p>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-display text-5xl text-stone-950">{product.name}</h1>
              {product.badge ? <span className="badge">{product.badge}</span> : null}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-stone-500">
              <RatingStars rating={product.rating} />
              <span>{product.rating.toFixed(1)} rating</span>
              <span>{product.reviewCount} reviews</span>
            </div>
            <div className="mt-6 flex items-end gap-3">
              <p className="text-3xl font-semibold text-stone-950">Rs.{product.price}</p>
              {product.compareAtPrice ? <p className="pb-1 text-stone-400 line-through">Rs.{product.compareAtPrice}</p> : null}
            </div>

            <p className="mt-6 max-w-2xl text-base leading-8 text-stone-600">{product.description}</p>
            <ul className="mt-6 grid gap-2 text-sm text-stone-600">
              {product.details.map((detail) => (
                <li key={detail} className="inline-flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-stone-900" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 grid gap-6 rounded-[2rem] border border-stone-200 bg-white p-6 shadow-soft">
              <div>
                <p className="mb-3 text-sm font-medium text-stone-900">Color options</p>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setColor(item)}
                      className={`rounded-full border px-4 py-2 text-sm ${color === item ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-200 bg-white text-stone-700'}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-medium text-stone-900">Fragrance options</p>
                <div className="flex flex-wrap gap-3">
                  {product.fragrances.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setFragrance(item)}
                      className={`rounded-full border px-4 py-2 text-sm ${fragrance === item ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-200 bg-white text-stone-700'}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-stone-900">Custom message on candle card</span>
                <textarea
                  value={customMessage}
                  onChange={(event) => setCustomMessage(event.target.value)}
                  className="min-h-28 rounded-[1.5rem] border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-stone-400"
                  placeholder="Add a short personal note"
                />
              </label>

              <label className="inline-flex items-center gap-3 text-sm text-stone-700">
                <input type="checkbox" checked={giftPackaging} onChange={(event) => setGiftPackaging(event.target.checked)} />
                <span>Add gift packaging</span>
              </label>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-stone-500">Stock availability</p>
                  <p className={`mt-1 text-sm font-medium ${outOfStock ? 'text-red-600' : 'text-stone-900'}`}>
                    {outOfStock ? 'Out of stock' : `Only ${product.stock} left in stock`}
                  </p>
                  <p className="mt-1 text-sm text-stone-500">Estimated delivery: {product.deliveryEstimate}</p>
                </div>

                <div className="inline-flex items-center rounded-full border border-stone-200 bg-white p-1">
                  <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="icon-button">
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center text-sm">{quantity}</span>
                  <button type="button" onClick={() => setQuantity((value) => Math.min(product.stock || 1, value + 1))} className="icon-button">
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <button type="button" disabled={outOfStock} onClick={handleAddToCart} className="button-secondary disabled:cursor-not-allowed disabled:opacity-50">
                  Add to Cart
                </button>
                <button type="button" disabled={outOfStock} onClick={handleBuyNow} className="button-primary disabled:cursor-not-allowed disabled:opacity-50">
                  Buy Now
                </button>
              </div>
              {statusMessage ? <p className="text-sm text-stone-500">{statusMessage}</p> : null}
            </div>

            <div className="mt-6 rounded-[2rem] border border-stone-200 bg-[#f7f1ea] p-5 text-sm text-stone-700">
              <p className="inline-flex items-center gap-2 font-medium text-stone-900">
                <Truck size={16} />
                Free delivery available. Cash on Delivery is available at checkout.
              </p>
            </div>
          </div>
        </div>

        <section className="mt-18 grid gap-8 lg:grid-cols-[0.95fr,1.05fr]">
          <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-soft">
            <h2 className="font-display text-3xl text-stone-900">Write a review</h2>
            <form className="mt-6 grid gap-4" onSubmit={handleReviewSubmit}>
              <input
                required
                value={reviewForm.author}
                onChange={(event) => setReviewForm((current) => ({ ...current, author: event.target.value }))}
                className="rounded-full border border-stone-200 px-5 py-3 text-sm outline-none transition focus:border-stone-400"
                placeholder="Your name"
              />
              <input
                required
                value={reviewForm.title}
                onChange={(event) => setReviewForm((current) => ({ ...current, title: event.target.value }))}
                className="rounded-full border border-stone-200 px-5 py-3 text-sm outline-none transition focus:border-stone-400"
                placeholder="Review title"
              />
              <textarea
                required
                value={reviewForm.comment}
                onChange={(event) => setReviewForm((current) => ({ ...current, comment: event.target.value }))}
                className="min-h-32 rounded-[1.5rem] border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-stone-400"
                placeholder="Share your experience"
              />
              <select
                value={reviewForm.rating}
                onChange={(event) => setReviewForm((current) => ({ ...current, rating: Number(event.target.value) }))}
                className="rounded-full border border-stone-200 px-5 py-3 text-sm outline-none transition focus:border-stone-400"
              >
                {[5, 4, 3, 2, 1].map((ratingValue) => (
                  <option key={ratingValue} value={ratingValue}>
                    {ratingValue} stars
                  </option>
                ))}
              </select>
              <button type="submit" className="button-primary">
                Submit review
              </button>
            </form>
          </div>

          <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-soft">
            <h2 className="font-display text-3xl text-stone-900">Customer reviews</h2>
            <div className="mt-6 space-y-5">
              {product.reviews.map((review) => (
                <article key={review.id} className="rounded-[1.5rem] border border-stone-200 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-stone-900">{review.author}</p>
                      <p className="text-sm text-stone-500">{review.date}</p>
                    </div>
                    <RatingStars rating={review.rating} />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-stone-900">{review.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-stone-600">{review.comment}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
