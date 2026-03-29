import { FormEvent, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { PageMeta, SectionHeading } from '../components';
import { useCart } from '../context';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { isAdminAuthenticated, loginAdmin } = useCart();
  const [email, setEmail] = useState('admin@anashicandles.com');
  const [password, setPassword] = useState('AnashiAdmin123');
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ok = loginAdmin(email, password);
    if (!ok) {
      setError('Invalid admin credentials.');
      return;
    }
    navigate('/admin/dashboard');
  };

  if (isAdminAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <div className="page-shell">
      <PageMeta title="Admin Login" />
      <section className="mx-auto grid max-w-5xl gap-8 px-4 lg:grid-cols-[0.95fr,1.05fr]">
        <div>
          <SectionHeading
            eyebrow="Admin Panel"
            title="Secure local admin authentication for catalog and order management."
            description="This demo uses persisted local authentication and a protected dashboard route. Default ANASHI admin credentials are prefilled."
          />
        </div>
        <form onSubmit={handleSubmit} className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-soft">
          <div className="grid gap-4">
            <input value={email} onChange={(event) => setEmail(event.target.value)} className="input-field" placeholder="Admin email" />
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="input-field" placeholder="Password" />
          </div>
          {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
          <button type="submit" className="button-primary mt-6">
            Login
          </button>
        </form>
      </section>
    </div>
  );
}
