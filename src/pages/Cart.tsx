import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';

import { PageMeta } from '../components';
import { useCart } from '../context';

export default function Cart() {
  const { cart, subtotal, discount, totalPrice, removeFromCart, updateQuantity } = useCart();

  if (!cart.length) {
    return (
      <div className="page-shell">
        <PageMeta title="Cart" />
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="font-display text-5xl text-stone-900">Your cart is empty</h1>
          <p className="mt-4 text-stone-600">Add a candle or gift set to start your checkout.</p>
          <Link to="/shop" className="button-primary mt-8 inline-flex">
            Start shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <PageMeta title="Cart" description="Review candle selections and order totals before checkout." />

      <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[1.08fr,0.92fr]">
        <section>
          <h1 className="font-display text-5xl text-stone-900">Shopping cart</h1>
          <div className="mt-8 space-y-4">
            {cart.map((item) => (
              <article key={item.cartItemId} className="grid gap-5 rounded-[2rem] border border-stone-200 bg-white p-5 shadow-soft md:grid-cols-[10rem,1fr]">
                <img src={item.image} alt={item.name} className="h-48 w-full rounded-[1.5rem] object-cover md:h-full" />
                <div className="flex flex-col justify-between gap-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="font-display text-3xl text-stone-900">{item.name}</h2>
                      <p className="mt-2 text-sm text-stone-500">
                        {item.selectedColor} • {item.selectedFragrance}
                      </p>
                      <p className="mt-2 text-sm text-stone-500">
                        Gift packaging: {item.giftPackaging ? 'Yes' : 'No'}
                      </p>
                      {item.customMessage ? <p className="mt-2 text-sm text-stone-500">Message: {item.customMessage}</p> : null}
                    </div>
                    <button type="button" onClick={() => removeFromCart(item.cartItemId)} className="icon-button" aria-label="Remove item">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="inline-flex items-center rounded-full border border-stone-200 bg-stone-50 p-1">
                      <button type="button" onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)} className="icon-button">
                        <Minus size={16} />
                      </button>
                      <span className="w-10 text-center text-sm">{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)} className="icon-button">
                        <Plus size={16} />
                      </button>
                    </div>
                    <p className="text-lg font-semibold text-stone-900">Rs.{item.price * item.quantity}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-soft lg:sticky lg:top-28 lg:h-fit">
          <h2 className="font-display text-3xl text-stone-900">Order summary</h2>

          <div className="mt-6 space-y-4 text-sm text-stone-600">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>Rs.{subtotal}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Discount</span>
              <span>- Rs.{discount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
          </div>

          <div className="mt-6 border-t border-stone-200 pt-6">
            <div className="flex items-center justify-between text-lg font-semibold text-stone-900">
              <span>Total</span>
              <span>Rs.{totalPrice}</span>
            </div>
          </div>

          <Link to="/checkout" className="button-primary mt-8 w-full justify-center">
            Proceed to checkout
          </Link>
        </aside>
      </div>
    </div>
  );
}
