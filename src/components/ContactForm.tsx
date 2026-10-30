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
    service: 'Plataforma Web d\'Autor (Next.js)',
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
        setFeedbackMessage(data.message || 'Sol·licitud transmesa correctament.');
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          service: 'Plataforma Web d\'Autor (Next.js)',
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
    <section id="contacte" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* COLUMNA ESQUERRA: INFORMACIÓ & CANALS PRIVATS */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyber-cyan inline-block mb-3">
                CANAL DE COMUNICACIÓ PRIVAT
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight leading-tight">
                Fem del teu negoci el referent indiscutible.
              </h2>
              <p className="mt-4 text-sm sm:text-base text-titanium-400 leading-relaxed">
                Estudiem cada projecte amb rigor d&apos;enginyeria. Ens asseiem amb tu a Manresa o per videotrucada per presentar-te una proposta tècnica detallada sense compromís.
              </p>
            </div>

            {/* TARGETES DE CONTACTE DIRECTE */}
            <div className="space-y-4 pt-4 border-t border-white/[0.08]">
              <div className="flex items-center gap-4 p-4 rounded-2xl glass-panel">
                <div className="w-11 h-11 rounded-xl bg-space-800 border border-white/10 flex items-center justify-center text-cyber-cyan flex-shrink-0">
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
                  <span className="text-[11px] font-mono text-titanium-400 uppercase tracking-wider block">Correu Oficial</span>
                  <a href={`mailto:${content.brand.email}`} className="text-sm font-bold text-white hover:text-cyber-cyan transition-colors">
                    {content.brand.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl glass-panel">
                <div className="w-11 h-11 rounded-xl bg-space-800 border border-white/10 flex items-center justify-center text-cyber-crimson flex-shrink-0">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-titanium-400 uppercase tracking-wider block">Instagram Oficial</span>
                  <a
                    href={content.brand.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-white hover:text-cyber-crimson transition-colors"
                  >
                    {content.brand.instagramHandle}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl glass-panel">
                <div className="w-11 h-11 rounded-xl bg-space-800 border border-white/10 flex items-center justify-center text-emerald-400 flex-shrink-0">
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
                  <span className="text-[11px] font-mono text-titanium-400 uppercase tracking-wider block">Ubicació Central</span>
                  <span className="text-sm font-bold text-white">{content.brand.location}</span>
                </div>
              </div>
            </div>

            {/* SEGELL DE SEGURETAT */}
            <div className="p-4 rounded-2xl bg-emerald-500/[0.05] border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Connexió xifrada TLS 1.3 de 256 bits. Informació estrictament protegida sota secret professional.</span>
            </div>
          </div>

          {/* COLUMNA DRETA: FORMULARI DE CONTACTE D'ALTA PRECISIÓ */}
          <div className="lg:col-span-7 glass-panel-glow rounded-3xl p-8 sm:p-10 shadow-2xl relative">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* HONEYPOT INVISIBLE */}
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
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-titanium-300 mb-2">
                    Nom i Cognoms *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="ex. Jordi Prat"
                    className="w-full px-4 py-3.5 rounded-xl bg-space-800 border border-white/10 text-white placeholder-titanium-500 text-sm focus:border-cyber-cyan focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-titanium-300 mb-2">
                    Empresa o Marca
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="ex. Prat Transports SL"
                    className="w-full px-4 py-3.5 rounded-xl bg-space-800 border border-white/10 text-white placeholder-titanium-500 text-sm focus:border-cyber-cyan focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-titanium-300 mb-2">
                    Correu electrònic professional *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jordi@prat.cat"
                    className="w-full px-4 py-3.5 rounded-xl bg-space-800 border border-white/10 text-white placeholder-titanium-500 text-sm focus:border-cyber-cyan focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-titanium-300 mb-2">
                    Telèfon mòbil (WhatsApp)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+34 600 000 000"
                    className="w-full px-4 py-3.5 rounded-xl bg-space-800 border border-white/10 text-white placeholder-titanium-500 text-sm focus:border-cyber-cyan focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-titanium-300 mb-2">
                    Servei d&apos;interès
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-space-800 border border-white/10 text-white text-sm focus:border-cyber-cyan focus:outline-none transition-colors"
                  >
                    <option value="Plataforma Web d'Autor (Next.js)">Plataforma Web d&apos;Autor (Next.js)</option>
                    <option value="Automatització WhatsApp & CRM">Automatització WhatsApp & CRM</option>
                    <option value="Direcció d'Imatge & Xarxes">Direcció d&apos;Imatge & Xarxes</option>
                    <option value="Domini Local Google & SEO">Domini Local Google & SEO</option>
                    <option value="Projecte Integral 360">Projecte Integral 360</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-titanium-300 mb-2">
                    Pressupost aproximat
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-space-800 border border-white/10 text-white text-sm focus:border-cyber-cyan focus:outline-none transition-colors"
                  >
                    <option value="500 € - 1.000 €">500 € - 1.000 € (Inici d&apos;activitat)</option>
                    <option value="1.000 € - 3.000 €">1.000 € - 3.000 € (Corporatiu)</option>
                    <option value="> 3.000 €">&gt; 3.000 € (Alta Personalització)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-titanium-300 mb-2">
                  Descripció del projecte *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Explica&apos;ns quins objectius comercials vols assolir i quins terminis tens previstos..."
                  className="w-full px-4 py-3.5 rounded-xl bg-space-800 border border-white/10 text-white placeholder-titanium-500 text-sm focus:border-cyber-cyan focus:outline-none transition-colors"
                />
              </div>

              {/* FEEDBACK STATUS */}
              {status === 'success' && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm">
                  {feedbackMessage}
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 rounded-xl bg-cyber-crimson/10 border border-cyber-crimson/30 text-cyber-crimson text-sm">
                  {feedbackMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-cyber-crimson via-cyber-coral to-cyber-amber hover:brightness-110 active:scale-95 transition-all shadow-[0_10px_35px_rgba(255,30,86,0.35)] disabled:opacity-50 cursor-pointer"
              >
                {status === 'loading' ? 'Xifrant i transmetent dades...' : 'Enviar Sol·licitud Confidencial'}
              </button>

              <p className="text-center text-[11px] font-mono text-titanium-400">
                En enviar el formulari acceptes la nostra{' '}
                <a href="/politica-privacidad" className="underline hover:text-white">
                  Política de Privacitat
                </a>{' '}
                sota estricta protecció RGPD.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
