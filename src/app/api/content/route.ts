import { NextResponse } from 'next/server';
import { getSiteContent, saveSiteContent } from '@/lib/storage';
import { SiteContent } from '@/lib/types';

const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY || 'vela2026admin';

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

    if (token !== ADMIN_SECRET) {
      return NextResponse.json({ error: 'Accés no autoritzat. Clau d\'administrador invàlida.' }, { status: 401 });
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
