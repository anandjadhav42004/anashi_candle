import { Instagram, MessageCircle } from 'lucide-react';

import { instagramUrl, whatsappNumber } from '../data';

const whatsappMessage = encodeURIComponent('Hi, I want to order candles.');

export default function FloatingContactButtons() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      <a
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noreferrer"
        className="floating-action bg-[#25D366] text-white"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={20} />
      </a>
      <a
        href={instagramUrl}
        target="_blank"
        rel="noreferrer"
        className="floating-action bg-stone-900 text-white"
        aria-label="Open Instagram"
      >
        <Instagram size={20} />
      </a>
    </div>
  );
}
