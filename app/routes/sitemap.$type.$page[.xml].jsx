import {getSitemap} from '@shopify/hydrogen';

/**
 * @param {Route.LoaderArgs}
 */
export async function loader({request, params, context: {storefront}}) {
  const url = new URL(request.url);
  const baseUrl = url.origin.includes('localhost') ? url.origin : 'https://batiksmile.com';

  // Handle custom sitemap chunk for storefront-native and high-priority landing routes
  if (params.type === 'custom') {
    const customUrls = [
      { loc: `${baseUrl}/`, priority: '1.0', changefreq: 'daily' },
      { loc: `${baseUrl}/collections/all`, priority: '0.9', changefreq: 'daily' },
      { loc: `${baseUrl}/collections`, priority: '0.8', changefreq: 'daily' },
      { loc: `${baseUrl}/blogs`, priority: '0.8', changefreq: 'weekly' },
      { loc: `${baseUrl}/pages/tentang-kami`, priority: '0.8', changefreq: 'monthly' },
      { loc: `${baseUrl}/pages/lokasi-toko`, priority: '0.8', changefreq: 'monthly' },
      { loc: `${baseUrl}/pages/panduan-ukuran`, priority: '0.7', changefreq: 'monthly' },
      { loc: `${baseUrl}/pages/panduan-perawatan`, priority: '0.7', changefreq: 'monthly' },
      { loc: `${baseUrl}/policies`, priority: '0.6', changefreq: 'monthly' },
      { loc: `${baseUrl}/policies/refund-policy`, priority: '0.5', changefreq: 'monthly' },
      { loc: `${baseUrl}/policies/shipping-policy`, priority: '0.5', changefreq: 'monthly' },
      { loc: `${baseUrl}/policies/privacy-policy`, priority: '0.5', changefreq: 'monthly' },
      { loc: `${baseUrl}/policies/terms-of-service`, priority: '0.5', changefreq: 'monthly' },
    ];

    const today = new Date().toISOString().split('T')[0];
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${customUrls
  .map(
    (item) => `  <url>
    <loc>${item.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`;

    return new Response(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': `max-age=${60 * 60 * 24}`,
      },
    });
  }

  const response = await getSitemap({
    storefront,
    request,
    params,
    getLink: ({type, handle}) => {
      return `${baseUrl}/${type}/${handle}`;
    },
  });

  let xml = await response.text();
  // Ensure canonical baseUrl is applied throughout the XML
  if (!url.origin.includes('localhost') && url.origin !== baseUrl) {
    xml = xml.replaceAll(url.origin, baseUrl);
  }

  return new Response(xml, {
    status: response.status,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': `max-age=${60 * 60 * 24}`,
    },
  });
}

/** @typedef {import('./+types/sitemap.$type.$page[.xml]').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
