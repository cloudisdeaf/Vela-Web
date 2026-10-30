/**
 * Utilitats de Seguretat & Sanitització de Codi
 * OWASP Top 10 Compliance: XSS, Injection & CSRF prevention
 */

export function sanitizeString(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<[^>]*>/g, '') // Eliminar tags HTML
    .replace(/[&<>"'/]/g, (match) => {
      const entities: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;',
      };
      return entities[match] || match;
    })
    .trim()
    .slice(0, 2000); // Limitar mida per evitar DoS per buffer
}

export function validateEmail(email: string): boolean {
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return re.test(String(email).toLowerCase()) && email.length <= 120;
}

export function validatePhone(phone: string): boolean {
  if (!phone) return true; // Camp opcional
  const re = /^[+0-9\s-]{6,20}$/;
  return re.test(phone);
}

// In-memory rate-limiter per a Next.js (IP based)
const ipMap = new Map<string, { count: number; expiresAt: number }>();

export function checkRateLimit(ip: string, limit: number = 5, windowMs: number = 60000): boolean {
  const now = Date.now();
  const client = ipMap.get(ip);

  if (!client || now > client.expiresAt) {
    ipMap.set(ip, { count: 1, expiresAt: now + windowMs });
    return true;
  }

  if (client.count >= limit) {
    return false;
  }

  client.count += 1;
  return true;
}
