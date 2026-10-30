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
      {/* BANNER FLOTANT DE PRIVACITAT */}
      {isVisible && !isModalOpen && (
        <aside
          aria-label="Consentiment de cookies"
          className="fixed bottom-6 left-6 right-6 sm:left-auto sm:right-8 sm:max-w-md z-50 p-6 rounded-3xl bg-noir-900/95 backdrop-blur-2xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] animate-fade-in"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="w-9 h-9 rounded-xl bg-noir-800 border border-white/10 flex items-center justify-center text-white flex-shrink-0">
              <svg className="w-4 h-4 text-ferrari-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-display">
                Privacitat & Ciberseguretat RGPD
              </h4>
              <p className="text-xs text-apple-muted mt-1 leading-relaxed">
                Utilitzem cookies tècniques per garantir protecció de dades a Manresa conforme a la normativa UE.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 pt-2 border-t border-white/[0.06]">
            <button
              onClick={handleAcceptAll}
              className="w-full sm:w-auto flex-1 px-4 py-2.5 rounded-full text-xs font-semibold text-white bg-ferrari-red hover:bg-ferrari-dark active:scale-95 transition-all cursor-pointer"
            >
              Acceptar Totes
            </button>
            <button
              onClick={handleRejectNonEssential}
              className="w-full sm:w-auto px-4 py-2.5 rounded-full text-xs font-mono text-apple-silver bg-noir-800 hover:bg-noir-700 border border-white/10 transition-all cursor-pointer"
            >
              Rebutjar
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-3 py-2 text-xs font-mono text-apple-muted hover:text-white underline cursor-pointer"
            >
              Configurar
            </button>
          </div>
        </aside>
      )}

      {/* MODAL COMPLET DE CONFIGURACIÓ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl">
          <div className="w-full max-w-lg bg-noir-900 rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  Preferències de Privacitat
                </h3>
                <p className="text-xs font-mono text-apple-muted mt-0.5">
                  Conforme a la normativa europea RGPD (UE 2016/679)
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-apple-muted hover:text-white p-1"
                aria-label="Tancar modal"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-noir-850 border border-white/[0.06] flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">Cookies Tècniques & Seguretat</h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      ACTIVES
                    </span>
                  </div>
                  <p className="text-xs text-apple-muted mt-1 leading-relaxed">
                    Essencials per a la navegació protegida, prevenció d&apos;atacs XSS/CSRF i transmissió segura del formulari.
                  </p>
                </div>
                <input type="checkbox" checked disabled className="mt-1 accent-emerald-500 h-4 w-4 rounded" />
              </div>

              <div className="p-4 rounded-2xl bg-noir-850 border border-white/[0.06] flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white">Mesurament & Rendiment</h4>
                  <p className="text-xs text-apple-muted mt-1 leading-relaxed">
                    Mètriques agregades completament anonimitzades per verificar la velocitat de càrrega Core Web Vitals.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={analyticsEnabled}
                  onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                  className="mt-1 accent-ferrari-red h-4 w-4 rounded cursor-pointer"
                />
              </div>

              <div className="p-4 rounded-2xl bg-noir-850 border border-white/[0.06] flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white">Personalització</h4>
                  <p className="text-xs text-apple-muted mt-1 leading-relaxed">
                    Permet recordar preferències visuals avançades de resolució i navegació.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={marketingEnabled}
                  onChange={(e) => setMarketingEnabled(e.target.checked)}
                  className="mt-1 accent-ferrari-red h-4 w-4 rounded cursor-pointer"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
              <button
                onClick={handleRejectNonEssential}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-mono text-apple-silver bg-noir-800 hover:bg-noir-700 border border-white/10 transition-all cursor-pointer"
              >
                Rebutjar Opcionals
              </button>
              <button
                onClick={handleSaveCustom}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-ferrari-red hover:bg-ferrari-dark active:scale-95 transition-all cursor-pointer"
              >
                Guardar Configuració
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
