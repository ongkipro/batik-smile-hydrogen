/**
 * Authoritative SEO and OpenGraph metadata generator for Batik Smile Hydrogen.
 * Ensures 100% precision with Shopify Admin SEO settings (seo.title, seo.description),
 * strict absolute canonical links (tagName: 'link'), and rich social cards.
 */

export const ROOT_DOMAIN = 'https://batiksmile.com';
export const SITE_NAME = 'Batik Smile';
export const DEFAULT_OG_IMAGE = `${ROOT_DOMAIN}/og-image.jpg`;
export const DEFAULT_OG_IMAGE_WIDTH = '1200';
export const DEFAULT_OG_IMAGE_HEIGHT = '630';
export const DEFAULT_OG_IMAGE_TYPE = 'image/jpeg';
export const DEFAULT_LOCALE = 'id_ID';
export const TWITTER_HANDLE = '@batiksmile.official';

/**
 * Format clean title string
 * @param {string} [title]
 * @param {string} [fallback]
 */
export function getSeoTitle(title, fallback = SITE_NAME) {
  if (!title) return fallback;
  const clean = title.trim();
  if (clean.includes('Batik Smile')) return clean;
  return `${clean} — ${SITE_NAME}`;
}

/**
 * Format clean description string
 * @param {string} [desc]
 * @param {string} [fallback]
 */
export function getSeoDescription(desc, fallback) {
  const target = desc || fallback;
  if (!target) return 'Butik busana batik modern dan spesialis sarimbit keluarga premium sejak 2007 di Semarang.';
  // Strip HTML tags and collapse whitespace
  return target.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().slice(0, 300);
}

/**
 * Generate Homepage SEO metadata
 * Dynamically fetches shop name & description from Shopify, falling back to brand copy.
 * @param {any} [shop]
 */
export function generateHomeMeta(shop) {
  const shopName = shop?.name || SITE_NAME;
  const title = `${shopName} — Butik Batik Modern & Sarimbit Keluarga`;
  const description = getSeoDescription(
    shop?.description,
    'Butik batik modern premium sejak 2007 di Semarang. Koleksi sarimbit keluarga 3 kasta, kain batik tulis asli Pekalongan & Solo, serta layanan jahit bespoke tanpa minimal order.'
  );
  const canonicalUrl = `${ROOT_DOMAIN}`;

  return [
    { title },
    { name: 'description', content: description },
    { tagName: 'link', rel: 'canonical', href: canonicalUrl },
    // OpenGraph
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: DEFAULT_LOCALE },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:image', content: DEFAULT_OG_IMAGE },
    { property: 'og:image:secure_url', content: DEFAULT_OG_IMAGE },
    { property: 'og:image:width', content: DEFAULT_OG_IMAGE_WIDTH },
    { property: 'og:image:height', content: DEFAULT_OG_IMAGE_HEIGHT },
    { property: 'og:image:type', content: DEFAULT_OG_IMAGE_TYPE },
    { property: 'og:image:alt', content: `${SITE_NAME} — Butik Batik Modern & Sarimbit Keluarga` },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: TWITTER_HANDLE },
    { name: 'twitter:creator', content: TWITTER_HANDLE },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: DEFAULT_OG_IMAGE },
  ];
}

/**
 * Generate Product SEO metadata
 * @param {any} product
 */
export function generateProductMeta(product) {
  if (!product) {
    return [
      { title: `Produk Tidak Ditemukan — ${SITE_NAME}` },
      { name: 'robots', content: 'noindex, nofollow' },
    ];
  }

  const rawTitle = product.seo?.title || product.title;
  const title = getSeoTitle(rawTitle, `${product.title} — ${SITE_NAME}`);
  const description = getSeoDescription(product.seo?.description, product.description);
  const canonicalUrl = `${ROOT_DOMAIN}/products/${product.handle}`;
  const imageUrl = product.featuredImage?.url || DEFAULT_OG_IMAGE;
  const price = product.priceRange?.minVariantPrice?.amount;
  const currency = product.priceRange?.minVariantPrice?.currencyCode || 'IDR';

  return [
    { title },
    { name: 'description', content: description },
    { tagName: 'link', rel: 'canonical', href: canonicalUrl },
    // OpenGraph
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:type', content: 'product' },
    { property: 'og:locale', content: DEFAULT_LOCALE },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:image', content: imageUrl },
    { property: 'og:image:secure_url', content: imageUrl },
    { property: 'og:image:width', content: String(product.featuredImage?.width || DEFAULT_OG_IMAGE_WIDTH) },
    { property: 'og:image:height', content: String(product.featuredImage?.height || DEFAULT_OG_IMAGE_HEIGHT) },
    { property: 'og:image:alt', content: product.featuredImage?.altText || product.title },
    ...(price ? [
      { property: 'product:price:amount', content: price },
      { property: 'product:price:currency', content: currency },
    ] : []),
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: TWITTER_HANDLE },
    { name: 'twitter:creator', content: TWITTER_HANDLE },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: imageUrl },
  ];
}

/**
 * Format standard OpenGraph and Twitter social card tags
 */
function buildSocialMeta({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  image = DEFAULT_OG_IMAGE,
  imageWidth = DEFAULT_OG_IMAGE_WIDTH,
  imageHeight = DEFAULT_OG_IMAGE_HEIGHT,
  imageAlt = SITE_NAME,
  publishedTime,
  author,
  price,
  currency = 'IDR',
  noindex = false,
  nofollow = false,
}) {
  return [
    { title },
    { name: 'description', content: description },
    { tagName: 'link', rel: 'canonical', href: canonicalUrl },
    ...(noindex ? [{ name: 'robots', content: nofollow ? 'noindex, nofollow' : 'noindex, follow' }] : []),
    // OpenGraph
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:type', content: ogType },
    { property: 'og:locale', content: DEFAULT_LOCALE },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:image', content: image },
    { property: 'og:image:secure_url', content: image },
    { property: 'og:image:width', content: String(imageWidth || DEFAULT_OG_IMAGE_WIDTH) },
    { property: 'og:image:height', content: String(imageHeight || DEFAULT_OG_IMAGE_HEIGHT) },
    { property: 'og:image:type', content: DEFAULT_OG_IMAGE_TYPE },
    { property: 'og:image:alt', content: imageAlt || title },
    ...(price ? [
      { property: 'product:price:amount', content: String(price) },
      { property: 'product:price:currency', content: currency },
    ] : []),
    ...(publishedTime ? [{ property: 'article:published_time', content: publishedTime }] : []),
    ...(author ? [{ property: 'article:author', content: author }] : []),
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: TWITTER_HANDLE },
    { name: 'twitter:creator', content: TWITTER_HANDLE },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
  ];
}

/**
 * Generate Collection SEO metadata
 * @param {any} collection
 * @param {boolean} [isAll]
 */
export function generateCollectionMeta(collection, isAll = false) {
  if (!collection && !isAll) {
    return [
      { title: `Koleksi Tidak Ditemukan — ${SITE_NAME}` },
      { name: 'robots', content: 'noindex, nofollow' },
    ];
  }

  if (isAll) {
    const title = `Katalog Lengkap Busana Batik — ${SITE_NAME}`;
    const description = 'Jelajahi seluruh katalog busana batik modern, sarimbit keluarga 3 kasta, kemeja pria lapis furing, dan kain batik tulis asli Batik Smile Semarang.';
    const canonicalUrl = `${ROOT_DOMAIN}/collections/all`;
    return buildSocialMeta({
      title,
      description,
      canonicalUrl,
      imageAlt: 'Katalog Lengkap Busana Batik Smile',
    });
  }

  const rawTitle = collection.seo?.title || collection.title;
  const title = getSeoTitle(rawTitle, `${collection.title} — ${SITE_NAME}`);
  const description = getSeoDescription(
    collection.seo?.description,
    collection.description || `Koleksi ${collection.title} berkualitas tinggi dari Butik Batik Smile Semarang.`
  );
  const canonicalUrl = `${ROOT_DOMAIN}/collections/${collection.handle}`;
  const imageUrl = collection.image?.url || DEFAULT_OG_IMAGE;

  return buildSocialMeta({
    title,
    description,
    canonicalUrl,
    image: imageUrl,
    imageWidth: collection.image?.width,
    imageHeight: collection.image?.height,
    imageAlt: collection.image?.altText || collection.title,
  });
}

/**
 * Generate Collections Index SEO metadata (/collections)
 */
export function generateCollectionIndexMeta() {
  const title = `Koleksi Busana Batik & Sarimbit Keluarga — ${SITE_NAME}`;
  const description = 'Koleksi lengkap busana batik modern, sarimbit keluarga 3 kasta, kemeja pria furing katun hero, dan kain batik tulis asli dari Butik Batik Smile Semarang.';
  const canonicalUrl = `${ROOT_DOMAIN}/collections`;

  return buildSocialMeta({
    title,
    description,
    canonicalUrl,
    imageAlt: 'Koleksi Busana Batik & Sarimbit Keluarga',
  });
}

/**
 * Generate CMS Page SEO metadata
 * @param {{ page?: any, customTitle?: string, customDescription?: string, handle?: string }} args
 */
export function generatePageMeta({ page, customTitle, customDescription, handle }) {
  const pageHandle = page?.handle || handle || '';
  const canonicalUrl = `${ROOT_DOMAIN}/pages/${pageHandle}`;
  const rawTitle = page?.seo?.title || customTitle || page?.title;
  const title = getSeoTitle(rawTitle, `${page?.title ?? 'Halaman'} — ${SITE_NAME}`);
  const description = getSeoDescription(
    page?.seo?.description || customDescription,
    'Halaman informasi resmi Butik Batik Smile Semarang.'
  );

  return buildSocialMeta({
    title,
    description,
    canonicalUrl,
    imageAlt: `${title} | Batik Smile`,
  });
}

/**
 * Generate Article SEO metadata
 * @param {any} article
 * @param {string} [blogHandle]
 */
export function generateArticleMeta(article, blogHandle = 'news') {
  if (!article) {
    return [
      { title: `Artikel Tidak Ditemukan — ${SITE_NAME}` },
      { name: 'robots', content: 'noindex, nofollow' },
    ];
  }

  const rawTitle = article.seo?.title || article.title;
  const title = getSeoTitle(rawTitle, `${article.title} — ${SITE_NAME}`);
  const description = getSeoDescription(article.seo?.description || article.excerpt, 'Karya tulis dan jurnal budaya wastra Nusantara dari Butik Batik Smile Semarang.');
  const canonicalUrl = `${ROOT_DOMAIN}/blogs/${blogHandle}/${article.handle}`;
  const imageUrl = article.image?.url || DEFAULT_OG_IMAGE;

  return buildSocialMeta({
    title,
    description,
    canonicalUrl,
    ogType: 'article',
    image: imageUrl,
    publishedTime: article.publishedAt,
    author: article.author?.name,
    imageAlt: article.image?.altText || article.title,
  });
}

/**
 * Generate Blog Index SEO metadata (/blogs)
 * @param {any} [primaryBlog]
 */
export function generateBlogsIndexMeta(primaryBlog) {
  const rawTitle = primaryBlog?.seo?.title || primaryBlog?.title;
  const title = getSeoTitle(rawTitle, `Warta & Jurnal Kebudayaan Wastra — ${SITE_NAME}`);
  const description = getSeoDescription(
    primaryBlog?.seo?.description,
    'Kumpulan artikel, jurnal batik tulis, filosofi motif Jawa, etika berbusana, dan panduan perawatan wastra dari Butik Batik Smile Semarang.'
  );
  const canonicalUrl = `${ROOT_DOMAIN}/blogs`;

  return buildSocialMeta({
    title,
    description,
    canonicalUrl,
    imageAlt: 'Warta & Jurnal Kebudayaan Wastra Batik Smile',
  });
}

/**
 * Generate Single Blog Category SEO metadata (/blogs/:blogHandle)
 * @param {any} blog
 */
export function generateBlogMeta(blog) {
  if (!blog) {
    return [
      { title: `Kategori Jurnal Tidak Ditemukan — ${SITE_NAME}` },
      { name: 'robots', content: 'noindex, nofollow' },
    ];
  }

  const rawTitle = blog.seo?.title || blog.title;
  const title = getSeoTitle(rawTitle, `${blog.title} — ${SITE_NAME}`);
  const description = getSeoDescription(
    blog.seo?.description,
    `Catatan dan artikel seputar ${blog.title} dari Butik Batik Smile Semarang.`
  );
  const canonicalUrl = `${ROOT_DOMAIN}/blogs/${blog.handle}`;

  return buildSocialMeta({
    title,
    description,
    canonicalUrl,
    imageAlt: `${blog.title} — Batik Smile`,
  });
}

/**
 * Generate Policy Page SEO metadata (/policies/:handle)
 * @param {any} policy
 * @param {string} handle
 */
export function generatePolicyMeta(policy, handle) {
  const policyTitle = policy?.title || 'Kebijakan Pelayanan Butik';
  const title = `${policyTitle} — ${SITE_NAME}`;
  const rawBody = policy?.body ? policy.body.slice(0, 250) : null;
  const description = getSeoDescription(
    rawBody,
    'Informasi resmi ketentuan dan kebijakan layanan Butik Batik Smile Semarang.'
  );
  const canonicalUrl = `${ROOT_DOMAIN}/policies/${handle}`;

  return buildSocialMeta({
    title,
    description,
    canonicalUrl,
    imageAlt: `${policyTitle} — Batik Smile`,
  });
}

/**
 * Generate Policies Index SEO metadata (/policies)
 */
export function generatePoliciesIndexMeta() {
  const title = `Kebijakan Pelayanan & Garansi Butik — ${SITE_NAME}`;
  const description = 'Informasi resmi kebijakan privasi, garansi penukaran ukuran, ketentuan pengiriman, dan komitmen layanan Batik Smile Semarang.';
  const canonicalUrl = `${ROOT_DOMAIN}/policies`;

  return buildSocialMeta({
    title,
    description,
    canonicalUrl,
    imageAlt: 'Kebijakan Pelayanan & Garansi Butik Batik Smile',
  });
}

/**
 * Generate Search Page SEO metadata (/search)
 * @param {string} [term]
 */
export function generateSearchMeta(term) {
  const title = term
    ? `Pencarian: "${term}" — ${SITE_NAME}`
    : `Pencarian Katalog Busana Batik — ${SITE_NAME}`;
  const description = 'Cari koleksi sarimbit keluarga, batik wanita modern, kemeja pria lapis furing hero, dan kain batik tulis asli Batik Smile Semarang.';
  const canonicalUrl = `${ROOT_DOMAIN}/search`;

  return buildSocialMeta({
    title,
    description,
    canonicalUrl,
    noindex: true,
    imageAlt: 'Pencarian Katalog Busana Batik Smile',
  });
}

/**
 * Generate Cart Page SEO metadata (/cart)
 */
export function generateCartMeta() {
  const title = `Tas Belanja — ${SITE_NAME}`;
  const description = 'Tinjau pesanan busana batik dan sarimbit keluarga Anda sebelum melanjutkan ke pembayaran resmi Shopify.';
  const canonicalUrl = `${ROOT_DOMAIN}/cart`;

  return [
    { title },
    { name: 'description', content: description },
    { tagName: 'link', rel: 'canonical', href: canonicalUrl },
    { name: 'robots', content: 'noindex, nofollow' },
  ];
}

/**
 * Generate 404 / Catch-all SEO metadata
 */
export function generateNotFoundMeta() {
  return [
    { title: `404 — Halaman Tidak Ditemukan | ${SITE_NAME}` },
    {
      name: 'description',
      content: 'Halaman atau arsip koleksi yang Anda tuju belum tersedia di Butik Batik Smile.',
    },
    { name: 'robots', content: 'noindex, nofollow' },
  ];
}
