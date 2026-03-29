import { useEffect } from 'react';

import { brandName, brandTagline } from '../data';

interface PageMetaProps {
  title: string;
  description?: string;
}

export default function PageMeta({ title, description }: PageMetaProps) {
  useEffect(() => {
    document.title = `${title} | ${brandName}`;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description ?? brandTagline);
      return;
    }

    const meta = document.createElement('meta');
    meta.name = 'description';
    meta.content = description ?? brandTagline;
    document.head.appendChild(meta);
  }, [description, title]);

  return null;
}
