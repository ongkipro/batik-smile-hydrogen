import {ServerRouter} from 'react-router';
import {isbot} from 'isbot';
import {renderToReadableStream} from 'react-dom/server';
import {createContentSecurityPolicy} from '@shopify/hydrogen';

/**
 * @param {Request} request
 * @param {number} responseStatusCode
 * @param {Headers} responseHeaders
 * @param {EntryContext} reactRouterContext
 * @param {HydrogenRouterContextProvider} context
 */
export default async function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  reactRouterContext,
  context,
) {
  const {nonce, header, NonceProvider} = createContentSecurityPolicy({
    shop: {
      checkoutDomain: context.env?.PUBLIC_CHECKOUT_DOMAIN || 'checkout.batiksmile.com',
      storeDomain: context.env?.PUBLIC_STORE_DOMAIN,
    },
    styleSrc: [
      "'self'",
      "'unsafe-inline'",
      'https://cdn.shopify.com',
      'https://fonts.googleapis.com',
    ],
    fontSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'https://fonts.gstatic.com',
      'data:',
    ],
    connectSrc: [
      'https://account.batiksmile.com',
      'https://checkout.batiksmile.com',
      'https://batiksmile.com',
      context.env?.PUBLIC_ACCOUNT_DOMAIN ? `https://${context.env.PUBLIC_ACCOUNT_DOMAIN}` : null,
      context.env?.PUBLIC_CHECKOUT_DOMAIN ? `https://${context.env.PUBLIC_CHECKOUT_DOMAIN}` : null,
      context.env?.PUBLIC_STORE_DOMAIN ? `https://${context.env.PUBLIC_STORE_DOMAIN}` : null,
    ].filter(Boolean),
    mediaSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'https://checkout.batiksmile.com',
      'https://batiksmile.com',
      'https://*.shopify.com',
      'https://*.myshopify.com',
      context.env?.PUBLIC_CHECKOUT_DOMAIN ? `https://${context.env.PUBLIC_CHECKOUT_DOMAIN}` : null,
      context.env?.PUBLIC_STORE_DOMAIN ? `https://${context.env.PUBLIC_STORE_DOMAIN}` : null,
      'data:',
      'blob:',
    ].filter(Boolean),
  });

  const body = await renderToReadableStream(
    <NonceProvider>
      <ServerRouter
        context={reactRouterContext}
        url={request.url}
        nonce={nonce}
      />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set('Content-Security-Policy', header);

  if (!responseHeaders.has('Cache-Control')) {
    responseHeaders.set(
      'Cache-Control',
      'public, max-age=1, stale-while-revalidate=9',
    );
  }

  if (responseStatusCode === 404) {
    responseHeaders.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}

/** @typedef {import('@shopify/hydrogen').HydrogenRouterContextProvider} HydrogenRouterContextProvider */
/** @typedef {import('react-router').EntryContext} EntryContext */
