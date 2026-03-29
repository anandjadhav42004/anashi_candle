import { brandMetrics, faqs } from '../data';
import { PageMeta, SectionHeading } from '../components';

export default function About() {
  return (
    <div className="page-shell">
      <PageMeta title="About" description="Learn the candle brand story, quality standards, gifting focus, and ordering FAQs." />
      <section className="mx-auto max-w-7xl px-4">
        <div className="grid gap-10 lg:grid-cols-[1fr,1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="About"
              title="A candle store positioned like a boutique product brand, not a generic catalog."
              description="The focus is on warm editorial visuals, handcrafted product detail, and gifting flexibility across every page."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {brandMetrics.map((metric) => (
                <article key={metric.label} className="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-soft">
                  <p className="text-sm text-stone-500">{metric.label}</p>
                  <p className="mt-2 font-display text-3xl text-stone-900">{metric.value}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="rounded-[2.5rem] bg-[#ead9cb] p-8 shadow-soft">
            <h2 className="font-display text-4xl text-stone-900">What defines the collection</h2>
            <div className="mt-6 space-y-4 text-sm leading-7 text-stone-700">
              <p>Hand-poured candle forms designed to double as decor, with warm hues that fit bedrooms, vanity tables, festive gifting, and intimate hosting setups.</p>
              <p>Customization is available at the product level, while the storefront keeps delivery timing, care notices, and stock constraints visible before checkout.</p>
              <p>The admin area manages inventory, orders, revenue visibility, and product editing without requiring a backend for this demo build.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4">
        <SectionHeading eyebrow="FAQ" title="Common buying questions" description="The answers below reflect the actual storefront flow and admin capabilities in this project." />
        <div className="mt-8 grid gap-4">
          {faqs.map((faq) => (
            <article key={faq.question} className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-soft">
              <h3 className="text-lg font-medium text-stone-900">{faq.question}</h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
