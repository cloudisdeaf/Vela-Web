import { NextResponse } from 'next/server';
import { getSiteContent, saveSiteContent } from '@/lib/storage';
import { SiteContent } from '@/lib/types';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const AUTH_FILE = path.join(DATA_DIR, '.auth-config.json');

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password.trim()).digest('hex');
}

function getCurrentPasswordHash(): string {
  if (process.env.ADMIN_SECRET_KEY) {
    return hashPassword(process.env.ADMIN_SECRET_KEY);
  }
  try {
    if (fs.existsSync(AUTH_FILE)) {
      const data = JSON.parse(fs.readFileSync(AUTH_FILE, 'utf-8'));
      if (data && data.hash) return data.hash;
    }
  } catch {
    // Silent fallback
  }
  return hashPassword('vela2026admin');
}

export async function GET() {
  try {
    const content = await getSiteContent();
    return NextResponse.json(content);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error al carregar contingut';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization') || '';
    const token = authHeader.replace(/^Bearer\s+/i, '');

    if (!token) {
      return NextResponse.json({ error: 'Accés no autoritzat. Token requerit.' }, { status: 401 });
    }

    const currentHash = getCurrentPasswordHash();
    const tokenHash = hashPassword(token);

    if (!crypto.timingSafeEqual(Buffer.from(tokenHash), Buffer.from(currentHash))) {
      return NextResponse.json({ error: 'Accés denegat. Clau invàlida o expirada.' }, { status: 401 });
    }

    const body = (await request.json()) as SiteContent;

    if (!body || !body.brand || !body.hero) {
      return NextResponse.json({ error: 'L\'estructura de dades enviada no és vàlida.' }, { status: 400 });
    }

    const result = await saveSiteContent(body);

    if (result.success) {
      return NextResponse.json({ success: true, message: result.message });
    } else {
      return NextResponse.json({ error: result.message }, { status: 500 });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error al processar la petició';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
