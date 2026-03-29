import { FormEvent, useState } from 'react';

import { PageMeta, SectionHeading } from '../components';
import { useCart } from '../context';

export default function Tracking() {
  const { findOrder } = useCart();
  const [orderId, setOrderId] = useState('');
  const [message, setMessage] = useState('');
  const [result, setResult] = useState<ReturnType<typeof findOrder>>();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const order = findOrder(orderId);
    setResult(order);
    setMessage(order ? '' : 'No order matched that ID.');
  };

  return (
    <div className="page-shell">
      <PageMeta title="Track Order" description="Track a candle order using the order ID returned after checkout." />
      <section className="mx-auto max-w-5xl px-4">
        <SectionHeading
          eyebrow="Order Tracking System"
          title="Enter the order ID to view status and estimated delivery."
          description="A seeded example is available in the demo data: ANASHI-240318."
          align="center"
        />

        <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-xl rounded-[2rem] border border-stone-200 bg-white p-5 shadow-soft">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={orderId}
              onChange={(event) => setOrderId(event.target.value)}
              className="input-field flex-1"
              placeholder="Enter order ID"
            />
            <button type="submit" className="button-primary justify-center">
              Track
            </button>
          </div>
        </form>

        {message ? <p className="mt-4 text-center text-sm text-stone-500">{message}</p> : null}

        {result ? (
          <article className="mx-auto mt-10 max-w-3xl rounded-[2rem] border border-stone-200 bg-white p-8 shadow-soft">
            <p className="eyebrow">Order {result.id}</p>
            <h2 className="font-display text-4xl text-stone-900">{result.status}</h2>
            <div className="mt-6 grid gap-4 text-sm text-stone-600 md:grid-cols-2">
              <p>Customer: {result.customer.name}</p>
              <p>Payment method: {result.paymentMethod}</p>
              <p>Placed at: {new Date(result.placedAt).toLocaleDateString()}</p>
              <p>Estimated delivery: {result.estimatedDelivery}</p>
            </div>
            <div className="mt-6 rounded-[1.5rem] bg-[#f8f2ed] p-5">
              <h3 className="text-lg font-medium text-stone-900">Order items</h3>
              <div className="mt-3 space-y-2 text-sm text-stone-600">
                {result.items.map((item) => (
                  <p key={item.cartItemId}>
                    {item.quantity} x {item.name} • {item.selectedColor} • {item.selectedFragrance}
                  </p>
                ))}
              </div>
            </div>
          </article>
        ) : null}
      </section>
    </div>
  );
}
