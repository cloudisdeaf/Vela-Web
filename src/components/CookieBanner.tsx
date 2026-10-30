'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('vela_cookie_consent');
      if (!consent) {
        // Mostra el banner si no hi ha consentiment previ
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // Fallback
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    try {
      localStorage.setItem('vela_cookie_consent', JSON.stringify(prefs));
      document.cookie = `vela_cookie_consent=${encodeURIComponent(
        JSON.stringify(prefs)
      )}; path=/; max-age=31536000; SameSite=Lax; Secure`;
    } catch {
      // Ignore
    }
    setIsVisible(false);
    setIsModalOpen(false);
  };

  const handleAcceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    });
  };

  const handleRejectNonEssential = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    });
  };

  const handleSaveCustom = () => {
    saveConsent({
      necessary: true,
      analytics: analyticsEnabled,
      marketing: marketingEnabled,
      timestamp: new Date().toISOString(),
    });
  };

  if (!isVisible && !isModalOpen) return null;

  return (
    <>
      {/* BANNER FLOTANT DE CONSENTIMENT RÀPID */}
      {isVisible && !isModalOpen && (
        <aside
          aria-label="Consentiment de cookies"
          className="fixed bottom-5 left-5 right-5 sm:left-auto sm:right-6 sm:max-w-lg z-50 p-6 rounded-2xl bg-vela-card/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] transition-all animate-float-slow"
        >
          <div className="flex items-start gap-3.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-vela-gold/10 border border-vela-gold/20 flex items-center justify-center text-vela-gold flex-shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-display">
                Transparència & Privacitat RGPD
              </h4>
              <p className="text-xs text-vela-muted mt-1 leading-relaxed">
                A VELA utilitzem cookies pròpies i d&apos;analítica estrictament per assegurar el màxim rendiment tècnic del lloc web. Pots personalitzar o rebutjar les no essencials.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
            <button
              onClick={handleAcceptAll}
              className="w-full sm:w-auto flex-1 px-4 py-2 rounded-lg text-xs font-bold text-black bg-gradient-to-r from-vela-gold to-yellow-400 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              Acceptar Totes
            </button>
            <button
              onClick={handleRejectNonEssential}
              className="w-full sm:w-auto px-3.5 py-2 rounded-lg text-xs font-medium text-white bg-vela-dark hover:bg-white/[0.08] border border-white/10 transition-all cursor-pointer"
            >
              Rebutjar Opcionals
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-3 py-2 text-xs text-vela-muted hover:text-white transition-colors underline cursor-pointer"
            >
              Configurar
            </button>
          </div>
        </aside>
      )}

      {/* MODAL COMPLET DE CONFIGURACIÓ DE COOKIES */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-xl bg-vela-card rounded-2xl border border-white/10 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  Centre de Preferències de Cookies
                </h3>
                <p className="text-xs text-vela-muted mt-0.5">
                  Conforme al Reglament General de Protecció de Dades (RGPD)
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-vela-muted hover:text-white p-1"
                aria-label="Tancar modal"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {/* CATEGORIA 1: NECESSÀRIES */}
              <div className="p-4 rounded-xl bg-vela-dark border border-white/[0.06] flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">Cookies Tècniques & Seguretat</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 uppercase">
                      Sempre Actives
                    </span>
                  </div>
                  <p className="text-xs text-vela-muted mt-1 leading-relaxed">
                    Essencials per permetre la navegació segura, prevenció d&apos;atacs CSRF, gestió de formularis i recordar les teves preferències de privacitat.
                  </p>
                </div>
                <input type="checkbox" checked disabled className="mt-1 accent-emerald-500 h-4 w-4 rounded" />
              </div>

              {/* CATEGORIA 2: ANALÍTICA */}
              <div className="p-4 rounded-xl bg-vela-dark border border-white/[0.06] flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white">Cookies de Mesurament & Rendiment</h4>
                  <p className="text-xs text-vela-muted mt-1 leading-relaxed">
                    Ens ajuden a avaluar mètriques agregades i completament anonimitzades com ara temps de càrrega o pàgines més consultades per optimitzar la velocitat de servei.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={analyticsEnabled}
                  onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                  className="mt-1 accent-vela-gold h-4 w-4 rounded cursor-pointer"
                />
              </div>

              {/* CATEGORIA 3: MÀRQUETING */}
              <div className="p-4 rounded-xl bg-vela-dark border border-white/[0.06] flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white">Personalització & Màrqueting</h4>
                  <p className="text-xs text-vela-muted mt-1 leading-relaxed">
                    Permeten mostrar anuncis rellevants i mesurar campanyes en plataformes com Meta o Google Ads. No compartim dades personals amb tercers.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={marketingEnabled}
                  onChange={(e) => setMarketingEnabled(e.target.checked)}
                  className="mt-1 accent-vela-gold h-4 w-4 rounded cursor-pointer"
                />
              </div>
            </div>

            <div className="text-xs text-vela-muted pt-2">
              Pots consultar tots els detalls tècnics a la nostra{' '}
              <Link href="/politica-privacidad" className="underline text-white hover:text-vela-gold">
                Política de Privacitat i Cookies
              </Link>.
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
              <button
                onClick={handleRejectNonEssential}
                className="w-full sm:w-auto px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-vela-dark hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
              >
                Rebutjar Opcionals
              </button>
              <button
                onClick={handleSaveCustom}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-bold text-black bg-gradient-to-r from-vela-gold to-yellow-400 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                Guardar la Meva Selecció
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
