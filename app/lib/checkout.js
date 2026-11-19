/**
 * Normalizes and formats Storefront API checkout URLs to always route
 * through the dedicated Quiet Luxury custom checkout domain.
 *
 * @param {string | undefined | null} checkoutUrl - The raw checkoutUrl from Cart API
 * @param {string} [customDomain='checkout.batiksmile.com'] - The custom checkout domain
 * @returns {string} The normalized checkout URL
 */
export function resolveCheckoutUrl(
  checkoutUrl,
  customDomain = 'checkout.batiksmile.com',
) {
  if (!checkoutUrl) return '/cart';

  try {
    const url = new URL(checkoutUrl);
    // Replace internal myshopify or storefront domain with dedicated checkout domain
    if (
      url.hostname.includes('myshopify.com') ||
      url.hostname === 'batiksmile.com'
    ) {
      url.hostname = customDomain;
    }
    return url.toString();
  } catch {
    return checkoutUrl;
  }
}

/**
 * @param {{
 *   cart?: {checkoutUrl?: string | null} | null,
 *   errors?: unknown[] | null,
 *   userErrors?: unknown[] | null,
 *   warnings?: {code: string}[] | null,
 * }} result
 * @param {string} [customDomain]
 */
export function getCartCheckoutRedirect({cart, errors, userErrors, warnings}, customDomain) {
  if (
    !cart?.checkoutUrl ||
    errors?.length ||
    userErrors?.length ||
    warnings?.some(({code}) =>
      code === 'MERCHANDISE_NOT_ENOUGH_STOCK' || code === 'MERCHANDISE_OUT_OF_STOCK',
    )
  ) {
    return null;
  }

  return resolveCheckoutUrl(cart.checkoutUrl, customDomain);
}

/**
 * Resolves customer account URLs to the dedicated account domain.
 *
 * @param {string} [path=''] - Subpath on the account domain (e.g. '/orders')
 * @param {string} [customAccountDomain='account.batiksmile.com'] - The custom account domain
 * @returns {string} The full customer account URL
 */
export function resolveAccountUrl(
  path = '',
  customAccountDomain = 'account.batiksmile.com',
) {
  const cleanPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';
  return `https://${customAccountDomain}${cleanPath}`;
}
