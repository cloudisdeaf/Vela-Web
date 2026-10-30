import { SiteContent } from './types';
import { defaultSiteContent } from './content';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'site-content.json');

/**
 * Obtenir el contingut actual del lloc web
 * 1. Comprova si hi ha Supabase configurat
 * 2. Si no, llegeix del fitxer local 'data/site-content.json'
 * 3. Si no existeix, retorna el defaultSiteContent
 */
export async function getSiteContent(): Promise<SiteContent> {
  // 1. Integració opcional amb Supabase (si l'usuari connecta les claus)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/site_content?select=content&order=updated_at.desc&limit=1`, {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
        next: { revalidate: 60 },
      });
      if (res.ok) {
        const rows = await res.json();
        if (rows && rows.length > 0 && rows[0].content) {
          return rows[0].content as SiteContent;
        }
      }
    } catch {
      // Fallback silent a fitxer local
    }
  }

  // 2. Emmagatzematge en fitxer local JSON (Zero configuració inicial)
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      return { ...defaultSiteContent, ...parsed };
    }
  } catch {
    // Si falla la lectura, retornar valor predeterminat
  }

  return defaultSiteContent;
}

/**
 * Guardar canvis realitzats des del panell d'administració
 */
export async function saveSiteContent(newContent: SiteContent): Promise<{ success: boolean; message: string }> {
  // 1. Si Supabase està present, persistir a la taula
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/site_content`, {
        method: 'POST',
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          content: newContent,
          updated_at: new Date().toISOString(),
        }),
      });
      if (res.ok) {
        return { success: true, message: 'Contingut guardat amb èxit a la base de dades Supabase.' };
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error de xarxa a Supabase';
      return { success: false, message: `Error guardant a Supabase: ${message}` };
    }
  }

  // 2. Guardar a fitxer local
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(newContent, null, 2), 'utf-8');
    return { success: true, message: 'Contingut guardat amb èxit a data/site-content.json.' };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error de disc';
    return { success: false, message: `Error d'escriptura local: ${message}` };
  }
}
