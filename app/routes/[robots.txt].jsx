/**
 * @param {Route.LoaderArgs}
 */
export function loader({request}) {
  const url = new URL(request.url);
  const baseUrl = url.origin.includes('localhost') ? url.origin : 'https://batiksmile.com';
  const body = robotsTxtData({baseUrl});

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': `max-age=${60 * 60 * 24}`,
    },
  });
}

/**
 * @param {{baseUrl: string}}
 */
function robotsTxtData({baseUrl}) {
  const sitemapUrl = `${baseUrl}/sitemap.xml`;

  return `
# ==============================================================================
# Batik Smile — Official Robots.txt
# High-Heritage Quiet Luxury Batik | Semarang, Central Java
# ==============================================================================

User-agent: *
${generalDisallowRules()}
Sitemap: ${sitemapUrl}

# ------------------------------------------------------------------------------
# Major Search Engines & AI Answer Engines (Full Public Indexing Allowed)
# ------------------------------------------------------------------------------
User-agent: Googlebot
Allow: /
${generalDisallowRules()}

User-agent: Bingbot
Allow: /
${generalDisallowRules()}

User-agent: Applebot
Allow: /
${generalDisallowRules()}

# OpenAI Search & Retrieval (ChatGPT Search)
User-agent: OAI-SearchBot
Allow: /
${generalDisallowRules()}

User-agent: GPTBot
Allow: /
${generalDisallowRules()}

# Anthropic Search & Retrieval (Claude)
User-agent: Claude-SearchBot
Allow: /
${generalDisallowRules()}

User-agent: ClaudeBot
Allow: /
${generalDisallowRules()}

# Perplexity AI Search
User-agent: PerplexityBot
Allow: /
${generalDisallowRules()}

# ------------------------------------------------------------------------------
# Advertising & Auditing Bots
# ------------------------------------------------------------------------------
User-agent: adsbot-google
Disallow: /cart
Disallow: /account
Disallow: /checkout
Disallow: /checkouts/
Disallow: /search
Allow: /search/
Disallow: /search/?*

User-agent: AhrefsBot
Crawl-delay: 5
${generalDisallowRules()}

User-agent: Pinterest
Crawl-delay: 1

# ------------------------------------------------------------------------------
# Block Known Scrapers / Resource Abusers
# ------------------------------------------------------------------------------
User-agent: Nutch
Disallow: /
`.trim();
}

/**
 * Standard e-commerce disallow rules:
 * - Protect transactional paths (cart, account, checkout)
 * - Prevent query parameter spam / crawl budget waste
 * - PERMIT all policy pages (/policies/*) for trust and compliance
 */
function generalDisallowRules() {
  return `Disallow: /cart
Disallow: /account
Disallow: /checkout
Disallow: /checkouts/
Disallow: /collections/*sort_by*
Disallow: /collections/*+*
Disallow: /collections/*%2B*
Disallow: /collections/*%2b*
Disallow: /collections/*filter*&*filter*
Disallow: /blogs/*+*
Disallow: /blogs/*%2B*
Disallow: /blogs/*%2b*
Disallow: /search
Allow: /search/
Disallow: /search/?*`;
}

/** @typedef {import('./+types/[robots.txt]').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
