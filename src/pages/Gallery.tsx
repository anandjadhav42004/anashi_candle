import { useState } from 'react';
import { X } from 'lucide-react';

import { PageMeta, SectionHeading } from '../components';
import { galleryImages } from '../data';

export default function Gallery() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeImage = galleryImages.find((image) => image.id === activeId);

  return (
    <div className="page-shell">
      <PageMeta title="Gallery" description="Browse an aesthetic candle photo gallery with a responsive grid and lightbox preview." />
      <section className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Gallery Page"
          title="A responsive candle grid with lightbox-style preview."
          description="All images are lazily loaded and built from the actual product library used across the storefront."
        />
        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {galleryImages.map((image) => (
            <button key={image.id} type="button" className="mb-4 block w-full overflow-hidden rounded-[2rem]" onClick={() => setActiveId(image.id)}>
              <img src={image.image} alt={image.alt} loading="lazy" className="w-full object-cover transition duration-500 hover:scale-105" />
            </button>
          ))}
        </div>
      </section>

      {activeImage ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/90 px-4">
          <div className="relative max-w-4xl">
            <button type="button" className="icon-button absolute right-4 top-4 z-10 bg-white/90" onClick={() => setActiveId(null)}>
              <X size={18} />
            </button>
            <img src={activeImage.image} alt={activeImage.alt} className="max-h-[85vh] rounded-[2rem] object-contain" />
            <p className="mt-4 text-center text-sm text-stone-200">{activeImage.caption}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
