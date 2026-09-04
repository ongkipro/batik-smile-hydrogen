import {getSitemapIndex} from '@shopify/hydrogen';

/**
 * @param {Route.LoaderArgs}
 */
export async function loader({request, context: {storefront}}) {
  const url = new URL(request.url);
  const baseUrl = url.origin.includes('localhost') ? url.origin : 'https://batiksmile.com';

  const response = await getSitemapIndex({
    storefront,
    request,
  });

  let xml = await response.text();

  // Ensure canonical baseUrl on production
  if (!url.origin.includes('localhost') && url.origin !== baseUrl) {
    xml = xml.replaceAll(url.origin, baseUrl);
  }

  // Inject custom sitemap entry if not present
  const customSitemapEntry = `  <sitemap><loc>${baseUrl}/sitemap/custom/1.xml</loc></sitemap>\n`;
  if (!xml.includes('/sitemap/custom/1.xml')) {
    xml = xml.replace('</sitemapindex>', `${customSitemapEntry}</sitemapindex>`);
  }

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': `max-age=${60 * 60 * 24}`,
    },
  });
}

/** @typedef {import('./+types/[sitemap.xml]').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
