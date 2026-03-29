import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';

import { PageMeta, ProductCard, SectionHeading } from '../components';
import { useCart } from '../context';

const PRODUCTS_PER_PAGE = 6;

export default function Shop() {
  const { products } = useCart();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('Popularity');
  const [page, setPage] = useState(1);

  const categories = ['All', ...new Set(products.map((product) => product.category))];

  const filteredProducts = useMemo(() => {
    const filtered = products
      .filter((product) => category === 'All' || product.category === category)
      .filter((product) => {
        const haystack = `${product.name} ${product.category} ${product.description}`.toLowerCase();
        return haystack.includes(query.trim().toLowerCase());
      });

    const sorted = [...filtered].sort((left, right) => {
      if (sort === 'Price: Low to High') {
        return left.price - right.price;
      }
      if (sort === 'Price: High to Low') {
        return right.price - left.price;
      }
      if (sort === 'Newest') {
        return right.id.localeCompare(left.id);
      }
      return right.rating - left.rating;
    });

    return sorted;
  }, [category, products, query, sort]);

  const paginated = filteredProducts.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE);
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));

  return (
    <div className="page-shell">
      <PageMeta title="Shop Candles" description="Browse luxury candle collections with search, category filters, ratings, badges, and quick add to cart." />

      <section className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Shop Page"
          title="All candles, all gift sets, all customization paths in one catalog."
          description="Search by product type, filter by category, sort by price or popularity, and paginate through the full collection."
        />

        <div className="mt-10 grid gap-4 rounded-[2rem] border border-stone-200 bg-white p-5 shadow-soft lg:grid-cols-[1.2fr,0.9fr,0.7fr]">
          <label className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              className="w-full rounded-full border border-stone-200 px-11 py-3 text-sm outline-none transition focus:border-stone-400"
              placeholder="Search candles, scents, gift sets"
            />
          </label>

          <select
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
              setPage(1);
            }}
            className="rounded-full border border-stone-200 px-5 py-3 text-sm outline-none transition focus:border-stone-400"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(event) => {
              setSort(event.target.value);
              setPage(1);
            }}
            className="rounded-full border border-stone-200 px-5 py-3 text-sm outline-none transition focus:border-stone-400"
          >
            {['Popularity', 'Newest', 'Price: Low to High', 'Price: High to Low'].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <p className="mt-6 text-sm text-stone-500">
          Showing {paginated.length} of {filteredProducts.length} products
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {paginated.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {!paginated.length ? (
          <div className="mt-10 rounded-[2rem] border border-dashed border-stone-300 bg-white p-12 text-center text-stone-500">
            No candles matched your search. Clear the filters and try again.
          </div>
        ) : null}

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() => setPage(pageNumber)}
              className={`h-11 min-w-11 rounded-full px-4 text-sm transition ${pageNumber === page ? 'bg-stone-900 text-white' : 'border border-stone-200 bg-white text-stone-700'}`}
            >
              {pageNumber}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
