import { FormEvent, useState } from 'react';
import { Instagram, Mail, MessageCircle, Phone } from 'lucide-react';

import { PageMeta, SectionHeading } from '../components';
import { contactEmail, instagramUrl, supportPhone, whatsappNumber } from '../data';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inquiry = [
      'Hi, I have an inquiry for ANASHI CANDLES.',
      '',
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone || 'Not provided'}`,
      '',
      'Message:',
      form.message || 'No message provided',
    ].join('\n');

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(inquiry)}`;
    const mailtoUrl = `mailto:${contactEmail}?subject=${encodeURIComponent(`ANASHI CANDLES Inquiry from ${form.name}`)}&body=${encodeURIComponent(inquiry)}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    window.open(mailtoUrl, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <div className="page-shell">
      <PageMeta title="Contact" description="Contact the candle store through WhatsApp, Instagram, phone, or email." />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[0.95fr,1.05fr]">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Direct support links for product questions, custom orders, and gifting help."
            description="Customers can inquire through WhatsApp, Instagram, email, or phone, with all touchpoints available on mobile and desktop."
          />
          <div className="mt-8 grid gap-4">
            <a href={`mailto:${contactEmail}`} className="contact-card">
              <Mail size={18} />
              <span>{contactEmail}</span>
            </a>
            <a href={`tel:${supportPhone}`} className="contact-card">
              <Phone size={18} />
              <span>{supportPhone}</span>
            </a>
            <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi, I want to order candles.')}`} target="_blank" rel="noreferrer" className="contact-card">
              <MessageCircle size={18} />
              <span>WhatsApp support</span>
            </a>
            <a href={instagramUrl} target="_blank" rel="noreferrer" className="contact-card">
              <Instagram size={18} />
              <span>Instagram profile</span>
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-soft">
          <h2 className="font-display text-4xl text-stone-900">Send an inquiry</h2>
          <div className="mt-6 grid gap-4">
            <input
              className="input-field"
              placeholder="Your name"
              required
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            />
            <input
              className="input-field"
              type="email"
              placeholder="Email address"
              required
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            />
            <input
              className="input-field"
              placeholder="Phone number"
              value={form.phone}
              onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
            />
            <textarea
              className="min-h-40 rounded-[1.5rem] border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-stone-400"
              placeholder="Order query, custom request, or gifting brief"
              value={form.message}
              onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
              required
            />
          </div>
          <button type="submit" className="button-primary mt-6">
            Send on WhatsApp and Email
          </button>
          {submitted ? <p className="mt-4 text-sm text-stone-500">WhatsApp and email opened in separate tabs or apps. This page stays open so you can keep browsing.</p> : null}
        </form>
      </section>
    </div>
  );
}
