import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { PageMeta } from '../components';
import { useCart } from '../context';
import { OrderStatus, Product } from '../data';

const emptyProductForm = {
  id: '',
  slug: '',
  name: '',
  price: 0,
  compareAtPrice: 0,
  category: '',
  badge: 'New Arrival' as Product['badge'],
  description: '',
  details: 'Hand-poured in small batches',
  fragrances: 'Vanilla Bloom',
  colors: 'Buttercream',
  image: '',
  images: '',
  stock: 0,
  burnTime: '',
  deliveryEstimate: '',
  featured: false,
  gallery: true,
  customMessage: true,
  giftPackaging: true,
};

export default function AdminDashboard() {
  const { deleteProduct, isAdminAuthenticated, logoutAdmin, orders, products, saveProduct, updateOrderStatus } = useCart();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState(emptyProductForm);
  const [statusMessage, setStatusMessage] = useState('');

  const revenue = useMemo(() => orders.reduce((sum, order) => sum + order.total, 0), [orders]);

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setProductForm({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      compareAtPrice: product.compareAtPrice ?? 0,
      category: product.category,
      badge: product.badge,
      description: product.description,
      details: product.details.join(', '),
      fragrances: product.fragrances.join(', '),
      colors: product.colors.join(', '),
      image: product.image,
      images: product.images.join(', '),
      stock: product.stock,
      burnTime: product.burnTime,
      deliveryEstimate: product.deliveryEstimate,
      featured: Boolean(product.featured),
      gallery: Boolean(product.gallery),
      customMessage: product.customization?.customMessage ?? true,
      giftPackaging: product.customization?.giftPackaging ?? true,
    });
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const image = typeof reader.result === 'string' ? reader.result : '';
      setProductForm((current) => ({ ...current, image, images: current.images ? `${current.images}, ${image}` : image }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = productForm.id || productForm.name.toLowerCase().replace(/\s+/g, '-');
    const imageList = productForm.images
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    saveProduct({
      id,
      slug: productForm.slug || id,
      name: productForm.name,
      price: Number(productForm.price),
      compareAtPrice: productForm.compareAtPrice ? Number(productForm.compareAtPrice) : undefined,
      category: productForm.category,
      badge: productForm.badge,
      description: productForm.description,
      details: productForm.details.split(',').map((item) => item.trim()).filter(Boolean),
      fragrances: productForm.fragrances.split(',').map((item) => item.trim()).filter(Boolean),
      colors: productForm.colors.split(',').map((item) => item.trim()).filter(Boolean),
      image: productForm.image || imageList[0],
      images: imageList.length ? imageList : [productForm.image],
      stock: Number(productForm.stock),
      burnTime: productForm.burnTime,
      deliveryEstimate: productForm.deliveryEstimate,
      featured: productForm.featured,
      gallery: productForm.gallery,
      customization: {
        customMessage: productForm.customMessage,
        giftPackaging: productForm.giftPackaging,
      },
    });

    setStatusMessage(editingId ? 'Product updated.' : 'Product created.');
    setEditingId(null);
    setProductForm(emptyProductForm);
  };

  return (
    <div className="page-shell">
      <PageMeta title="Admin Dashboard" />
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Admin dashboard</p>
            <h1 className="font-display text-5xl text-stone-900">Store operations</h1>
          </div>
          <button type="button" onClick={logoutAdmin} className="button-secondary">
            Logout
          </button>
        </div>

        <section className="mt-10 grid gap-4 md:grid-cols-3">
          <article className="stat-card">
            <p className="text-sm text-stone-500">Products</p>
            <p className="mt-3 font-display text-4xl text-stone-900">{products.length}</p>
          </article>
          <article className="stat-card">
            <p className="text-sm text-stone-500">Orders</p>
            <p className="mt-3 font-display text-4xl text-stone-900">{orders.length}</p>
          </article>
          <article className="stat-card">
            <p className="text-sm text-stone-500">Revenue</p>
            <p className="mt-3 font-display text-4xl text-stone-900">Rs.{revenue}</p>
          </article>
        </section>

        <section className="mt-10 grid gap-8 xl:grid-cols-[0.95fr,1.05fr]">
          <form onSubmit={handleSubmit} className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-soft">
            <h2 className="font-display text-3xl text-stone-900">{editingId ? 'Edit product' : 'Add product'}</h2>
            <div className="mt-6 grid gap-4">
              <input value={productForm.name} onChange={(event) => setProductForm((current) => ({ ...current, name: event.target.value }))} className="input-field" placeholder="Product name" required />
              <div className="grid gap-4 md:grid-cols-2">
                <input value={productForm.category} onChange={(event) => setProductForm((current) => ({ ...current, category: event.target.value }))} className="input-field" placeholder="Category" required />
                <select value={productForm.badge ?? ''} onChange={(event) => setProductForm((current) => ({ ...current, badge: event.target.value as Product['badge'] }))} className="input-field">
                  {['Best Seller', 'Trending', 'New Arrival', 'Limited Edition'].map((badge) => (
                    <option key={badge} value={badge}>
                      {badge}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <input type="number" value={productForm.price} onChange={(event) => setProductForm((current) => ({ ...current, price: Number(event.target.value) }))} className="input-field" placeholder="Price" required />
                <input type="number" value={productForm.compareAtPrice} onChange={(event) => setProductForm((current) => ({ ...current, compareAtPrice: Number(event.target.value) }))} className="input-field" placeholder="Compare at price" />
              </div>
              <textarea value={productForm.description} onChange={(event) => setProductForm((current) => ({ ...current, description: event.target.value }))} className="min-h-32 rounded-[1.5rem] border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-stone-400" placeholder="Description" required />
              <input value={productForm.details} onChange={(event) => setProductForm((current) => ({ ...current, details: event.target.value }))} className="input-field" placeholder="Details, comma separated" />
              <input value={productForm.colors} onChange={(event) => setProductForm((current) => ({ ...current, colors: event.target.value }))} className="input-field" placeholder="Colors, comma separated" />
              <input value={productForm.fragrances} onChange={(event) => setProductForm((current) => ({ ...current, fragrances: event.target.value }))} className="input-field" placeholder="Fragrances, comma separated" />
              <input value={productForm.image} onChange={(event) => setProductForm((current) => ({ ...current, image: event.target.value }))} className="input-field" placeholder="Primary image URL or data URL" />
              <input value={productForm.images} onChange={(event) => setProductForm((current) => ({ ...current, images: event.target.value }))} className="input-field" placeholder="Gallery images, comma separated" />
              <input type="file" accept="image/*" onChange={handleImageUpload} className="input-field" />
              <div className="grid gap-4 md:grid-cols-3">
                <input type="number" value={productForm.stock} onChange={(event) => setProductForm((current) => ({ ...current, stock: Number(event.target.value) }))} className="input-field" placeholder="Stock" required />
                <input value={productForm.burnTime} onChange={(event) => setProductForm((current) => ({ ...current, burnTime: event.target.value }))} className="input-field" placeholder="Burn time" required />
                <input value={productForm.deliveryEstimate} onChange={(event) => setProductForm((current) => ({ ...current, deliveryEstimate: event.target.value }))} className="input-field" placeholder="Delivery estimate" required />
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-stone-700">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" checked={productForm.featured} onChange={(event) => setProductForm((current) => ({ ...current, featured: event.target.checked }))} />
                  <span>Featured</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" checked={productForm.gallery} onChange={(event) => setProductForm((current) => ({ ...current, gallery: event.target.checked }))} />
                  <span>Gallery</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" checked={productForm.customMessage} onChange={(event) => setProductForm((current) => ({ ...current, customMessage: event.target.checked }))} />
                  <span>Custom message</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" checked={productForm.giftPackaging} onChange={(event) => setProductForm((current) => ({ ...current, giftPackaging: event.target.checked }))} />
                  <span>Gift packaging</span>
                </label>
              </div>
              {statusMessage ? <p className="text-sm text-stone-500">{statusMessage}</p> : null}
              <button type="submit" className="button-primary">
                {editingId ? 'Update product' : 'Create product'}
              </button>
            </div>
          </form>

          <div className="space-y-8">
            <section className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-soft">
              <h2 className="font-display text-3xl text-stone-900">Manage products</h2>
              <div className="mt-6 space-y-4">
                {products.map((product) => (
                  <article key={product.id} className="flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] border border-stone-200 p-4">
                    <div className="flex items-center gap-4">
                      <img src={product.image} alt={product.name} className="h-20 w-20 rounded-[1rem] object-cover" />
                      <div>
                        <p className="font-medium text-stone-900">{product.name}</p>
                        <p className="text-sm text-stone-500">
                          Rs.{product.price} • {product.category} • Stock {product.stock}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button type="button" onClick={() => handleEdit(product)} className="rounded-full border border-stone-200 px-4 py-2 text-sm text-stone-700">
                        Edit
                      </button>
                      <button type="button" onClick={() => deleteProduct(product.id)} className="rounded-full border border-red-200 px-4 py-2 text-sm text-red-600">
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-soft">
              <h2 className="font-display text-3xl text-stone-900">Manage orders</h2>
              <div className="mt-6 space-y-4">
                {orders.map((order) => (
                  <article key={order.id} className="rounded-[1.5rem] border border-stone-200 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-medium text-stone-900">{order.id}</p>
                        <p className="text-sm text-stone-500">
                          {order.customer.name} • Rs.{order.total}
                        </p>
                      </div>
                      <select
                        value={order.status}
                        onChange={(event) => updateOrderStatus(order.id, event.target.value as OrderStatus)}
                        className="rounded-full border border-stone-200 px-4 py-2 text-sm outline-none"
                      >
                        {['Pending', 'Processing', 'Shipped', 'Delivered'].map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mt-3 text-sm text-stone-500">
                      {order.items.map((item) => item.name).join(', ')}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}
