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
  const [attemptsLeft, setAttemptsLeft] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [activeTab, setActiveTab] = useState<
    'brand' | 'hero' | 'services' | 'portfolio' | 'testimonials' | 'security' | 'password'
  >('brand');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // Formulari de canvi de clau
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [pwStatusMessage, setPwStatusMessage] = useState('');

  useEffect(() => {
    const savedKey = localStorage.getItem('vela_admin_token');
    if (savedKey) {
      // Validar silenciós
      fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', password: savedKey }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data && data.success) {
            setPasscode(savedKey);
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('vela_admin_token');
          }
        })
        .catch(() => {});
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode) {
      setAuthError('Introdueix la clau mestra d\'accés.');
      return;
    }

    setIsLoggingIn(true);
    setAuthError('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', password: passcode }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem('vela_admin_token', passcode);
        setIsAuthenticated(true);
        setAuthError('');
        setAttemptsLeft(null);
        setIsLocked(false);
      } else {
        setAuthError(data.error || 'Clau d\'accés incorrecta.');
        if (data.attemptsLeft !== undefined) {
          setAttemptsLeft(data.attemptsLeft);
        }
        if (data.locked) {
          setIsLocked(true);
        }
      }
    } catch {
      setAuthError('Error de connexió amb el servidor de seguretat.');
    } finally {
      setIsLoggingIn(false);
    }
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
        setStatusMessage(data.message || 'Contingut sincronitzat amb èxit a producció!');
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

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwStatusMessage('');

    if (newPw !== confirmPw) {
      setPwStatusMessage('La nova clau i la confirmació no coincideixen.');
      return;
    }

    if (newPw.length < 8) {
      setPwStatusMessage('La nova clau ha de tenir com a mínim 8 caràcters.');
      return;
    }

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'change-password',
          currentPassword: currentPw,
          newPassword: newPw,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setPasscode(newPw);
        localStorage.setItem('vela_admin_token', newPw);
        setPwStatusMessage('✅ Clau canviada amb èxit! Desada per a futures sessions.');
        setCurrentPw('');
        setNewPw('');
        setConfirmPw('');
      } else {
        setPwStatusMessage(`❌ ${data.error || 'No s\'ha pogut actualitzar la clau.'}`);
      }
    } catch {
      setPwStatusMessage('❌ Error de connexió en canviar la clau.');
    }
  };

  const handleResetDefaults = () => {
    if (confirm('Vols restablir el contingut original de disseny VELA?')) {
      setContent(defaultSiteContent);
    }
  };

  // HELPERS PER AGESTIONAR LLISTES DINÀMIQUES
  const addService = () => {
    const newService: ServiceItem = {
      id: `servei-${Date.now()}`,
      icon: 'Shield',
      title: 'Nou Servei Corporatiu',
      tagline: 'Especialitat d\'Enginyeria',
      description: 'Descripció detallada del servei d\'alt valor per al client.',
      price: 'Des de 500 €',
      features: ['Característica 1', 'Característica 2', 'Característica 3'],
    };
    setContent({ ...content, services: [...content.services, newService] });
  };

  const removeService = (index: number) => {
    if (content.services.length <= 1) {
      alert('Com a mínim has de mantenir un servei actiu.');
      return;
    }
    const updated = content.services.filter((_, i) => i !== index);
    setContent({ ...content, services: updated });
  };

  const addProject = () => {
    const newProject: ProjectItem = {
      id: `cas-${Date.now()}`,
      title: 'Nou Projecte Corporatiu',
      client: 'Empresa Líder Bages',
      category: 'Plataforma Web + SEO',
      metric: '+250% conversió',
      description: 'Descripció de la transformació digital assolida.',
      image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80',
      liveUrl: 'https://velabages.es',
    };
    setContent({ ...content, portfolio: [...content.portfolio, newProject] });
  };

  const removeProject = (index: number) => {
    if (content.portfolio.length <= 1) {
      alert('Com a mínim has de mantenir un projecte de mostra.');
      return;
    }
    const updated = content.portfolio.filter((_, i) => i !== index);
    setContent({ ...content, portfolio: updated });
  };

  const addTestimonial = () => {
    const newTestimonial: TestimonialItem = {
      author: 'Nom del Director',
      role: 'CEO & Fundador',
      company: 'Empresa Manresa',
      quote: 'L\'agència VELA ha transformat completament la nostra presència digital.',
      rating: 5,
    };
    setContent({ ...content, testimonials: [...content.testimonials, newTestimonial] });
  };

  const removeTestimonial = (index: number) => {
    if (content.testimonials.length <= 1) {
      alert('Com a mínim has de mantenir un testimoni.');
      return;
    }
    const updated = content.testimonials.filter((_, i) => i !== index);
    setContent({ ...content, testimonials: updated });
  };

  // PANTALLA DE LOGIN SEGURA SENSE PISTES NI TEXT EN GRIS
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-noir-950 flex items-center justify-center p-6 relative overflow-hidden spotlight-red">
        <div className="w-full max-w-md p-10 rounded-3xl bg-noir-900 border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.95)] text-center space-y-8 relative z-10">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-noir-850 border border-white/10 mx-auto p-1">
            <Image src="/logo.png" alt="VELA" fill className="object-contain p-1" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[10px] font-mono text-apple-silver uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-ferrari-red"></span>
              PORTAL RESTRINGIT · AUTENTICACIÓ CRIPTOGRÀFICA
            </div>
            <h1 className="text-2xl font-black text-white font-display text-apple-headline">
              VELA Studio Terminal
            </h1>
            <p className="text-xs text-apple-muted mt-2 leading-relaxed">
              Introdueix la clau mestra privada per desbloquejar l&apos;editor.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono text-apple-muted uppercase tracking-wider mb-2 text-left">
                Clau d&apos;accés mestra
              </label>
              {/* SENSE CAP PISTA NI VALOR EN GRIS */}
              <input
                type="password"
                required
                disabled={isLocked || isLoggingIn}
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3.5 rounded-xl bg-noir-850 border border-white/10 text-white placeholder-apple-dark text-sm text-center focus:border-ferrari-red focus:outline-none transition-colors font-mono tracking-widest disabled:opacity-40"
              />

              {authError && (
                <div className="mt-3 p-2.5 rounded-lg bg-ferrari-red/10 border border-ferrari-red/20 text-xs text-ferrari-red">
                  {authError}
                </div>
              )}

              {attemptsLeft !== null && attemptsLeft > 0 && !isLocked && (
                <p className="text-[11px] font-mono text-apple-muted mt-2">
                  Seguretat: {attemptsLeft} {attemptsLeft === 1 ? 'intent restant' : 'intents restants'} abans del bloqueig.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLocked || isLoggingIn}
              className="w-full py-4 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-ferrari-red hover:bg-ferrari-dark active:scale-95 transition-all shadow-[0_0_25px_rgba(225,6,0,0.3)] disabled:opacity-40 cursor-pointer"
            >
              {isLoggingIn ? 'Verificant credencials...' : 'Desbloquejar Editor Visual'}
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
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-white/[0.06] text-apple-silver border border-white/10">
              Editor Pro
            </span>
          </Link>

          {/* DISPOSITIUS RESPONSIVE VIEWPORT */}
          <div className="hidden md:flex items-center gap-1 bg-noir-850 rounded-full p-1 border border-white/10 text-xs font-mono">
            <button
              onClick={() => setPreviewDevice('desktop')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                previewDevice === 'desktop' ? 'bg-white/15 text-white font-bold' : 'text-apple-muted hover:text-white'
              }`}
            >
              Escriptori (1440px)
            </button>
            <button
              onClick={() => setPreviewDevice('tablet')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                previewDevice === 'tablet' ? 'bg-white/15 text-white font-bold' : 'text-apple-muted hover:text-white'
              }`}
            >
              Tauleta (768px)
            </button>
            <button
              onClick={() => setPreviewDevice('mobile')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                previewDevice === 'mobile' ? 'bg-white/15 text-white font-bold' : 'text-apple-muted hover:text-white'
              }`}
            >
              Mòbil (390px)
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="text-xs font-mono text-apple-muted hover:text-white px-3 py-1.5 transition-colors hidden sm:block"
          >
            Veure web pública ↗
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
            className="text-xs text-apple-muted hover:text-white p-2 cursor-pointer"
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
        {/* COLUMNA ESQUERRA: CONTROLS DE MODIFICACIÓ AMB PESTANYES COMPLETES */}
        <div className="lg:col-span-5 border-r border-white/10 bg-noir-900/90 flex flex-col h-[calc(100vh-4rem)] overflow-y-auto">
          {/* PESTANYES D'EDICIÓ */}
          <div className="flex border-b border-white/10 bg-noir-950 text-xs font-mono overflow-x-auto scrollbar-none sticky top-0 z-20">
            {[
              { id: 'brand', label: '1. Marca' },
              { id: 'hero', label: '2. Portada' },
              { id: 'services', label: '3. Serveis' },
              { id: 'portfolio', label: '4. Projectes' },
              { id: 'testimonials', label: '5. Testimonis' },
              { id: 'security', label: '6. Seguretat' },
              { id: 'password', label: '🔑 Seguretat Panell' },
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
            {/* PESTANYA 1: MARCA I IDENTITAT */}
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
                  <p className="text-[11px] text-apple-dark mt-1 font-mono">Ex: /logo.png o qualsevol URL web</p>
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
                  <label className="block text-xs font-mono text-apple-muted uppercase mb-1">Enllaç de WhatsApp Directe</label>
                  <input
                    type="text"
                    value={content.brand.whatsapp}
                    onChange={(e) => setContent({ ...content, brand: { ...content.brand, whatsapp: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-noir-850 rounded-xl border border-white/10 text-white text-xs focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-apple-muted uppercase mb-1">Ubicació Geogràfica / Seu</label>
                  <input
                    type="text"
                    value={content.brand.location}
                    onChange={(e) => setContent({ ...content, brand: { ...content.brand, location: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-noir-850 rounded-xl border border-white/10 text-white text-xs focus:border-white focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* PESTANYA 2: HERO & PORTADA */}
            {activeTab === 'hero' && (
              <div className="space-y-4">
                <h3 className="font-bold text-white text-base font-display">Portada & Titulars</h3>

                <div>
                  <label className="block text-xs font-mono text-apple-muted uppercase mb-1">Insígnia Superior (Badge)</label>
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

                <div>
                  <label className="block text-xs font-mono text-apple-muted uppercase mb-1">Botó Principal (CTA)</label>
                  <input
                    type="text"
                    value={content.hero.ctaPrimary}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, ctaPrimary: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-noir-850 rounded-xl border border-white/10 text-white text-xs focus:border-white focus:outline-none"
                  />
                </div>

                {/* 4 MÈTRIQUES DE NEGOCI */}
                <div className="pt-4 border-t border-white/[0.08]">
                  <h4 className="text-xs font-mono uppercase text-apple-silver mb-3">4 Mètriques Clau</h4>
                  <div className="space-y-3">
                    {content.hero.stats.map((st, sIdx) => (
                      <div key={sIdx} className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={st.value}
                          onChange={(e) => {
                            const updated = [...content.hero.stats];
                            updated[sIdx].value = e.target.value;
                            setContent({ ...content, hero: { ...content.hero, stats: updated } });
                          }}
                          className="px-3 py-1.5 bg-noir-850 rounded-lg border border-white/10 text-white text-xs font-bold"
                          placeholder="Valor"
                        />
                        <input
                          type="text"
                          value={st.label}
                          onChange={(e) => {
                            const updated = [...content.hero.stats];
                            updated[sIdx].label = e.target.value;
                            setContent({ ...content, hero: { ...content.hero, stats: updated } });
                          }}
                          className="px-3 py-1.5 bg-noir-850 rounded-lg border border-white/10 text-apple-muted text-xs"
                          placeholder="Etiqueta"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* PESTANYA 3: SERVEIS & TARIFES DINÀMIQUES */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base font-display">Serveis & Tarifes</h3>
                  <button
                    onClick={addService}
                    className="px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-mono text-apple-silver cursor-pointer"
                  >
                    + Afegir Servei
                  </button>
                </div>

                {content.services.map((srv, index) => (
                  <div key={srv.id} className="p-5 rounded-2xl bg-noir-850 border border-white/10 space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-apple-muted uppercase">Servei 0{index + 1}</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={srv.price}
                          onChange={(e) => {
                            const updated = [...content.services];
                            updated[index].price = e.target.value;
                            setContent({ ...content, services: updated });
                          }}
                          className="px-2.5 py-1 bg-noir-900 rounded-lg border border-white/10 text-apple-silver text-xs font-mono text-right"
                          placeholder="Preu"
                        />
                        <button
                          onClick={() => removeService(index)}
                          className="text-apple-dark hover:text-ferrari-red p-1 text-xs"
                          title="Eliminar aquest servei"
                        >
                          ✕
                        </button>
                      </div>
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
                      placeholder="Títol del servei"
                    />

                    <input
                      type="text"
                      value={srv.tagline}
                      onChange={(e) => {
                        const updated = [...content.services];
                        updated[index].tagline = e.target.value;
                        setContent({ ...content, services: updated });
                      }}
                      className="w-full px-3 py-1.5 bg-noir-900 rounded-lg border border-white/10 text-apple-muted text-xs"
                      placeholder="Subtítol / Tecnologies"
                    />

                    <textarea
                      rows={2}
                      value={srv.description}
                      onChange={(e) => {
                        const updated = [...content.services];
                        updated[index].description = e.target.value;
                        setContent({ ...content, services: updated });
                      }}
                      className="w-full px-3 py-2 bg-noir-900 rounded-lg border border-white/10 text-apple-silver text-xs"
                      placeholder="Descripció breu"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* PESTANYA 4: PROJECTES & OBRA DINÀMICA */}
            {activeTab === 'portfolio' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base font-display">Projectes Destacats</h3>
                  <button
                    onClick={addProject}
                    className="px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-mono text-apple-silver cursor-pointer"
                  >
                    + Afegir Projecte
                  </button>
                </div>

                {content.portfolio.map((p, index) => (
                  <div key={p.id} className="p-5 rounded-2xl bg-noir-850 border border-white/10 space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-apple-muted">Cas 0{index + 1}</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={p.metric}
                          onChange={(e) => {
                            const updated = [...content.portfolio];
                            updated[index].metric = e.target.value;
                            setContent({ ...content, portfolio: updated });
                          }}
                          className="px-2.5 py-1 bg-noir-900 rounded border border-white/10 text-ferrari-red text-xs font-mono font-semibold text-right"
                          placeholder="Mètrica comercial"
                        />
                        <button
                          onClick={() => removeProject(index)}
                          className="text-apple-dark hover:text-ferrari-red p-1 text-xs"
                          title="Eliminar aquest projecte"
                        >
                          ✕
                        </button>
                      </div>
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
                      placeholder="Nom del projecte"
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={p.client}
                        onChange={(e) => {
                          const updated = [...content.portfolio];
                          updated[index].client = e.target.value;
                          setContent({ ...content, portfolio: updated });
                        }}
                        className="px-3 py-1.5 bg-noir-900 rounded-lg border border-white/10 text-apple-silver text-xs"
                        placeholder="Client / Sector"
                      />
                      <input
                        type="text"
                        value={p.category}
                        onChange={(e) => {
                          const updated = [...content.portfolio];
                          updated[index].category = e.target.value;
                          setContent({ ...content, portfolio: updated });
                        }}
                        className="px-3 py-1.5 bg-noir-900 rounded-lg border border-white/10 text-apple-silver text-xs"
                        placeholder="Categoria de servei"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-apple-muted mb-1">URL de la imatge de portada</label>
                      <input
                        type="text"
                        value={p.image}
                        onChange={(e) => {
                          const updated = [...content.portfolio];
                          updated[index].image = e.target.value;
                          setContent({ ...content, portfolio: updated });
                        }}
                        className="w-full px-3 py-1.5 bg-noir-900 rounded-lg border border-white/10 text-apple-muted text-xs"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* PESTANYA 5: TESTIMONIS & AVALS DINÀMICS */}
            {activeTab === 'testimonials' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base font-display">Testimonis & Avals</h3>
                  <button
                    onClick={addTestimonial}
                    className="px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-mono text-apple-silver cursor-pointer"
                  >
                    + Afegir Testimoni
                  </button>
                </div>

                {content.testimonials.map((t, index) => (
                  <div key={index} className="p-4 rounded-2xl bg-noir-850 border border-white/10 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={t.author}
                        onChange={(e) => {
                          const updated = [...content.testimonials];
                          updated[index].author = e.target.value;
                          setContent({ ...content, testimonials: updated });
                        }}
                        className="px-2.5 py-1 bg-noir-900 rounded-lg border border-white/10 text-white text-xs font-bold flex-1 mr-2"
                        placeholder="Nom del client"
                      />
                      <button
                        onClick={() => removeTestimonial(index)}
                        className="text-apple-dark hover:text-ferrari-red p-1 text-xs"
                        title="Eliminar aquest testimoni"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={t.role}
                        onChange={(e) => {
                          const updated = [...content.testimonials];
                          updated[index].role = e.target.value;
                          setContent({ ...content, testimonials: updated });
                        }}
                        className="px-2.5 py-1 bg-noir-900 rounded border border-white/10 text-apple-silver text-xs"
                        placeholder="Càrrec"
                      />
                      <input
                        type="text"
                        value={t.company}
                        onChange={(e) => {
                          const updated = [...content.testimonials];
                          updated[index].company = e.target.value;
                          setContent({ ...content, testimonials: updated });
                        }}
                        className="px-2.5 py-1 bg-noir-900 rounded border border-white/10 text-apple-silver text-xs"
                        placeholder="Empresa"
                      />
                    </div>

                    <textarea
                      rows={3}
                      value={t.quote}
                      onChange={(e) => {
                        const updated = [...content.testimonials];
                        updated[index].quote = e.target.value;
                        setContent({ ...content, testimonials: updated });
                      }}
                      className="w-full px-2.5 py-1.5 bg-noir-900 rounded-lg border border-white/10 text-apple-silver text-xs italic"
                      placeholder="Ressenya..."
                    />
                  </div>
                ))}
              </div>
            )}

            {/* PESTANYA 6: PROTOCOLS DE SEGURETAT */}
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

            {/* PESTANYA 7: SEGURETAT & CANVI DE CLAU MESTRA */}
            {activeTab === 'password' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-white text-base font-display">Clau d&apos;Accés al Panell</h3>
                  <p className="text-xs text-apple-muted mt-1">
                    Modifica la clau d&apos;accés al CMS per blindar el teu terminal contra accessos no autoritzats.
                  </p>
                </div>

                <form onSubmit={handleChangePassword} className="space-y-4 luxury-card p-6 rounded-2xl">
                  <div>
                    <label className="block text-xs font-mono text-apple-muted uppercase mb-1">Clau Actual</label>
                    <input
                      type="password"
                      required
                      value={currentPw}
                      onChange={(e) => setCurrentPw(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2.5 bg-noir-900 rounded-xl border border-white/10 text-white text-xs focus:border-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-apple-muted uppercase mb-1">Nova Clau Segura</label>
                    <input
                      type="password"
                      required
                      value={newPw}
                      onChange={(e) => setNewPw(e.target.value)}
                      placeholder="Mínim 8 caràcters"
                      className="w-full px-3.5 py-2.5 bg-noir-900 rounded-xl border border-white/10 text-white text-xs focus:border-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-apple-muted uppercase mb-1">Confirmar Nova Clau</label>
                    <input
                      type="password"
                      required
                      value={confirmPw}
                      onChange={(e) => setConfirmPw(e.target.value)}
                      placeholder="Repeteix la nova clau"
                      className="w-full px-3.5 py-2.5 bg-noir-900 rounded-xl border border-white/10 text-white text-xs focus:border-white focus:outline-none"
                    />
                  </div>

                  {pwStatusMessage && (
                    <div className="p-3 rounded-lg bg-noir-900 border border-white/10 text-xs font-mono">
                      {pwStatusMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-ferrari-red hover:bg-ferrari-dark transition-all cursor-pointer"
                  >
                    Actualitzar Clau Mestra
                  </button>
                </form>
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
                <span className="text-ferrari-red">{content.hero.headlineHighlight}</span>
              </h2>

              <p className="text-xs sm:text-sm text-apple-muted mt-4 max-w-lg mx-auto line-clamp-3 leading-relaxed">
                {content.hero.subheadline}
              </p>

              <div className="mt-6 inline-flex px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-ferrari-red shadow-[0_0_20px_rgba(225,6,0,0.3)]">
                {content.hero.ctaPrimary}
              </div>

              {/* STATS PREVIEW */}
              <div className="mt-8 pt-6 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-4">
                {content.hero.stats.map((st, i) => (
                  <div key={i} className="text-center">
                    <div className="text-lg font-black text-white font-display">{st.value}</div>
                    <div className="text-[9px] font-mono text-apple-muted uppercase">{st.label}</div>
                  </div>
                ))}
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
                  <div key={s.id} className="p-5 rounded-2xl luxury-card space-y-2">
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

            {/* PORTFOLIO PREVIEW */}
            <div className="p-8 border-t border-white/[0.06] space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <span className="text-xs font-mono uppercase tracking-widest text-apple-muted">
                  Obra & Resultats
                </span>
                <span className="text-xs font-mono text-ferrari-red">
                  {content.portfolio.length} Casos d&apos;Èxit
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {content.portfolio.map((p) => (
                  <div key={p.id} className="p-4 rounded-2xl luxury-card space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-white font-display">{p.title}</span>
                      <span className="font-mono text-ferrari-red font-semibold">{p.metric}</span>
                    </div>
                    <p className="text-[11px] text-apple-muted">{p.client} · {p.category}</p>
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
