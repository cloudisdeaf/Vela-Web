'use client';

import React, { useState } from 'react';
import { SiteContent } from '@/lib/types';

interface ContactFormProps {
  content: SiteContent;
}

export const ContactForm: React.FC<ContactFormProps> = ({ content }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: 'Plataformes Web d\'Autor',
    budget: '1.000 € - 3.000 €',
    message: '',
    website_url_check: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setFeedbackMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setFeedbackMessage(data.message || 'Sol·licitud rebuda. Contactarem en menys de 24 hores.');
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          service: 'Plataformes Web d\'Autor',
          budget: '1.000 € - 3.000 €',
          message: '',
          website_url_check: '',
        });
      } else {
        setStatus('error');
        setFeedbackMessage(data.error || 'Hi ha hagut un problema amb el formulari.');
      }
    } catch {
      setStatus('error');
      setFeedbackMessage('Error de xarxa. Pots escriure directament a velamanresa@gmail.com');
    }
  };

  return (
    <section id="contacte" className="py-24 sm:py-36 md:py-40 bg-noir-950/80 border-t border-white/[0.08] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-ferrari-red block mb-3 font-bold">
                INICIAR CONVERSA
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white font-display text-headline">
                Fem quelcom d&apos;extraordinari.
              </h2>
              <p className="mt-4 text-sm sm:text-base text-apple-muted leading-relaxed">
                Estudiem cada sol·licitud amb rigor. Ens reunim amb tu a Manresa o per videoconferència per dissenyar una proposta a mida.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/[0.08] text-xs font-mono text-apple-muted">
              <div>
                <span className="block text-[10px] uppercase text-apple-dark">Correu Oficial</span>
                <a href={`mailto:${content.brand.email}`} className="text-white hover:text-ferrari-red transition-colors text-sm font-sans font-semibold">
                  {content.brand.email}
                </a>
              </div>
              <div>
                <span className="block text-[10px] uppercase text-apple-dark">Canal d&apos;Instagram</span>
                <a href={content.brand.instagram} target="_blank" rel="noopener noreferrer" className="text-white hover:text-ferrari-red transition-colors text-sm font-sans font-semibold">
                  {content.brand.instagramHandle}
                </a>
              </div>
              <div>
                <span className="block text-[10px] uppercase text-apple-dark">Seu Central</span>
                <span className="text-white text-sm font-sans font-semibold">{content.brand.location}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 luxury-card rounded-3xl p-6 sm:p-10 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="website_url_check"
                value={formData.website_url_check}
                onChange={(e) => setFormData({ ...formData, website_url_check: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs font-mono text-apple-muted uppercase tracking-wider mb-2">
                    Nom i Cognoms *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Marc Vila"
                    className="w-full px-4 py-3.5 rounded-xl bg-noir-900 border border-white/10 text-white placeholder-apple-dark text-sm focus:border-ferrari-red focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-apple-muted uppercase tracking-wider mb-2">
                    Empresa
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Vila & Co."
                    className="w-full px-4 py-3.5 rounded-xl bg-noir-900 border border-white/10 text-white placeholder-apple-dark text-sm focus:border-ferrari-red focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs font-mono text-apple-muted uppercase tracking-wider mb-2">
                    Correu electrònic *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="marc@empresa.cat"
                    className="w-full px-4 py-3.5 rounded-xl bg-noir-900 border border-white/10 text-white placeholder-apple-dark text-sm focus:border-ferrari-red focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-apple-muted uppercase tracking-wider mb-2">
                    Telèfon (WhatsApp)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+34 600 000 000"
                    className="w-full px-4 py-3.5 rounded-xl bg-noir-900 border border-white/10 text-white placeholder-apple-dark text-sm focus:border-ferrari-red focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-apple-muted uppercase tracking-wider mb-2">
                  Disciplina d&apos;interès
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-noir-900 border border-white/10 text-white text-sm focus:border-ferrari-red focus:outline-none transition-colors"
                >
                  <option value="Plataformes Web d'Autor">Plataformes Web d&apos;Autor (Next.js)</option>
                  <option value="Automatització WhatsApp">Automatització & Bots WhatsApp</option>
                  <option value="Direcció d'Imatge">Direcció d&apos;Imatge & Xarxes</option>
                  <option value="Domini Local Google & SEO">Domini Local Google & SEO</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-apple-muted uppercase tracking-wider mb-2">
                  Objectiu del projecte *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Explica'ns què necessita el teu negoci i quins terminis tens previstos..."
                  className="w-full px-4 py-3.5 rounded-xl bg-noir-900 border border-white/10 text-white placeholder-apple-dark text-sm focus:border-ferrari-red focus:outline-none transition-colors"
                />
              </div>

              {status === 'success' && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
                  {feedbackMessage}
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 rounded-xl bg-ferrari-red/10 border border-ferrari-red/20 text-ferrari-red text-xs">
                  {feedbackMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 rounded-full text-xs font-bold uppercase tracking-wider text-white btn-ferrari-glow disabled:opacity-50 cursor-pointer"
              >
                {status === 'loading' ? 'Enviant dades xifrades...' : 'Enviar Sol·licitud Confidencial'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
