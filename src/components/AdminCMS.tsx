'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SiteContent } from '@/lib/types';
import { defaultSiteContent } from '@/lib/content';

export const AdminCMS: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [activeTab, setActiveTab] = useState<'brand' | 'hero' | 'services' | 'security' | 'portfolio' | 'testimonials'>('brand');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const savedKey = localStorage.getItem('vela_admin_token');
    if (savedKey) {
      setPasscode(savedKey);
      setIsAuthenticated(true);
    }

    fetch('/api/content')
      .then((r) => r.json())
      .then((data) => {
        if (data && data.brand) {
          setContent(data);
        }
      })
      .catch(() => {});
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode) {
      setAuthError('Introdueix la clau mestra d\'accés.');
      return;
    }
    localStorage.setItem('vela_admin_token', passcode);
    setIsAuthenticated(true);
    setAuthError('');
  };

  const handleSaveToProduction = async () => {
    setSaveStatus('saving');
    setStatusMessage('');

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${passcode}`,
        },
        body: JSON.stringify(content),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSaveStatus('saved');
        setStatusMessage(data.message || 'Contingut publicat amb èxit a producció!');
        setTimeout(() => setSaveStatus('idle'), 4000);
      } else {
        setSaveStatus('error');
        setStatusMessage(data.error || 'Error d\'autenticació o desat.');
      }
    } catch {
      setSaveStatus('error');
      setStatusMessage('Error de connexió en contactar amb el servidor.');
    }
  };

  const handleResetDefaults = () => {
    if (confirm('Vols restablir el contingut original de disseny VELA?')) {
      setContent(defaultSiteContent);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-noir-950 flex items-center justify-center p-6 relative overflow-hidden spotlight-red">
        <div className="w-full max-w-md p-10 rounded-3xl bg-noir-900 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] text-center space-y-8 relative z-10">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-noir-850 border border-white/10 mx-auto p-1">
            <Image src="/logo.png" alt="VELA" fill className="object-contain p-1" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[10px] font-mono text-apple-silver uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-ferrari-red animate-pulse"></span>
              PORTAL PRIVAT D&apos;AUTOR
            </div>
            <h1 className="text-2xl font-black text-white font-display text-apple-headline">
              VELA CMS Studio
            </h1>
            <p className="text-xs text-apple-muted mt-2 leading-relaxed">
              Editor visual en viu per a la gestió autònoma de la presència digital.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono text-apple-muted uppercase tracking-wider mb-2 text-left">
                Clau d&apos;accés mestra
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="vela2026admin"
                className="w-full px-4 py-3.5 rounded-xl bg-noir-850 border border-white/10 text-white placeholder-apple-dark text-sm text-center focus:border-white focus:outline-none transition-colors font-mono"
              />
              {authError && <p className="text-xs text-ferrari-red mt-2">{authError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-ferrari-red hover:bg-ferrari-dark active:scale-95 transition-all shadow-[0_0_25px_rgba(225,6,0,0.3)] cursor-pointer"
            >
              Desbloquejar Editor Visual
            </button>
          </form>

          <div className="pt-2 border-t border-white/[0.06]">
            <Link href="/" className="text-xs font-mono text-apple-muted hover:text-white transition-colors">
              ← Tornar al portal públic
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-noir-950 text-white flex flex-col font-sans">
      {/* BARRA SUPERIOR D'ADMINISTRACIÓ STUDIO */}
      <header className="h-16 border-b border-white/10 bg-noir-900/95 backdrop-blur-2xl px-6 flex items-center justify-between z-40 sticky top-0">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-7 h-7 rounded-lg overflow-hidden bg-noir-850 border border-white/10">
              <Image src="/logo.png" alt="VELA" fill className="object-contain p-0.5" />
            </div>
            <span className="font-extrabold text-base text-white font-display">VELA* Studio</span>
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest px-2 py-0.5 rounded-full bg-white/[0.06] text-apple-silver border border-white/10">
              Editor Visual
            </span>
          </Link>

          {/* DISPOSITIUS RESPONSIVE VIEWPORT */}
          <div className="hidden md:flex items-center gap-1 bg-noir-850 rounded-full p-1 border border-white/10 text-xs font-mono">
            <button
              onClick={() => setPreviewDevice('desktop')}
              className={`px-3 py-1 rounded-full transition-all ${
                previewDevice === 'desktop' ? 'bg-white/15 text-white font-bold' : 'text-apple-muted hover:text-white'
              }`}
            >
              Escriptori
            </button>
            <button
              onClick={() => setPreviewDevice('tablet')}
              className={`px-3 py-1 rounded-full transition-all ${
                previewDevice === 'tablet' ? 'bg-white/15 text-white font-bold' : 'text-apple-muted hover:text-white'
              }`}
            >
              Tauleta
            </button>
            <button
              onClick={() => setPreviewDevice('mobile')}
              className={`px-3 py-1 rounded-full transition-all ${
                previewDevice === 'mobile' ? 'bg-white/15 text-white font-bold' : 'text-apple-muted hover:text-white'
              }`}
            >
              Mòbil
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="text-xs font-mono text-apple-muted hover:text-white px-3 py-1.5 transition-colors hidden sm:block"
          >
            Veure web ↗
          </Link>

          <button
            onClick={handleResetDefaults}
            className="text-xs font-mono text-apple-muted hover:text-ferrari-red px-3 py-1.5 transition-colors cursor-pointer"
          >
            Restablir
          </button>

          <button
            onClick={handleSaveToProduction}
            disabled={saveStatus === 'saving'}
            className="px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-ferrari-red hover:bg-ferrari-dark active:scale-95 transition-all shadow-[0_0_20px_rgba(225,6,0,0.3)] flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{saveStatus === 'saving' ? 'Publicant...' : 'Publicar a Producció'}</span>
          </button>

          <button
            onClick={() => {
              localStorage.removeItem('vela_admin_token');
              setIsAuthenticated(false);
            }}
            className="text-xs text-apple-muted hover:text-white p-2"
            title="Tancar sessió"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </header>

      {/* MISSATGE DE RETORN DE L'ESTAT */}
      {statusMessage && (
        <div
          className={`py-2 px-4 text-center text-xs font-mono font-bold animate-fade-in ${
            saveStatus === 'saved'
              ? 'bg-emerald-500/20 text-emerald-400 border-b border-emerald-500/30'
              : 'bg-ferrari-red/20 text-ferrari-red border-b border-ferrari-red/30'
          }`}
        >
          {statusMessage}
        </div>
      )}

      {/* INTERFÍCIE DIVIDIDA (SPLIT-VIEW CMS ESTIL FIGMA/CANVA) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* COLUMNA ESQUERRA: CONTROLS DE MODIFICACIÓ */}
        <div className="lg:col-span-5 border-r border-white/10 bg-noir-900/90 flex flex-col h-[calc(100vh-4rem)] overflow-y-auto">
          {/* PESTANYES D'EDICIÓ */}
          <div className="flex border-b border-white/10 bg-noir-950 text-xs font-mono overflow-x-auto scrollbar-none sticky top-0 z-20">
            {[
              { id: 'brand', label: '1. Marca' },
              { id: 'hero', label: '2. Portada' },
              { id: 'services', label: '3. Serveis' },
              { id: 'security', label: '4. Seguretat' },
              { id: 'portfolio', label: '5. Obra' },
              { id: 'testimonials', label: '6. Testimonis' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-3 font-semibold whitespace-nowrap transition-colors border-b-2 cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-ferrari-red text-white bg-noir-850'
                    : 'border-transparent text-apple-muted hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6 space-y-6 text-sm">
            {activeTab === 'brand' && (
              <div className="space-y-4">
                <h3 className="font-bold text-white text-base font-display">Identitat Corporativa</h3>

                <div>
                  <label className="block text-xs font-mono text-apple-muted uppercase mb-1">Ruta o URL del Logo</label>
                  <input
                    type="text"
                    value={content.brand.logoUrl}
                    onChange={(e) => setContent({ ...content, brand: { ...content.brand, logoUrl: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-noir-850 rounded-xl border border-white/10 text-white text-xs focus:border-white focus:outline-none"
                  />
                  <p className="text-[11px] text-apple-dark mt-1 font-mono">Per defecte: /logo.png (logo oficial vermell amb tipografia groga)</p>
                </div>

                <div>
                  <label className="block text-xs font-mono text-apple-muted uppercase mb-1">Nom Comercial</label>
                  <input
                    type="text"
                    value={content.brand.name}
                    onChange={(e) => setContent({ ...content, brand: { ...content.brand, name: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-noir-850 rounded-xl border border-white/10 text-white text-xs focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-apple-muted uppercase mb-1">Email Oficial de Contacte</label>
                  <input
                    type="email"
                    value={content.brand.email}
                    onChange={(e) => setContent({ ...content, brand: { ...content.brand, email: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-noir-850 rounded-xl border border-white/10 text-white text-xs focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-apple-muted uppercase mb-1">Handle d&apos;Instagram</label>
                  <input
                    type="text"
                    value={content.brand.instagramHandle}
                    onChange={(e) => setContent({ ...content, brand: { ...content.brand, instagramHandle: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-noir-850 rounded-xl border border-white/10 text-white text-xs focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-apple-muted uppercase mb-1">Ubicació Geogràfica</label>
                  <input
                    type="text"
                    value={content.brand.location}
                    onChange={(e) => setContent({ ...content, brand: { ...content.brand, location: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-noir-850 rounded-xl border border-white/10 text-white text-xs focus:border-white focus:outline-none"
                  />
                </div>
              </div>
            )}

            {activeTab === 'hero' && (
              <div className="space-y-4">
                <h3 className="font-bold text-white text-base font-display">Portada & Titulars</h3>

                <div>
                  <label className="block text-xs font-mono text-apple-muted uppercase mb-1">Insígnia Superior</label>
                  <input
                    type="text"
                    value={content.hero.badge}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, badge: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-noir-850 rounded-xl border border-white/10 text-white text-xs focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-apple-muted uppercase mb-1">Titular (Part 1)</label>
                  <input
                    type="text"
                    value={content.hero.headlinePart1}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, headlinePart1: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-noir-850 rounded-xl border border-white/10 text-white text-xs focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-apple-muted uppercase mb-1">Paraula Clau Destacada</label>
                  <input
                    type="text"
                    value={content.hero.headlineHighlight}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, headlineHighlight: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-noir-850 rounded-xl border border-white/10 text-white text-xs focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-apple-muted uppercase mb-1">Subtitular Explicatiu</label>
                  <textarea
                    rows={4}
                    value={content.hero.subheadline}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, subheadline: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-noir-850 rounded-xl border border-white/10 text-white text-xs focus:border-white focus:outline-none"
                  />
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-6">
                <h3 className="font-bold text-white text-base font-display">Serveis & Tarifes</h3>
                {content.services.map((srv, index) => (
                  <div key={srv.id} className="p-5 rounded-2xl bg-noir-850 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-apple-muted uppercase">Servei 0{index + 1}</span>
                      <input
                        type="text"
                        value={srv.price}
                        onChange={(e) => {
                          const updated = [...content.services];
                          updated[index].price = e.target.value;
                          setContent({ ...content, services: updated });
                        }}
                        className="px-2.5 py-1 bg-noir-900 rounded-lg border border-white/10 text-apple-silver text-xs font-mono text-right"
                      />
                    </div>

                    <input
                      type="text"
                      value={srv.title}
                      onChange={(e) => {
                        const updated = [...content.services];
                        updated[index].title = e.target.value;
                        setContent({ ...content, services: updated });
                      }}
                      className="w-full px-3 py-2 bg-noir-900 rounded-lg border border-white/10 text-white text-xs font-bold font-display"
                    />

                    <textarea
                      rows={2}
                      value={srv.description}
                      onChange={(e) => {
                        const updated = [...content.services];
                        updated[index].description = e.target.value;
                        setContent({ ...content, services: updated });
                      }}
                      className="w-full px-3 py-2 bg-noir-900 rounded-lg border border-white/10 text-apple-muted text-xs"
                    />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-4">
                <h3 className="font-bold text-white text-base font-display">Seguretat & Protocols</h3>
                {content.securityGuarantee.points.map((pt, index) => (
                  <div key={index} className="p-4 rounded-2xl bg-noir-850 border border-white/10 space-y-2">
                    <span className="text-[10px] font-mono text-apple-muted">Protocol 0{index + 1}</span>
                    <input
                      type="text"
                      value={pt.title}
                      onChange={(e) => {
                        const updated = [...content.securityGuarantee.points];
                        updated[index].title = e.target.value;
                        setContent({
                          ...content,
                          securityGuarantee: { ...content.securityGuarantee, points: updated },
                        });
                      }}
                      className="w-full px-3 py-1.5 bg-noir-900 rounded-lg border border-white/10 text-white text-xs font-bold"
                    />
                    <textarea
                      rows={2}
                      value={pt.description}
                      onChange={(e) => {
                        const updated = [...content.securityGuarantee.points];
                        updated[index].description = e.target.value;
                        setContent({
                          ...content,
                          securityGuarantee: { ...content.securityGuarantee, points: updated },
                        });
                      }}
                      className="w-full px-3 py-1.5 bg-noir-900 rounded-lg border border-white/10 text-apple-muted text-xs"
                    />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'portfolio' && (
              <div className="space-y-4">
                <h3 className="font-bold text-white text-base font-display">Projectes Destacats</h3>
                {content.portfolio.map((p, index) => (
                  <div key={p.id} className="p-4 rounded-2xl bg-noir-850 border border-white/10 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-apple-muted">Cas 0{index + 1}</span>
                      <input
                        type="text"
                        value={p.metric}
                        onChange={(e) => {
                          const updated = [...content.portfolio];
                          updated[index].metric = e.target.value;
                          setContent({ ...content, portfolio: updated });
                        }}
                        className="px-2 py-1 bg-noir-900 rounded border border-white/10 text-ferrari-red text-xs font-mono font-semibold text-right"
                      />
                    </div>
                    <input
                      type="text"
                      value={p.title}
                      onChange={(e) => {
                        const updated = [...content.portfolio];
                        updated[index].title = e.target.value;
                        setContent({ ...content, portfolio: updated });
                      }}
                      className="w-full px-3 py-1.5 bg-noir-900 rounded-lg border border-white/10 text-white text-xs font-bold"
                    />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'testimonials' && (
              <div className="space-y-4">
                <h3 className="font-bold text-white text-base font-display">Testimonis & Avals</h3>
                {content.testimonials.map((t, index) => (
                  <div key={index} className="p-4 rounded-2xl bg-noir-850 border border-white/10 space-y-2">
                    <input
                      type="text"
                      value={t.author}
                      onChange={(e) => {
                        const updated = [...content.testimonials];
                        updated[index].author = e.target.value;
                        setContent({ ...content, testimonials: updated });
                      }}
                      className="w-full px-3 py-1.5 bg-noir-900 rounded-lg border border-white/10 text-white text-xs font-bold"
                    />
                    <textarea
                      rows={2}
                      value={t.quote}
                      onChange={(e) => {
                        const updated = [...content.testimonials];
                        updated[index].quote = e.target.value;
                        setContent({ ...content, testimonials: updated });
                      }}
                      className="w-full px-3 py-1.5 bg-noir-900 rounded-lg border border-white/10 text-apple-muted text-xs italic"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* COLUMNA DRETA: CANVAS DE PREVISUALITZACIÓ EN VIU (ESTIL CANVA) */}
        <div className="lg:col-span-7 bg-noir-950 flex flex-col items-center justify-center p-6 lg:p-10 overflow-y-auto">
          <div
            className={`transition-all duration-300 bg-noir-950 rounded-3xl border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden overflow-y-auto flex flex-col ${
              previewDevice === 'mobile'
                ? 'w-[375px] h-[720px]'
                : previewDevice === 'tablet'
                ? 'w-[720px] h-[780px]'
                : 'w-full h-full max-h-[850px]'
            }`}
          >
            {/* HERO PREVIEW */}
            <div className="p-10 text-center border-b border-white/[0.08] relative overflow-hidden spotlight-red">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 mx-auto mb-6 bg-noir-850 relative p-1">
                {content.brand.logoUrl ? (
                  <Image src={content.brand.logoUrl} alt="Logo" fill className="object-contain p-1" />
                ) : (
                  <div className="w-full h-full bg-ferrari-red text-white font-bold flex items-center justify-center text-xs">V*</div>
                )}
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-noir-900 border border-white/10 text-[10px] font-mono tracking-widest text-apple-silver uppercase mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-ferrari-red"></span>
                <span>{content.hero.badge}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white font-display text-apple-headline">
                {content.hero.headlinePart1}{' '}
                <span className="text-apple-silver">{content.hero.headlineHighlight}</span>
              </h2>

              <p className="text-xs sm:text-sm text-apple-muted mt-4 max-w-lg mx-auto line-clamp-3 leading-relaxed">
                {content.hero.subheadline}
              </p>

              <div className="mt-6 inline-flex px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-ferrari-red shadow-[0_0_20px_rgba(225,6,0,0.3)]">
                {content.hero.ctaPrimary}
              </div>
            </div>

            {/* SERVICES PREVIEW */}
            <div className="p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <span className="text-xs font-mono uppercase tracking-widest text-apple-muted">
                  Capacitats d&apos;Enginyeria
                </span>
                <span className="text-xs font-mono text-apple-silver">
                  {content.services.length} Disciplines
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {content.services.map((s, idx) => (
                  <div key={s.id} className="p-5 rounded-2xl luxury-card space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-mono text-apple-muted">0{idx + 1}</span>
                      <span className="text-xs text-white font-mono font-semibold">{s.price}</span>
                    </div>
                    <h5 className="text-sm font-bold text-white font-display">{s.title}</h5>
                    <p className="text-xs text-apple-muted line-clamp-2">{s.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FOOTER MINI PREVIEW */}
            <div className="mt-auto p-6 border-t border-white/[0.06] bg-noir-900/60 flex items-center justify-between text-xs font-mono text-apple-muted">
              <span>© {content.brand.name} · {content.brand.location}</span>
              <span>{content.brand.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
