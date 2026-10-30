# 🌊 VELA* — High-End Web Architecture & Digital Studio

Plataforma web de màxim prestigi i autoritat per a l'agència de disseny web **VELA** (Manresa, Barcelona).
Construït amb **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, seguretat OWASP Top 10, gestor professional de cookies RGPD i **Panell CMS Visual d'Edició en temps real**.

---

## 💎 Característiques de la Plataforma

- **Estètica d'Alta Gamma:** Paleta fosca obsidiana / titani amb tocs d'or metàl·lic i roig elèctric inspirat en el logotip oficial de VELA.
- **Autoritat & Confiança Cega:**
  - Secció de Garantia de Seguretat i Rigor Jurídic (Acord NDA, RGPD europeu, codi de propietat 100% del client).
  - Portfoli interactiu amb mètriques empresarials clau.
  - Avals i testimonis de líders del sector.
- **Panell CMS Visual Tipus Canva (`/admin`):**
  - Accés protegit per clau mestra.
  - Split View: controls visuals a l'esquerra i previsualització interactiva a la dreta.
  - Selector de resolucions (Escriptori, Tauleta, Mòbil).
  - Modificació a temps real de: Logo, textos del Hero, Serveis, Preus, Escuts de Seguretat, Projectes i Testimonis.
  - Guardat en 1 clic directament a producció.
- **Seguretat Blindada:**
  - Capçaleres HTTP estrictes: CSP (Content Security Policy), HSTS, X-Frame-Options, XSS Protection.
  - Formulari de contacte amb camp **Honeypot invisible** per a bots, sanitització d'inputs i Rate Limiting basat en IP.
- **Conformitat Legal Estricta (RGPD / LOPD):**
  - Banner i modal interactiu de cookies amb configuració per categories (Necessàries, Analítiques, Màrqueting).
  - Pàgina de Política de Privacitat (`/politica-privacidad`).
  - Pàgina de Termes i Condicions Contractuals (`/terminos`).

---

## 🚀 Guia d'Instal·lació Local

### 1. Requisits previs
Assegura't de tenir instal·lat [Node.js](https://nodejs.org) (v18.17 o superior) al teu ordinador.

### 2. Instal·lar dependències
Obre la terminal a la carpeta del projecte:
```bash
cd C:\Users\garte\Documents\antigravity\vela-agency
npm install
```

### 3. Executar en mode desenvolupament
```bash
npm run dev
```
Obre [http://localhost:3000](http://localhost:3000) al teu navegador.

---

## 🎨 Com Utilitzar el Panell CMS Visual (`/admin`)

1. Navega a [http://localhost:3000/admin](http://localhost:3000/admin).
2. Introdueix la clau mestra:
   - **Clau per defecte:** `vela2026admin` (pots canviar-la a `.env.local` amb la variable `ADMIN_SECRET_KEY`).
3. Utilitza les pestanyes de l'esquerra per modificar textos, preus o imatges.
4. Veuràs com la pantalla de la dreta s'actualitza instantàniament.
5. Fes clic a **"Publicar a Producció"** per persistir els canvis.

---

## 🗄️ Connexió amb Base de Dades Supabase (Opcional)

Per defecte, el lloc funciona **sense cap configuració** guardant les dades al fitxer local `data/site-content.json`.

Si vols que els canvis es guardin en un núvol centralitzat (ideal en desplegar a Vercel/Netlify), crea un projecte gratuït a [Supabase](https://supabase.com):

1. Executa aquest codi SQL al teu projecte de Supabase (SQL Editor):
```sql
CREATE TABLE site_content (
  id BIGSERIAL PRIMARY KEY,
  content JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Permetre lectura pública i escriptura amb clau de servei
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura pública de contingut" 
ON site_content FOR SELECT USING (true);

CREATE POLICY "Escriptura permesa amb service role" 
ON site_content FOR ALL USING (auth.role() = 'service_role');
```

2. Copia les claus al teu `.env.local` (i a les variables d'entorn de Vercel/Netlify):
```env
NEXT_PUBLIC_SUPABASE_URL=https://teu-projecte.supabase.co
SUPABASE_SERVICE_ROLE_KEY=la-teva-service-role-key-secreta
```

---

## 📦 Com Pujar el Codi al teu GitHub

1. Inicialitza el repositori git a la carpeta:
```bash
cd C:\Users\garte\Documents\antigravity\vela-agency
git init
git add .
git commit -m "feat: initial commit - VELA luxury agency platform"
```

2. Crea un nou repositori a [GitHub](https://github.com/new) anomenat per exemple `vela-agency`.

3. Enllaça i puja el codi:
```bash
git remote add origin https://github.com/EL-TEU-USUARI/vela-agency.git
git branch -M main
git push -u origin main
```

---

## ⚡ Desplegament a Producció en 1 Clic (Vercel)

1. Ves a [vercel.com](https://vercel.com) i inicia sessió amb el teu compte de GitHub.
2. Fes clic a **"Add New Project"** i importa el repositori `vela-agency`.
3. A la secció **Environment Variables**, afegeix:
   - `ADMIN_SECRET_KEY`: La teva contrasenya privada per al CMS.
   - (Si uses Supabase) `NEXT_PUBLIC_SUPABASE_URL` i `SUPABASE_SERVICE_ROLE_KEY`.
4. Fes clic a **"Deploy"**.
5. En menys de 60 segons tindràs la teva web activa amb certificat SSL automàtic!
