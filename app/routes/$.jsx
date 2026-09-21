import React from 'react';
import { redirect, useRouteError, isRouteErrorResponse } from 'react-router';
import { NotFoundView } from '~/components/NotFoundView';
import { generateNotFoundMeta } from '~/lib/seo';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return generateNotFoundMeta();
};

const SLUG_CHECK_QUERY = `#graphql
  query SlugResolution($handle: String!) {
    product(handle: $handle) {
      id
    }
    collection(handle: $handle) {
      id
    }
    page(handle: $handle) {
      id
    }
  }
`;

/**
 * @param {Route.LoaderArgs}
 */
export async function loader({ request, context }) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Resolve single-segment slug (e.g. "/sarimbit-charcoal-hitam" -> "/products/sarimbit-charcoal-hitam")
  const match = pathname.match(/^\/([a-zA-Z0-9_-]+)\/?$/);
  if (match && context?.storefront) {
    const slug = match[1];
    try {
      const data = await context.storefront.query(SLUG_CHECK_QUERY, {
        variables: { handle: slug },
        cache: context.storefront.CacheShort(),
      });

      if (data?.product?.id) {
        return redirect(`/products/${slug}${url.search}`, 302);
      }
      if (data?.collection?.id) {
        return redirect(`/collections/${slug}${url.search}`, 302);
      }
      if (data?.page?.id) {
        return redirect(`/pages/${slug}${url.search}`, 302);
      }
    } catch {
      // Fall through to 404 if query fails or not found
    }
  }

  throw new Response(`${pathname} not found`, {
    status: 404,
    statusText: 'Not Found',
    headers: {
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}

export default function CatchAllPage() {
  return <NotFoundView statusCode={404} />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  let statusCode = 404;

  if (isRouteErrorResponse(error)) {
    statusCode = error.status;
  }

  return <NotFoundView statusCode={statusCode} />;
}

