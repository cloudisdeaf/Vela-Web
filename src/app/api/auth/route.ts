import { NextResponse } from 'next/server';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const AUTH_FILE = path.join(DATA_DIR, '.auth-config.json');

// Map de rate limit d'intents per IP (Max 5 intents / 15 minuts)
const failedAttemptsMap = new Map<string, { count: number; lockedUntil: number }>();

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password.trim()).digest('hex');
}

// Retorna el hash autoritzat actual
function getCurrentPasswordHash(): string {
  // 1. Variable d'entorn Vercel
  if (process.env.ADMIN_SECRET_KEY) {
    return hashPassword(process.env.ADMIN_SECRET_KEY);
  }

  // 2. Fitxer local segur
  try {
    if (fs.existsSync(AUTH_FILE)) {
      const data = JSON.parse(fs.readFileSync(AUTH_FILE, 'utf-8'));
      if (data && data.hash) {
        return data.hash;
      }
    }
  } catch {
    // Fallback silent
  }

  // 3. Hash per defecte inicial (vela2026admin)
  return hashPassword('vela2026admin');
}

export async function POST(request: Request) {
  try {
    const forwardedFor = request.headers.get('x-forwarded-for');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';
    const now = Date.now();

    // Comprovar si la IP està bloquejada
    const ipRecord = failedAttemptsMap.get(clientIp);
    if (ipRecord && ipRecord.lockedUntil > now) {
      const remainingMinutes = Math.ceil((ipRecord.lockedUntil - now) / 60000);
      return NextResponse.json(
        {
          error: `Accés temporalment bloquejat per seguretat. Torna-ho a provar d'aquí a ${remainingMinutes} minuts.`,
          locked: true,
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { action, password, currentPassword, newPassword } = body;

    const currentHash = getCurrentPasswordHash();

    // ACCIÓ: VERIFICAR LOGIN
    if (action === 'login') {
      if (!password || typeof password !== 'string') {
        return NextResponse.json({ error: 'Introdueix la clau mestra.' }, { status: 400 });
      }

      const inputHash = hashPassword(password);

      if (crypto.timingSafeEqual(Buffer.from(inputHash), Buffer.from(currentHash))) {
        // Èxit: reiniciar intents fallits
        failedAttemptsMap.delete(clientIp);

        // Generar un token de sessió efímer signat
        const sessionToken = crypto.randomBytes(32).toString('hex');

        return NextResponse.json({
          success: true,
          token: password.trim(), // utilitzat com a bearer token per a /api/content
          sessionToken,
          message: 'Autenticació completada amb èxit.',
        });
      } else {
        // Intent fallit: comptabilitzar
        const count = (ipRecord?.count || 0) + 1;
        if (count >= 5) {
          failedAttemptsMap.set(clientIp, { count, lockedUntil: now + 15 * 60 * 1000 });
          return NextResponse.json(
            {
              error: 'Massa intents incorrectes. Terminal bloquejada per seguretat durant 15 minuts.',
              locked: true,
            },
            { status: 429 }
          );
        } else {
          failedAttemptsMap.set(clientIp, { count, lockedUntil: 0 });
          return NextResponse.json(
            {
              error: `Clau d'accés incorrecta. Et queden ${5 - count} intents.`,
              attemptsLeft: 5 - count,
            },
            { status: 401 }
          );
        }
      }
    }

    // ACCIÓ: CANVIAR CONTRASENYA
    if (action === 'change-password') {
      if (!currentPassword || !newPassword) {
        return NextResponse.json({ error: 'Omple tots els camps obligatoris.' }, { status: 400 });
      }

      if (String(newPassword).length < 8) {
        return NextResponse.json({ error: 'La nova clau ha de tenir com a mínim 8 caràcters.' }, { status: 400 });
      }

      const inputHash = hashPassword(currentPassword);
      if (!crypto.timingSafeEqual(Buffer.from(inputHash), Buffer.from(currentHash))) {
        return NextResponse.json({ error: 'La clau actual és incorrecta.' }, { status: 401 });
      }

      // Guardar nou hash a disc
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      const newHash = hashPassword(newPassword);
      fs.writeFileSync(
        AUTH_FILE,
        JSON.stringify({ hash: newHash, updatedAt: new Date().toISOString() }, null, 2),
        'utf-8'
      );

      return NextResponse.json({
        success: true,
        message: 'Clau d\'accés actualitzada amb èxit. Utilitza-la en la propera sessió.',
        newToken: newPassword.trim(),
      });
    }

    return NextResponse.json({ error: 'Acció desconeguda.' }, { status: 400 });
  } catch (error) {
    console.error('[AUTH API ERROR]:', error);
    return NextResponse.json({ error: 'Error del servidor d\'autenticació.' }, { status: 500 });
  }
}
