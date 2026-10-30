'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SiteContent, ServiceItem, ProjectItem, TestimonialItem } from '@/lib/types';
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

  // Carregar contingut actual en entrar
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
      setAuthError('Introdueix la clau d\'accés.');
      return;
    }
    // Clau per defecte si no s'ha sobreescrit amb env: 'vela2026admin'
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
        setStatusMessage(data.message || 'Contingut publicat amb èxit!');
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
    if (confirm('Vols restablir tot el contingut als valors predeterminats?')) {
      setContent(defaultSiteContent);
    }
  };

  // PANTALLA DE LOGIN SEGURA SI NO ESTÀ AUTENTICAT
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-vela-black flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-2xl bg-vela-card border border-white/10 shadow-2xl text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-vela-red to-vela-gold p-0.5 mx-auto">
            <div className="w-full h-full bg-vela-card rounded-[14px] flex items-center justify-center text-vela-gold">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white font-display">VELA CMS Studio</h1>
            <p className="text-xs text-vela-muted mt-1">Panell d&apos;administració visual protegit</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Introdueix la Clau Mestra (per defecte: vela2026admin)"
                className="w-full px-4 py-3 rounded-xl bg-vela-dark border border-white/10 text-white placeholder-vela-muted text-sm text-center focus:border-vela-gold focus:outline-none transition-colors"
              />
              {authError && <p className="text-xs text-vela-red mt-2">{authError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-sm font-bold text-black bg-gradient-to-r from-vela-gold to-yellow-400 hover:brightness-110 active:scale-95 transition-all shadow-lg cursor-pointer"
            >
              Desbloquejar Editor Visual
            </button>
          </form>

          <div className="pt-2">
            <Link href="/" className="text-xs text-vela-muted hover:text-white underline">
              ← Tornar a la pàgina principal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // PANELL VISUAL CMS TIPUS CANVA / WEBFLOW
  return (
    <div className="min-h-screen bg-vela-black text-white flex flex-col">
      {/* BARRA SUPERIOR D'ADMINISTRACIÓ */}
      <header className="h-16 border-b border-white/10 bg-vela-dark px-6 flex items-center justify-between z-40 sticky top-0">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-extrabold text-lg text-white font-display">VELA*</span>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-vela-gold/10 text-vela-gold border border-vela-gold/20">
              CMS Visual Pro
            </span>
          </Link>

          {/* SELECTOR DE PANTALLA PREVIEW */}
          <div className="hidden sm:flex items-center gap-1 bg-vela-card rounded-lg p-1 border border-white/10 text-xs">
            <button
              onClick={() => setPreviewDevice('desktop')}
              className={`px-3 py-1 rounded transition-colors ${previewDevice === 'desktop' ? 'bg-white/15 text-white' : 'text-vela-muted hover:text-white'}`}
            >
              Escriptori
            </button>
            <button
              onClick={() => setPreviewDevice('tablet')}
              className={`px-3 py-1 rounded transition-colors ${previewDevice === 'tablet' ? 'bg-white/15 text-white' : 'text-vela-muted hover:text-white'}`}
            >
              Tauleta
            </button>
            <button
              onClick={() => setPreviewDevice('mobile')}
              className={`px-3 py-1 rounded transition-colors ${previewDevice === 'mobile' ? 'bg-white/15 text-white' : 'text-vela-muted hover:text-white'}`}
            >
              Mòbil
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetDefaults}
            className="text-xs text-vela-muted hover:text-vela-red px-3 py-1.5 transition-colors cursor-pointer"
          >
            Restablir Predeterminats
          </button>

          <button
            onClick={handleSaveToProduction}
            disabled={saveStatus === 'saving'}
            className="px-5 py-2 rounded-lg text-xs font-bold text-black bg-gradient-to-r from-vela-gold to-yellow-400 hover:brightness-110 active:scale-95 transition-all shadow-md flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{saveStatus === 'saving' ? 'Guardant...' : 'Publicar a Producció'}</span>
          </button>

          <button
            onClick={() => {
              localStorage.removeItem('vela_admin_token');
              setIsAuthenticated(false);
            }}
            className="text-xs text-vela-muted hover:text-white p-2"
            title="Tancar sessió"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </header>

      {/* FEEDBACK STATUS FLOTANT */}
      {statusMessage && (
        <div
          className={`py-2 px-4 text-center text-xs font-semibold ${
            saveStatus === 'saved' ? 'bg-emerald-500/20 text-emerald-400 border-b border-emerald-500/30' : 'bg-vela-red/20 text-vela-red border-b border-vela-red/30'
          }`}
        >
          {statusMessage}
        </div>
      )}

      {/* COS PRINCIPAL: SPLIT VIEW EDITOR */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* COLUMNA ESQUERRA: CONTROLS DE MODIFICACIÓ */}
        <div className="lg:col-span-5 border-r border-white/10 bg-vela-surface/90 flex flex-col h-[calc(100vh-4rem)] overflow-y-auto">
          {/* PESTANYES DE NAVEGACIÓ D'EDICIÓ */}
          <div className="flex border-b border-white/10 bg-vela-dark text-xs overflow-x-auto scrollbar-none sticky top-0 z-20">
            <button
              onClick={() => setActiveTab('brand')}
              className={`px-4 py-3 font-semibold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === 'brand' ? 'border-vela-gold text-white bg-vela-card/50' : 'border-transparent text-vela-muted hover:text-white'
              }`}
            >
              1. Marca & Logo
            </button>
            <button
              onClick={() => setActiveTab('hero')}
              className={`px-4 py-3 font-semibold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === 'hero' ? 'border-vela-gold text-white bg-vela-card/50' : 'border-transparent text-vela-muted hover:text-white'
              }`}
            >
              2. Portada & Hero
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`px-4 py-3 font-semibold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === 'services' ? 'border-vela-gold text-white bg-vela-card/50' : 'border-transparent text-vela-muted hover:text-white'
              }`}
            >
              3. Serveis & Preus
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`px-4 py-3 font-semibold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === 'security' ? 'border-vela-gold text-white bg-vela-card/50' : 'border-transparent text-vela-muted hover:text-white'
              }`}
            >
              4. Garantia
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`px-4 py-3 font-semibold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === 'portfolio' ? 'border-vela-gold text-white bg-vela-card/50' : 'border-transparent text-vela-muted hover:text-white'
              }`}
            >
              5. Projectes
            </button>
            <button
              onClick={() => setActiveTab('testimonials')}
              className={`px-4 py-3 font-semibold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === 'testimonials' ? 'border-vela-gold text-white bg-vela-card/50' : 'border-transparent text-vela-muted hover:text-white'
              }`}
            >
              6. Testimonis
            </button>
          </div>

          <div className="p-6 space-y-6 text-sm">
            {/* PESTANYA 1: MARCA I LOGO */}
            {activeTab === 'brand' && (
              <div className="space-y-4">
                <h3 className="font-bold text-white text-base">Identitat Corporativa & Contacte</h3>

                <div>
                  <label className="block text-xs font-bold text-vela-muted uppercase mb-1">Ruta o URL del Logo</label>
                  <input
                    type="text"
                    value={content.brand.logoUrl}
                    onChange={(e) => setContent({ ...content, brand: { ...content.brand, logoUrl: e.target.value } })}
                    className="w-full px-3 py-2 bg-vela-card rounded-lg border border-white/10 text-white text-xs"
                    placeholder="/logo.png o https://..."
                  />
                  <span className="text-[11px] text-vela-muted mt-1 block">
                    Pots substituir l&apos;arxiu a <code className="text-vela-gold">public/logo.png</code> o enganxar una URL externa d&apos;imatge.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-vela-muted uppercase mb-1">Nom Comercial</label>
                  <input
                    type="text"
                    value={content.brand.name}
                    onChange={(e) => setContent({ ...content, brand: { ...content.brand, name: e.target.value } })}
                    className="w-full px-3 py-2 bg-vela-card rounded-lg border border-white/10 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-vela-muted uppercase mb-1">Email Oficial</label>
                  <input
                    type="email"
                    value={content.brand.email}
                    onChange={(e) => setContent({ ...content, brand: { ...content.brand, email: e.target.value } })}
                    className="w-full px-3 py-2 bg-vela-card rounded-lg border border-white/10 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-vela-muted uppercase mb-1">Handle d&apos;Instagram</label>
                  <input
                    type="text"
                    value={content.brand.instagramHandle}
                    onChange={(e) => setContent({ ...content, brand: { ...content.brand, instagramHandle: e.target.value } })}
                    className="w-full px-3 py-2 bg-vela-card rounded-lg border border-white/10 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-vela-muted uppercase mb-1">Estat de Disponibilitat (Badge superior)</label>
                  <input
                    type="text"
                    value={content.brand.availabilityStatus}
                    onChange={(e) => setContent({ ...content, brand: { ...content.brand, availabilityStatus: e.target.value } })}
                    className="w-full px-3 py-2 bg-vela-card rounded-lg border border-white/10 text-white text-xs"
                  />
                </div>
              </div>
            )}

            {/* PESTANYA 2: HERO */}
            {activeTab === 'hero' && (
              <div className="space-y-4">
                <h3 className="font-bold text-white text-base">Portada & Titulars d&apos;Impacte</h3>

                <div>
                  <label className="block text-xs font-bold text-vela-muted uppercase mb-1">Insígnia Superior</label>
                  <input
                    type="text"
                    value={content.hero.badge}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, badge: e.target.value } })}
                    className="w-full px-3 py-2 bg-vela-card rounded-lg border border-white/10 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-vela-muted uppercase mb-1">Titular (Part 1)</label>
                  <input
                    type="text"
                    value={content.hero.headlinePart1}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, headlinePart1: e.target.value } })}
                    className="w-full px-3 py-2 bg-vela-card rounded-lg border border-white/10 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-vela-muted uppercase mb-1">Titular Destacat (Gradient Color)</label>
                  <input
                    type="text"
                    value={content.hero.headlineHighlight}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, headlineHighlight: e.target.value } })}
                    className="w-full px-3 py-2 bg-vela-card rounded-lg border border-white/10 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-vela-muted uppercase mb-1">Subtitular Explicatiu</label>
                  <textarea
                    rows={3}
                    value={content.hero.subheadline}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, subheadline: e.target.value } })}
                    className="w-full px-3 py-2 bg-vela-card rounded-lg border border-white/10 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-vela-muted uppercase mb-1">Botó Principal CTA</label>
                  <input
                    type="text"
                    value={content.hero.ctaPrimary}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, ctaPrimary: e.target.value } })}
                    className="w-full px-3 py-2 bg-vela-card rounded-lg border border-white/10 text-white text-xs"
                  />
                </div>
              </div>
            )}

            {/* PESTANYA 3: SERVEIS */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                <h3 className="font-bold text-white text-base">Serveis & Preus d&apos;Alta Gamma</h3>
                {content.services.map((srv, index) => (
                  <div key={srv.id} className="p-4 rounded-xl bg-vela-card border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-vela-gold uppercase">Servei #{index + 1}</span>
                      <label className="flex items-center gap-1.5 text-xs text-vela-muted">
                        <input
                          type="checkbox"
                          checked={srv.popular || false}
                          onChange={(e) => {
                            const updated = [...content.services];
                            updated[index].popular = e.target.checked;
                            setContent({ ...content, services: updated });
                          }}
                        />
                        <span>Destacat</span>
                      </label>
                    </div>

                    <input
                      type="text"
                      value={srv.title}
                      onChange={(e) => {
                        const updated = [...content.services];
                        updated[index].title = e.target.value;
                        setContent({ ...content, services: updated });
                      }}
                      className="w-full px-3 py-1.5 bg-vela-dark rounded border border-white/10 text-white text-xs font-bold"
                    />

                    <input
                      type="text"
                      value={srv.price}
                      onChange={(e) => {
                        const updated = [...content.services];
                        updated[index].price = e.target.value;
                        setContent({ ...content, services: updated });
                      }}
                      className="w-full px-3 py-1.5 bg-vela-dark rounded border border-white/10 text-vela-gold text-xs font-mono"
                    />

                    <textarea
                      rows={2}
                      value={srv.description}
                      onChange={(e) => {
                        const updated = [...content.services];
                        updated[index].description = e.target.value;
                        setContent({ ...content, services: updated });
                      }}
                      className="w-full px-3 py-1.5 bg-vela-dark rounded border border-white/10 text-white text-xs"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* PESTANYA 4: SEGURETAT */}
            {activeTab === 'security' && (
              <div className="space-y-4">
                <h3 className="font-bold text-white text-base">Garantia & Escuts de Seguretat</h3>
                {content.securityGuarantee.points.map((pt, index) => (
                  <div key={index} className="p-3.5 rounded-xl bg-vela-card border border-white/10 space-y-2">
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
                      className="w-full px-2.5 py-1 bg-vela-dark rounded border border-white/10 text-white text-xs font-bold"
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
                      className="w-full px-2.5 py-1 bg-vela-dark rounded border border-white/10 text-white text-xs"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* PESTANYA 5: PROJECTES */}
            {activeTab === 'portfolio' && (
              <div className="space-y-4">
                <h3 className="font-bold text-white text-base">Projectes & Casos d&apos;Èxit</h3>
                {content.portfolio.map((p, index) => (
                  <div key={p.id} className="p-4 rounded-xl bg-vela-card border border-white/10 space-y-2.5">
                    <input
                      type="text"
                      value={p.title}
                      onChange={(e) => {
                        const updated = [...content.portfolio];
                        updated[index].title = e.target.value;
                        setContent({ ...content, portfolio: updated });
                      }}
                      className="w-full px-2.5 py-1 bg-vela-dark rounded border border-white/10 text-white text-xs font-bold"
                    />
                    <input
                      type="text"
                      value={p.metric}
                      onChange={(e) => {
                        const updated = [...content.portfolio];
                        updated[index].metric = e.target.value;
                        setContent({ ...content, portfolio: updated });
                      }}
                      className="w-full px-2.5 py-1 bg-vela-dark rounded border border-white/10 text-vela-red text-xs font-bold"
                      placeholder="Mètrica clau (ex. +310% consultes)"
                    />
                    <input
                      type="text"
                      value={p.image}
                      onChange={(e) => {
                        const updated = [...content.portfolio];
                        updated[index].image = e.target.value;
                        setContent({ ...content, portfolio: updated });
                      }}
                      className="w-full px-2.5 py-1 bg-vela-dark rounded border border-white/10 text-vela-muted text-xs font-mono"
                      placeholder="URL Imatge"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* PESTANYA 6: TESTIMONIS */}
            {activeTab === 'testimonials' && (
              <div className="space-y-4">
                <h3 className="font-bold text-white text-base">Testimonis & Avals</h3>
                {content.testimonials.map((t, index) => (
                  <div key={index} className="p-4 rounded-xl bg-vela-card border border-white/10 space-y-2">
                    <input
                      type="text"
                      value={t.author}
                      onChange={(e) => {
                        const updated = [...content.testimonials];
                        updated[index].author = e.target.value;
                        setContent({ ...content, testimonials: updated });
                      }}
                      className="w-full px-2.5 py-1 bg-vela-dark rounded border border-white/10 text-white text-xs font-bold"
                    />
                    <input
                      type="text"
                      value={t.company}
                      onChange={(e) => {
                        const updated = [...content.testimonials];
                        updated[index].company = e.target.value;
                        setContent({ ...content, testimonials: updated });
                      }}
                      className="w-full px-2.5 py-1 bg-vela-dark rounded border border-white/10 text-vela-gold text-xs"
                    />
                    <textarea
                      rows={2}
                      value={t.quote}
                      onChange={(e) => {
                        const updated = [...content.testimonials];
                        updated[index].quote = e.target.value;
                        setContent({ ...content, testimonials: updated });
                      }}
                      className="w-full px-2.5 py-1 bg-vela-dark rounded border border-white/10 text-white text-xs italic"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* COLUMNA DRETA: CANVAS DE PREVISUALITZACIÓ EN DIRECTE */}
        <div className="lg:col-span-7 bg-vela-black flex flex-col items-center justify-center p-4 lg:p-8 overflow-y-auto">
          <div
            className={`transition-all duration-300 bg-vela-black rounded-2xl border border-white/15 shadow-2xl overflow-hidden overflow-y-auto flex flex-col ${
              previewDevice === 'mobile'
                ? 'w-[375px] h-[720px]'
                : previewDevice === 'tablet'
                ? 'w-[768px] h-[800px]'
                : 'w-full h-full max-h-[850px]'
            }`}
          >
            {/* SIMULACIÓ MINI HERO */}
            <div className="p-8 text-center border-b border-white/10 relative overflow-hidden bg-gradient-to-b from-vela-dark to-vela-black">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 mx-auto mb-4 bg-vela-card relative">
                {content.brand.logoUrl ? (
                  <Image src={content.brand.logoUrl} alt="Logo" fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-vela-red text-vela-gold font-bold flex items-center justify-center">V*</div>
                )}
              </div>

              <span className="text-[10px] font-bold tracking-widest text-vela-red uppercase block mb-2">
                {content.hero.badge}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white font-display">
                {content.hero.headlinePart1}{' '}
                <span className="text-vela-gold">{content.hero.headlineHighlight}</span>
              </h2>
              <p className="text-xs text-vela-text mt-3 max-w-md mx-auto line-clamp-3">
                {content.hero.subheadline}
              </p>

              <div className="mt-5 inline-block px-5 py-2 rounded-lg text-xs font-bold text-black bg-gradient-to-r from-vela-gold to-yellow-400">
                {content.hero.ctaPrimary}
              </div>
            </div>

            {/* SIMULACIÓ MINI SERVEIS */}
            <div className="p-6 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-vela-muted text-center">
                Previsualització de Serveis
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {content.services.map((s) => (
                  <div key={s.id} className="p-3.5 rounded-xl bg-vela-card border border-white/[0.08]">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-white">{s.title}</span>
                      <span className="text-xs text-vela-gold font-mono">{s.price}</span>
                    </div>
                    <p className="text-[11px] text-vela-muted line-clamp-2">{s.description}</p>
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
