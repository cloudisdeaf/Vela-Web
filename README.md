# 🏁 VELA* — High-End Web Architecture & Digital Studio

Plataforma d'enginyeria i disseny web d'elit per a l'agència **VELA** (Manresa, Barcelona).
Alineada amb els més alts estàndards visuals d'Awwwards, Apple i Ferrari: màxima autoritat, sobrietat, confidencialitat i velocitat extrema.

Desenvolupat amb **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, seguretat OWASP Top 10, gestor professional de cookies RGPD i **Panell CMS Visual d'Edició en viu estil Canva/Figma**.

---

## 🏛️ Arquitectura Multi-Pàgina

- **Inici (`/`):** Portada d'impacte monumental, titulars esculpits, mètriques d'enginyeria, resum de disciplines, garantia de seguretat, avantatges competitius, obra seleccionada i testimonis verificats.
- **Serveis (`/serveis`):** Catàleg editorial de 4 disciplines clau amb el **Configurador d'Arquitectura interactiu** per estimar la inversió a l'instant.
- **Projectes (`/projectes`):** Obra seleccionada amb filtre dinàmic per sectors (Salut, Automoció, Retail, Serveis).
- **Seguretat & NDA (`/seguretat`):** Marc de ciberseguretat bancària (Acord NDA bilateral, centres de dades a la UE, sobirania de codi 100%, auditories OWASP).
- **L'Estudi & Manifest (`/nosaltres`):** Filosofia irrenunciable i el cronograma d'execució d'elit de 7 dies.
- **Contacte (`/contacte`):** Canal directe amb l'enginyeria, formulari sanititzat amb honeypot anti-bots i FAQs de màxima transparència.
- **Panell CMS Visual (`/admin`):** Panell privat d'edició en viu amb split-view (Controls a l'esquerra, previsualitzador responsive a la dreta amb selecció Escriptori, Tauleta i Mòbil).
- **Marc Legal (`/politica-privacidad` i `/terminos`):** Textos jurídics complets adaptats a la normativa europea RGPD i LOPD-GDD.

---

## 🎨 Paleta & Disseny de Luxe

- **Fons:** Pure Obsidian Black (`#000000`, `#060606`, `#0A0A0A`).
- **Acentuació:** Ferrari Rosso Corsa (`#E10600`) — potent, precís, de màxima autoritat.
- **Tipografia:** Titanium Apple White (`#FFFFFF`, `#F5F5F7`, `#E5E5EA`, `#86868B`).
- **Avals:** Gold Satin (`#D4AF37`) per a ressenyes verificades de màxima confiança.
- **Mòbil:** Menú en pantalla completa amb efecte de vidre translúcid ultra-suau (*blur* de 40px), rellotge en temps real de Manresa (CET) i botons tàctils optimitzats.

---

## 🔑 Com Accedir i Utilitzar el CMS Visual (`/admin`)

1. Entra a: **`https://vela-web-yoaq.vercel.app/admin`** (o `http://localhost:3000/admin`).
2. Clau mestra per defecte:
   ```
   vela2026admin
   ```
   *(Pots personalitzar-la definint la variable `ADMIN_SECRET_KEY` a Vercel o al teu fitxer `.env.local`)*.
3. Des de la barra superior pots commutar la vista entre **Escriptori**, **Tauleta** i **Mòbil**.
4. Modifica qualsevol text, logotip, preu o testimoni a l'esquerra: el llenç interactiu de la dreta s'actualitza en temps real al moment.
5. Fes clic a **"Publicar a Producció"** per desar els canvis.

---

## 🛡️ Ciberseguretat & Blindatge Legal

- **Content Security Policy (CSP)** i **HSTS** (Strict-Transport-Security a 2 anys).
- Protecció contra atacs **XSS**, **Clickjacking (X-Frame-Options: DENY)** i **Sniffing**.
- **Honeypot invisible** a formularis per bloquejar bots d'spam sense molestar els usuaris reals.
- **Sanitització estricta** d'inputs a l'API i rate limiting per adreça IP.
- **Banner interactiu RGPD** amb preferències granulars guardades en cookies segures (SameSite=Lax, Secure).

---

## 🚀 Repositori i Desplegament

- **GitHub:** [https://github.com/cloudisdeaf/Vela-Web](https://github.com/cloudisdeaf/Vela-Web)
- **Desplegament Vercel:** Cada `git push` a `main` activa automàticament la compilació i publicació a la CDN global de Vercel.
- **Contacte:** `velamanresa@gmail.com` · Instagram: `@velamanresa` · Manresa, Barcelona.
