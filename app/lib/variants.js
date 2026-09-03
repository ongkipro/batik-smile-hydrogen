import {useLocation} from 'react-router';
import {useMemo} from 'react';

/**
 * @param {string} handle
 * @param {SelectedOption[]} [selectedOptions]
 */
export function useVariantUrl(handle, selectedOptions) {
  const {pathname} = useLocation();

  return useMemo(() => {
    return getVariantUrl({
      handle,
      pathname,
      searchParams: new URLSearchParams(),
      selectedOptions,
    });
  }, [handle, selectedOptions, pathname]);
}

/**
 * @param {{
 *   handle: string;
 *   pathname: string;
 *   searchParams: URLSearchParams;
 *   selectedOptions?: SelectedOption[];
 * }}
 */
export function getVariantUrl({
  handle,
  pathname,
  searchParams,
  selectedOptions,
}) {
  const match = /(\/[a-zA-Z]{2}-[a-zA-Z]{2}\/)/g.exec(pathname);
  const isLocalePathname = match && match.length > 0;

  const path = isLocalePathname
    ? `${match[0]}products/${handle}`
    : `/products/${handle}`;

  selectedOptions?.forEach((option) => {
    if (
      option.name?.toLowerCase() === 'title' &&
      option.value?.toLowerCase() === 'default title'
    ) {
      return;
    }
    searchParams.set(option.name, option.value);
  });

  // Clean any Title=Default Title search params
  for (const key of Array.from(searchParams.keys())) {
    if (
      key.toLowerCase() === 'title' &&
      searchParams.get(key)?.toLowerCase() === 'default title'
    ) {
      searchParams.delete(key);
    }
  }

  const searchString = searchParams.toString();

  return path + (searchString ? '?' + searchString : '');
}

/** @typedef {import('@shopify/hydrogen/storefront-api-types').SelectedOption} SelectedOption */
