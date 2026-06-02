/**
 * Schema + URL helpers.
 *
 * Centralises the canonical site URL, absolute-URL building, and safe JSON-LD
 * serialisation (deep-removes empty values and escapes "<" so the JSON can't
 * break out of a <script> tag).
 */

export const SITE_URL = 'https://calcfree.online';

/** Build an absolute URL from a path or pass through an already-absolute URL. */
export function absoluteUrl(pathOrUrl: string | undefined, base: string = SITE_URL): string {
  if (!pathOrUrl) return base;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const trimmedBase = base.replace(/\/$/, '');
  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${trimmedBase}${path}`;
}

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

/**
 * Recursively remove undefined, null, empty strings and empty arrays/objects so
 * we never emit half-empty schema fields (which is what "no fake schema" means
 * in practice — only output what we actually have).
 */
export function removeEmpty(value: unknown): Json | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value === 'string') {
    const t = value.trim();
    return t === '' ? undefined : t;
  }
  if (typeof value === 'number' || typeof value === 'boolean') return value;
  if (Array.isArray(value)) {
    const arr = value
      .map((v) => removeEmpty(v))
      .filter((v): v is Json => v !== undefined);
    return arr.length ? arr : undefined;
  }
  if (typeof value === 'object') {
    const out: { [key: string]: Json } = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      const cleaned = removeEmpty(v);
      if (cleaned !== undefined) out[k] = cleaned;
    }
    return Object.keys(out).length ? out : undefined;
  }
  return undefined;
}

/** Serialise a schema object to a script-safe JSON-LD string. */
export function toJsonLd(data: Record<string, unknown>): string {
  const cleaned = removeEmpty(data) ?? {};
  return JSON.stringify(cleaned).replace(/</g, '\\u003c');
}

/** Convenience: ISO date string (YYYY-MM-DD) for schema date fields. */
export function isoDate(date: Date | string | undefined): string | undefined {
  if (!date) return undefined;
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.valueOf())) return undefined;
  return d.toISOString().split('T')[0];
}
