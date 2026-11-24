const PRIVATE_PATH_PREFIXES = ['/cart', '/account'];
const PUBLIC_CACHE_VALUE = 'public, max-age=1, stale-while-revalidate=9';
const PRIVATE_CACHE_VALUE = 'private, no-store';
const DEFAULT_VARY_VALUE = 'Accept-Encoding, Accept-Language';

/**
 * Applies Oxygen full-page cache and privacy headers to SSR HTML responses.
 * - Private routes (/cart, /account*), non-GET requests, and responses with Set-Cookie
 *   are marked private/no-store and never given Oxygen-Cache-Control.
 * - Anonymous public 2xx/3xx GET responses receive Oxygen-Cache-Control + Vary so
 *   Oxygen full-page cache can serve HITs without breaking 1s/9s auto-sync.
 *
 * @param {Request} request
 * @param {number} responseStatusCode
 * @param {Headers} responseHeaders
 */
export function applyOxygenCacheHeaders(
  request,
  responseStatusCode,
  responseHeaders,
) {
  const pathname = new URL(request.url).pathname;
  const isPrivatePath = PRIVATE_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  if (responseStatusCode === 404) {
    responseHeaders.set('X-Robots-Tag', 'noindex, nofollow');
  }

  if (isPrivatePath || request.method !== 'GET') {
    responseHeaders.set('Cache-Control', PRIVATE_CACHE_VALUE);
    responseHeaders.delete('Oxygen-Cache-Control');
    return;
  }

  if (responseStatusCode >= 400) {
    if (!responseHeaders.has('Cache-Control')) {
      responseHeaders.set('Cache-Control', PRIVATE_CACHE_VALUE);
    }
    responseHeaders.delete('Oxygen-Cache-Control');
    return;
  }

  const existingCacheControl = (
    responseHeaders.get('Cache-Control') || ''
  ).toLowerCase();
  const isExplicitlyPrivate =
    existingCacheControl.includes('private') ||
    existingCacheControl.includes('no-store');

  if (isExplicitlyPrivate || responseHeaders.has('Set-Cookie')) {
    responseHeaders.delete('Oxygen-Cache-Control');
    return;
  }

  if (!responseHeaders.has('Cache-Control')) {
    responseHeaders.set('Cache-Control', PUBLIC_CACHE_VALUE);
  }
  if (!responseHeaders.has('Oxygen-Cache-Control')) {
    responseHeaders.set('Oxygen-Cache-Control', PUBLIC_CACHE_VALUE);
  }
  if (!responseHeaders.has('Vary')) {
    responseHeaders.set('Vary', DEFAULT_VARY_VALUE);
  }
}
