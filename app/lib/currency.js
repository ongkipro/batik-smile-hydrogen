import React from 'react';

/**
 * Deterministic Indonesian Rupiah currency formatter without decimals.
 * Converts { amount: "1250000.0", currencyCode: "IDR" } -> "Rp 1.250.000"
 *
 * @param {import('@shopify/hydrogen/storefront-api-types').MoneyV2 | { amount: string | number, currencyCode?: string } | null | undefined} money
 * @returns {string}
 */
export function formatRupiah(money) {
  if (!money?.amount) return '';
  const num = Math.round(parseFloat(money.amount));
  if (isNaN(num)) return '';
  const formatted = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `Rp ${formatted}`;
}

/**
 * Clean Boutique Money component rendering deterministic Rp format without JSX syntax.
 *
 * @param {{ data?: any, className?: string, as?: any }} props
 */
export function BoutiqueMoney({ data, className, as = 'span' }) {
  if (!data?.amount) return null;
  return React.createElement(as, { className }, formatRupiah(data));
}
