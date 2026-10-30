'use client';

import React from 'react';

export const MarqueeTicker: React.FC = () => {
  const items = [
    { text: 'NEXT.JS 14 APP ROUTER', icon: '⚡' },
    { text: 'VELOCITAT < 0.4S CARREGA', icon: '⏱️' },
    { text: 'BLINDATGE OWASP TOP 10', icon: '🛡️' },
    { text: 'SOBIRANIA TOTAL DEL CODI', icon: '🔑' },
    { text: 'DISSENY FIGMA A MIDA', icon: '🎨' },
    { text: 'LLIURAMENT EN 7-10 DIES', icon: '🚀' },
    { text: 'ESTUDI MANRESA · BAGES', icon: '📍' },
    { text: 'ZERO PLANTILLES ORDINÀRIES', icon: '💎' },
  ];

  return (
    <div className="w-full py-5 bg-noir-900/90 border-y border-white/[0.08] overflow-hidden relative backdrop-blur-md">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-noir-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-noir-950 to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee space-x-12">
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center space-x-4 flex-shrink-0 group">
            <span className="text-xs font-mono font-bold tracking-widest text-apple-silver group-hover:text-ferrari-red transition-colors flex items-center gap-2">
              <span className="text-sm">{item.icon}</span>
              <span>{item.text}</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-ferrari-red"></span>
          </div>
        ))}
      </div>
    </div>
  );
};
