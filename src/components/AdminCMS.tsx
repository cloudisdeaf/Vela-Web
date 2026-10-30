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
      setAuthError('Introdueix la clau mestra.');
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
      setStatusMessage('Error de xarxa en contactar amb el servidor.');
    }
  };

  const handleResetDefaults = () => {
    if (confirm('Vols restablir el contingut als valors predeterminats?')) {
      setContent(defaultSiteContent);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center p-4 tech-grid">
        <div className="w-full max-w-md p-8 rounded-3xl glass-panel-glow border border-white/10 shadow-2xl text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyber-crimson to-cyber-amber p-0.5 mx-auto">
            <div className="w-full h-full bg-space-900 rounded-[14px] flex items-center justify-center text-cyber-amber">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white font-display">VELA CMS Studio</h1>
            <p className="text-xs font-mono text-titanium-400 mt-1">Panell d&apos;administració visual protegit</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Clau Mestra (per defecte: vela2026admin)"
                className="w-full px-4 py-3.5 rounded-xl bg-space-800 border border-white/10 text-white placeholder-titanium-500 text-sm text-center focus:border-cyber-cyan focus:outline-none transition-colors"
              />
              {authError && <p className="text-xs text-cyber-crimson mt-2">{authError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-cyber-crimson to-cyber-amber hover:brightness-110 active:scale-95 transition-all shadow-lg cursor-pointer"
            >
              Desbloquejar Editor Visual
            </button>
          </form>

          <div className="pt-2">
            <Link href="/" className="text-xs font-mono text-titanium-400 hover:text-white underline">
              ← Tornar al portal principal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-void text-white flex flex-col font-sans">
      {/* BARRA SUPERIOR D'ADMINISTRACIÓ */}
      <header className="h-16 border-b border-white/10 bg-space-900/95 backdrop-blur-xl px-6 flex items-center justify-between z-40 sticky top-0">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-black text-lg text-white font-display">VELA*</span>
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest px-2 py-0.5 rounded bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20">
              CMS Visual 2.0
            </span>
          </Link>

          <div className="hidden sm:flex items-center gap-1 bg-space-800 rounded-xl p-1 border border-white/10 text-xs font-mono">
            <button
              onClick={() => setPreviewDevice('desktop')}
              className={`px-3 py-1 rounded-lg transition-colors ${previewDevice === 'desktop' ? 'bg-white/15 text-white' : 'text-titanium-400 hover:text-white'}`}
            >
              Escriptori
            </button>
            <button
              onClick={() => setPreviewDevice('tablet')}
              className={`px-3 py-1 rounded-lg transition-colors ${previewDevice === 'tablet' ? 'bg-white/15 text-white' : 'text-titanium-400 hover:text-white'}`}
            >
              Tauleta
            </button>
            <button
              onClick={() => setPreviewDevice('mobile')}
              className={`px-3 py-1 rounded-lg transition-colors ${previewDevice === 'mobile' ? 'bg-white/15 text-white' : 'text-titanium-400 hover:text-white'}`}
            >
              Mòbil
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetDefaults}
            className="text-xs font-mono text-titanium-400 hover:text-cyber-crimson px-3 py-1.5 transition-colors cursor-pointer"
          >
            Restablir
          </button>

          <button
            onClick={handleSaveToProduction}
            disabled={saveStatus === 'saving'}
            className="px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-cyber-crimson to-cyber-amber hover:brightness-110 active:scale-95 transition-all shadow-md flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{saveStatus === 'saving' ? 'Publicant...' : 'Publicar a Producció'}</span>
          </button>

          <button
            onClick={() => {
              localStorage.removeItem('vela_admin_token');
              setIsAuthenticated(false);
            }}
            className="text-xs text-titanium-400 hover:text-white p-2"
            title="Tancar sessió"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </header>

      {/* FEEDBACK STATUS */}
      {statusMessage && (
        <div
          className={`py-2 px-4 text-center text-xs font-mono font-bold ${
            saveStatus === 'saved' ? 'bg-emerald-500/20 text-emerald-400 border-b border-emerald-500/30' : 'bg-cyber-crimson/20 text-cyber-crimson border-b border-cyber-crimson/30'
          }`}
        >
          {statusMessage}
        </div>
      )}

      {/* SPLIT VIEW */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* CONTROLS ESQUERRA */}
        <div className="lg:col-span-5 border-r border-white/10 bg-space-900/90 flex flex-col h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="flex border-b border-white/10 bg-space-950 text-xs font-mono overflow-x-auto scrollbar-none sticky top-0 z-20">
            <button
              onClick={() => setActiveTab('brand')}
              className={`px-4 py-3 font-semibold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === 'brand' ? 'border-cyber-crimson text-white bg-space-800' : 'border-transparent text-titanium-400 hover:text-white'
              }`}
            >
              1. Marca
            </button>
            <button
              onClick={() => setActiveTab('hero')}
              className={`px-4 py-3 font-semibold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === 'hero' ? 'border-cyber-crimson text-white bg-space-800' : 'border-transparent text-titanium-400 hover:text-white'
              }`}
            >
              2. Portada
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`px-4 py-3 font-semibold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === 'services' ? 'border-cyber-crimson text-white bg-space-800' : 'border-transparent text-titanium-400 hover:text-white'
              }`}
            >
              3. Serveis
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`px-4 py-3 font-semibold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === 'security' ? 'border-cyber-crimson text-white bg-space-800' : 'border-transparent text-titanium-400 hover:text-white'
              }`}
            >
              4. Seguretat
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`px-4 py-3 font-semibold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === 'portfolio' ? 'border-cyber-crimson text-white bg-space-800' : 'border-transparent text-titanium-400 hover:text-white'
              }`}
            >
              5. Projectes
            </button>
            <button
              onClick={() => setActiveTab('testimonials')}
              className={`px-4 py-3 font-semibold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === 'testimonials' ? 'border-cyber-crimson text-white bg-space-800' : 'border-transparent text-titanium-400 hover:text-white'
              }`}
            >
              6. Testimonis
            </button>
          </div>

          <div className="p-6 space-y-6 text-sm">
            {activeTab === 'brand' && (
              <div className="space-y-4">
                <h3 className="font-bold text-white text-base font-display">Identitat Corporativa</h3>

                <div>
                  <label className="block text-xs font-mono font-bold text-titanium-400 uppercase mb-1">Ruta o URL del Logo</label>
                  <input
                    type="text"
                    value={content.brand.logoUrl}
                    onChange={(e) => setContent({ ...content, brand: { ...content.brand, logoUrl: e.target.value } })}
                    className="w-full px-3 py-2 bg-space-800 rounded-lg border border-white/10 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-titanium-400 uppercase mb-1">Nom Comercial</label>
                  <input
                    type="text"
                    value={content.brand.name}
                    onChange={(e) => setContent({ ...content, brand: { ...content.brand, name: e.target.value } })}
                    className="w-full px-3 py-2 bg-space-800 rounded-lg border border-white/10 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-titanium-400 uppercase mb-1">Email Oficial</label>
                  <input
                    type="email"
                    value={content.brand.email}
                    onChange={(e) => setContent({ ...content, brand: { ...content.brand, email: e.target.value } })}
                    className="w-full px-3 py-2 bg-space-800 rounded-lg border border-white/10 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-titanium-400 uppercase mb-1">Handle d&apos;Instagram</label>
                  <input
                    type="text"
                    value={content.brand.instagramHandle}
                    onChange={(e) => setContent({ ...content, brand: { ...content.brand, instagramHandle: e.target.value } })}
                    className="w-full px-3 py-2 bg-space-800 rounded-lg border border-white/10 text-white text-xs"
                  />
                </div>
              </div>
            )}

            {activeTab === 'hero' && (
              <div className="space-y-4">
                <h3 className="font-bold text-white text-base font-display">Portada & Titulars</h3>

                <div>
                  <label className="block text-xs font-mono font-bold text-titanium-400 uppercase mb-1">Insígnia Superior</label>
                  <input
                    type="text"
                    value={content.hero.badge}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, badge: e.target.value } })}
                    className="w-full px-3 py-2 bg-space-800 rounded-lg border border-white/10 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-titanium-400 uppercase mb-1">Titular (Part 1)</label>
                  <input
                    type="text"
                    value={content.hero.headlinePart1}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, headlinePart1: e.target.value } })}
                    className="w-full px-3 py-2 bg-space-800 rounded-lg border border-white/10 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-titanium-400 uppercase mb-1">Titular Destacat (Gradient)</label>
                  <input
                    type="text"
                    value={content.hero.headlineHighlight}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, headlineHighlight: e.target.value } })}
                    className="w-full px-3 py-2 bg-space-800 rounded-lg border border-white/10 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-titanium-400 uppercase mb-1">Subtitular Explicatiu</label>
                  <textarea
                    rows={3}
                    value={content.hero.subheadline}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, subheadline: e.target.value } })}
                    className="w-full px-3 py-2 bg-space-800 rounded-lg border border-white/10 text-white text-xs"
                  />
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-6">
                <h3 className="font-bold text-white text-base font-display">Serveis & Tarifes</h3>
                {content.services.map((srv, index) => (
                  <div key={srv.id} className="p-4 rounded-2xl bg-space-800 border border-white/10 space-y-3">
                    <input
                      type="text"
                      value={srv.title}
                      onChange={(e) => {
                        const updated = [...content.services];
                        updated[index].title = e.target.value;
                        setContent({ ...content, services: updated });
                      }}
                      className="w-full px-3 py-1.5 bg-space-900 rounded-lg border border-white/10 text-white text-xs font-bold font-display"
                    />

                    <input
                      type="text"
                      value={srv.price}
                      onChange={(e) => {
                        const updated = [...content.services];
                        updated[index].price = e.target.value;
                        setContent({ ...content, services: updated });
                      }}
                      className="w-full px-3 py-1.5 bg-space-900 rounded-lg border border-white/10 text-cyber-amber text-xs font-mono"
                    />

                    <textarea
                      rows={2}
                      value={srv.description}
                      onChange={(e) => {
                        const updated = [...content.services];
                        updated[index].description = e.target.value;
                        setContent({ ...content, services: updated });
                      }}
                      className="w-full px-3 py-1.5 bg-space-900 rounded-lg border border-white/10 text-white text-xs"
                    />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-4">
                <h3 className="font-bold text-white text-base font-display">Seguretat & Escuts</h3>
                {content.securityGuarantee.points.map((pt, index) => (
                  <div key={index} className="p-4 rounded-2xl bg-space-800 border border-white/10 space-y-2">
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
                      className="w-full px-2.5 py-1 bg-space-900 rounded border border-white/10 text-white text-xs font-bold"
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
                      className="w-full px-2.5 py-1 bg-space-900 rounded border border-white/10 text-white text-xs"
                    />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'portfolio' && (
              <div className="space-y-4">
                <h3 className="font-bold text-white text-base font-display">Projectes Destacats</h3>
                {content.portfolio.map((p, index) => (
                  <div key={p.id} className="p-4 rounded-2xl bg-space-800 border border-white/10 space-y-2.5">
                    <input
                      type="text"
                      value={p.title}
                      onChange={(e) => {
                        const updated = [...content.portfolio];
                        updated[index].title = e.target.value;
                        setContent({ ...content, portfolio: updated });
                      }}
                      className="w-full px-2.5 py-1 bg-space-900 rounded border border-white/10 text-white text-xs font-bold"
                    />
                    <input
                      type="text"
                      value={p.metric}
                      onChange={(e) => {
                        const updated = [...content.portfolio];
                        updated[index].metric = e.target.value;
                        setContent({ ...content, portfolio: updated });
                      }}
                      className="w-full px-2.5 py-1 bg-space-900 rounded border border-white/10 text-cyber-crimson text-xs font-mono font-bold"
                    />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'testimonials' && (
              <div className="space-y-4">
                <h3 className="font-bold text-white text-base font-display">Testimonis & Avals</h3>
                {content.testimonials.map((t, index) => (
                  <div key={index} className="p-4 rounded-2xl bg-space-800 border border-white/10 space-y-2">
                    <input
                      type="text"
                      value={t.author}
                      onChange={(e) => {
                        const updated = [...content.testimonials];
                        updated[index].author = e.target.value;
                        setContent({ ...content, testimonials: updated });
                      }}
                      className="w-full px-2.5 py-1 bg-space-900 rounded border border-white/10 text-white text-xs font-bold"
                    />
                    <textarea
                      rows={2}
                      value={t.quote}
                      onChange={(e) => {
                        const updated = [...content.testimonials];
                        updated[index].quote = e.target.value;
                        setContent({ ...content, testimonials: updated });
                      }}
                      className="w-full px-2.5 py-1 bg-space-900 rounded border border-white/10 text-white text-xs italic"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CANVAS DRETA */}
        <div className="lg:col-span-7 bg-void flex flex-col items-center justify-center p-4 lg:p-8 overflow-y-auto">
          <div
            className={`transition-all duration-300 bg-void rounded-3xl border border-white/15 shadow-2xl overflow-hidden overflow-y-auto flex flex-col ${
              previewDevice === 'mobile'
                ? 'w-[375px] h-[720px]'
                : previewDevice === 'tablet'
                ? 'w-[768px] h-[800px]'
                : 'w-full h-full max-h-[850px]'
            }`}
          >
            <div className="p-8 text-center border-b border-white/10 relative overflow-hidden bg-gradient-to-b from-space-900 to-void">
              <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/10 mx-auto mb-4 bg-space-800 relative">
                {content.brand.logoUrl ? (
                  <Image src={content.brand.logoUrl} alt="Logo" fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-cyber-crimson text-cyber-amber font-bold flex items-center justify-center">V*</div>
                )}
              </div>

              <span className="text-[10px] font-mono font-bold tracking-widest text-cyber-cyan uppercase block mb-2">
                {content.hero.badge}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white font-display">
                {content.hero.headlinePart1}{' '}
                <span className="text-cyber-crimson">{content.hero.headlineHighlight}</span>
              </h2>
              <p className="text-xs text-titanium-400 mt-3 max-w-md mx-auto line-clamp-3">
                {content.hero.subheadline}
              </p>

              <div className="mt-5 inline-block px-5 py-2 rounded-xl text-xs font-mono font-bold uppercase text-white bg-gradient-to-r from-cyber-crimson to-cyber-amber">
                {content.hero.ctaPrimary}
              </div>
            </div>

            <div className="p-6 space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-titanium-400 text-center">
                Previsualització de Serveis
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {content.services.map((s) => (
                  <div key={s.id} className="p-3.5 rounded-2xl glass-panel">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-white font-display">{s.title}</span>
                      <span className="text-xs text-cyber-amber font-mono">{s.price}</span>
                    </div>
                    <p className="text-[11px] text-titanium-400 line-clamp-2">{s.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
