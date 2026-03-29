import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import { PageMeta } from '../components';
import { useCart } from '../context';
import { PaymentMethod } from '../data';

const paymentMethods: PaymentMethod[] = ['Cash on Delivery'];

export default function Checkout() {
  const { cart, subtotal, discount, totalPrice, activeCoupon, placeOrder } = useCart();
  const [statusMessage, setStatusMessage] = useState('');
  const [completedOrderId, setCompletedOrderId] = useState('');
  const [emailNotifications, setEmailNotifications] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    postalCode: '',
    paymentMethod: 'Cash on Delivery' as PaymentMethod,
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = placeOrder({
      customer: {
        name: form.name,
        email: form.email,
        phone: form.phone,
      },
      address: {
        line1: form.line1,
        line2: form.line2,
        city: form.city,
        state: form.state,
        postalCode: form.postalCode,
      },
      paymentMethod: form.paymentMethod,
    });

    setStatusMessage(result.message);

    if (result.ok && result.order) {
      setCompletedOrderId(result.order.id);
      setEmailNotifications(result.order.notifications);
    }
  };

  if (!cart.length && !completedOrderId) {
    return (
      <div className="page-shell">
        <PageMeta title="Checkout" />
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="font-display text-5xl text-stone-900">Your cart is empty</h1>
          <Link to="/shop" className="button-primary mt-8 inline-flex">
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  if (completedOrderId) {
    return (
      <div className="page-shell">
        <PageMeta title="Order Confirmed" />
        <div className="mx-auto max-w-4xl rounded-[2.5rem] border border-stone-200 bg-white p-8 text-center shadow-soft">
          <p className="eyebrow">Order placed</p>
          <h1 className="font-display text-5xl text-stone-900">Thank you for your order</h1>
          <p className="mt-4 text-stone-600">Your order ID is {completedOrderId}. Use it on the tracking page to monitor delivery progress.</p>
          <div className="mt-8 space-y-3 rounded-[2rem] bg-[#f8f2ed] p-6 text-left text-sm text-stone-600">
            {emailNotifications.map((notification) => (
              <p key={notification}>{notification}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/tracking" className="button-primary">
              Track order
            </Link>
            <Link to="/shop" className="button-secondary">
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <PageMeta title="Checkout" description="Checkout for ANASHI CANDLES with address form, COD selection, and order summary." />

      <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[1.05fr,0.95fr]">
        <form onSubmit={handleSubmit} className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-soft">
          <h1 className="font-display text-5xl text-stone-900">Checkout</h1>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <input required value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} className="input-field" placeholder="Full name" />
            <input required type="email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} className="input-field" placeholder="Email address" />
            <input required value={form.phone} onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} className="input-field" placeholder="Phone number" />
            <input required value={form.postalCode} onChange={(event) => setForm((current) => ({ ...current, postalCode: event.target.value }))} className="input-field" placeholder="Postal code" />
          </div>

          <div className="mt-4 grid gap-4">
            <input required value={form.line1} onChange={(event) => setForm((current) => ({ ...current, line1: event.target.value }))} className="input-field" placeholder="Address line 1" />
            <input value={form.line2} onChange={(event) => setForm((current) => ({ ...current, line2: event.target.value }))} className="input-field" placeholder="Address line 2" />
            <div className="grid gap-4 md:grid-cols-2">
              <input required value={form.city} onChange={(event) => setForm((current) => ({ ...current, city: event.target.value }))} className="input-field" placeholder="City" />
              <input required value={form.state} onChange={(event) => setForm((current) => ({ ...current, state: event.target.value }))} className="input-field" placeholder="State" />
            </div>
          </div>

          <div className="mt-8">
            <h2 className="font-display text-3xl text-stone-900">Payment selection</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {paymentMethods.map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setForm((current) => ({ ...current, paymentMethod: method }))}
                  className={`rounded-[1.5rem] border px-4 py-4 text-left text-sm transition ${
                    form.paymentMethod === method ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-200 bg-white text-stone-700'
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm text-stone-500">
              Cash on Delivery is currently available for orders.
            </p>
          </div>

          {statusMessage ? <p className="mt-6 text-sm text-stone-500">{statusMessage}</p> : null}

          <button type="submit" className="button-primary mt-8">
            Place order
          </button>
        </form>

        <aside className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-soft lg:sticky lg:top-28 lg:h-fit">
          <h2 className="font-display text-3xl text-stone-900">Order summary</h2>
          <div className="mt-6 space-y-4">
            {cart.map((item) => (
              <div key={item.cartItemId} className="flex items-center justify-between gap-4 text-sm text-stone-600">
                <div>
                  <p className="font-medium text-stone-900">{item.name}</p>
                  <p>
                    {item.quantity} x Rs.{item.price}
                  </p>
                </div>
                <span>Rs.{item.quantity * item.price}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-3 border-t border-stone-200 pt-6 text-sm text-stone-600">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>Rs.{subtotal}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Discount {activeCoupon ? `(${activeCoupon.code})` : ''}</span>
              <span>- Rs.{discount}</span>
            </div>
            <div className="flex items-center justify-between text-lg font-semibold text-stone-900">
              <span>Total</span>
              <span>Rs.{totalPrice}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
