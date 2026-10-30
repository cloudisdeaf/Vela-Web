import { NextResponse } from 'next/server';
import { sanitizeString, validateEmail, validatePhone, checkRateLimit } from '@/lib/security';

export async function POST(request: Request) {
  try {
    // 1. Obtenir IP del client per a Rate Limiting
    const forwardedFor = request.headers.get('x-forwarded-for');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

    if (!checkRateLimit(clientIp, 5, 60000)) {
      return NextResponse.json(
        { error: 'Massa peticions en poc temps. Si us plau, espera un minut abans de tornar-ho a intentar.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // 2. Comprovació de Honeypot anti-spam de bots
    if (body.website_url_check && String(body.website_url_check).length > 0) {
      // Un bot ha emplenat el camp ocult
      return NextResponse.json({ success: true, message: 'Missatge rebut.' });
    }

    // 3. Sanitització de dades d'entrada
    const name = sanitizeString(body.name);
    const email = sanitizeString(body.email);
    const phone = sanitizeString(body.phone);
    const company = sanitizeString(body.company);
    const service = sanitizeString(body.service);
    const budget = sanitizeString(body.budget);
    const message = sanitizeString(body.message);

    // 4. Validacions estrictes
    if (!name || name.length < 2) {
      return NextResponse.json({ error: 'Si us plau, indica el teu nom o el de la teva empresa.' }, { status: 400 });
    }

    if (!email || !validateEmail(email)) {
      return NextResponse.json({ error: 'L\'adreça de correu electrònic no sembla vàlida.' }, { status: 400 });
    }

    if (phone && !validatePhone(phone)) {
      return NextResponse.json({ error: 'El telèfon introduït té un format no reconegut.' }, { status: 400 });
    }

    if (!message || message.length < 10) {
      return NextResponse.json(
        { error: 'Si us plau, descriu breument les necessitats del teu projecte (mínim 10 caràcters).' },
        { status: 400 }
      );
    }

    // 5. Model de dades de la consulta
    const lead = {
      timestamp: new Date().toISOString(),
      name,
      email,
      phone,
      company,
      service,
      budget,
      message,
      clientIp,
    };

    // Log segur al servidor
    console.log('[NOU LEAD REBUT - VELA MANRESA]:', JSON.stringify(lead, null, 2));

    // Si tens Resend o Sendgrid, pots descomentar el dispatch a velamanresa@gmail.com
    // const resendApiKey = process.env.RESEND_API_KEY;
    // ...

    return NextResponse.json({
      success: true,
      message: 'La teva sol·licitud ha estat rebuda sota estricta confidencialitat. Ens posarem en contacte en menys de 24 hores.',
    });
  } catch (error) {
    console.error('[ERROR API CONTACT]:', error);
    return NextResponse.json(
      { error: 'Ha ocorregut un error intern en processar la sol·licitud. Si us plau, escriu directament a velamanresa@gmail.com.' },
      { status: 500 }
    );
  }
}
