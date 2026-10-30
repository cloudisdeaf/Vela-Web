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
    service: 'Plataforma Web d\'Autor',
    budget: '1.000 € - 3.000 €',
    message: '',
    website_url_check: '', // Honeypot anti-spam
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
        setFeedbackMessage(data.message || 'Sol·licitud rebuda amb èxit.');
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          service: 'Plataforma Web d\'Autor',
          budget: '1.000 € - 3.000 €',
          message: '',
          website_url_check: '',
        });
      } else {
        setStatus('error');
        setFeedbackMessage(data.error || 'Hi ha hagut un problema al validar les dades.');
      }
    } catch {
      setStatus('error');
      setFeedbackMessage('Error de xarxa. Si us plau, contacta directament a velamanresa@gmail.com');
    }
  };

  return (
    <section id="contacte" className="py-24 sm:py-32 relative bg-vela-dark/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* COLUMNA ESQUERRA: INFORMACIÓ & AUTORITAT */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-vela-gold inline-block mb-3">
                CONTACTE PRIVAT & CONFIDENCIAL
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight leading-tight">
                Fem del teu negoci el referent digital que mereix ser.
              </h2>
              <p className="mt-4 text-base text-vela-text leading-relaxed">
                Estudiem cada petició amb rigor tècnic. Ens asseiem amb tu a Manresa o per videotrucada per presentar-te una proposta d&apos;acció detallada sense compromís.
              </p>
            </div>

            {/* DADES DIRECTES DE CONTACTE */}
            <div className="space-y-4 pt-6 border-t border-white/[0.08]">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-vela-card border border-white/10 flex items-center justify-center text-vela-gold flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="text-xs text-vela-muted uppercase tracking-wider block">Correu Oficial</span>
                  <a href={`mailto:${content.brand.email}`} className="text-sm font-semibold text-white hover:text-vela-gold transition-colors">
                    {content.brand.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-vela-card border border-white/10 flex items-center justify-center text-vela-red flex-shrink-0">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs text-vela-muted uppercase tracking-wider block">Canal Instagram</span>
                  <a
                    href={content.brand.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-white hover:text-vela-red transition-colors"
                  >
                    {content.brand.instagramHandle}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-vela-card border border-white/10 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs text-vela-muted uppercase tracking-wider block">Ubicació Central</span>
                  <span className="text-sm font-semibold text-white">{content.brand.location}</span>
                </div>
              </div>
            </div>

            {/* SEGURETAT DE DADES */}
            <div className="p-4 rounded-xl bg-emerald-500/[0.05] border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Connexió xifrada TLS de 256 bits. Informació estrictament protegida pel deure de secret empresarial.</span>
            </div>
          </div>

          {/* COLUMNA DRETA: FORMULARI BLINDAT */}
          <div className="lg:col-span-7 bg-vela-card/90 rounded-2xl p-8 sm:p-10 border border-white/[0.08] shadow-2xl relative">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* HONEYPOT INVISIBLE PER A BOTS */}
              <input
                type="text"
                name="website_url_check"
                value={formData.website_url_check}
                onChange={(e) => setFormData({ ...formData, website_url_check: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                    Nom i Cognoms *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="ex. Jordi Vila"
                    className="w-full px-4 py-3 rounded-xl bg-vela-dark border border-white/10 text-white placeholder-vela-muted text-sm focus:border-vela-gold focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                    Empresa o Marca
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="ex. Vila Transports SL"
                    className="w-full px-4 py-3 rounded-xl bg-vela-dark border border-white/10 text-white placeholder-vela-muted text-sm focus:border-vela-gold focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                    Correu electrònic professional *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jordi@empresa.cat"
                    className="w-full px-4 py-3 rounded-xl bg-vela-dark border border-white/10 text-white placeholder-vela-muted text-sm focus:border-vela-gold focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                    Telèfon mòbil (per a WhatsApp)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+34 600 000 000"
                    className="w-full px-4 py-3 rounded-xl bg-vela-dark border border-white/10 text-white placeholder-vela-muted text-sm focus:border-vela-gold focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                    Servei principal d&apos;interès
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-vela-dark border border-white/10 text-white text-sm focus:border-vela-gold focus:outline-none transition-colors"
                  >
                    <option value="Plataforma Web d'Autor">Plataforma Web d&apos;Autor</option>
                    <option value="Automatització WhatsApp">Automatització WhatsApp & CRM</option>
                    <option value="Direcció d'Imatge & Xarxes">Direcció d&apos;Imatge & Xarxes</option>
                    <option value="Domini Local Google & SEO">Domini Local Google & SEO</option>
                    <option value="Projecte Integral 360">Projecte Integral 360</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                    Pressupost estimat
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-vela-dark border border-white/10 text-white text-sm focus:border-vela-gold focus:outline-none transition-colors"
                  >
                    <option value="500 € - 1.000 €">500 € - 1.000 € (Inici)</option>
                    <option value="1.000 € - 3.000 €">1.000 € - 3.000 € (Corporatiu)</option>
                    <option value="> 3.000 €">&gt; 3.000 € (Alta Personalització)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                  Objectiu del projecte *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Explica&apos;ns què necessita el teu negoci i quins terminis tens en ment..."
                  className="w-full px-4 py-3 rounded-xl bg-vela-dark border border-white/10 text-white placeholder-vela-muted text-sm focus:border-vela-gold focus:outline-none transition-colors"
                />
              </div>

              {/* FEEDBACK STATUS */}
              {status === 'success' && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm">
                  {feedbackMessage}
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 rounded-xl bg-vela-red/10 border border-vela-red/30 text-vela-red text-sm">
                  {feedbackMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 rounded-xl text-base font-bold text-black bg-gradient-to-r from-vela-gold via-amber-400 to-yellow-300 hover:brightness-110 active:scale-95 transition-all shadow-xl disabled:opacity-50 cursor-pointer"
              >
                {status === 'loading' ? 'Transmetent dades segures...' : 'Enviar Sol·licitud Confidencial'}
              </button>

              <p className="text-center text-[11px] text-vela-muted">
                En enviar aquest formulari acceptes la nostra{' '}
                <a href="/politica-privacidad" className="underline hover:text-white">
                  Política de Privacitat
                </a>{' '}
                i el tractament de dades amb finalitat de contacte comercial.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
