/**
 * Authoritative SEO and OpenGraph metadata generator for Batik Smile Hydrogen.
 * Ensures 100% precision with Shopify Admin SEO settings (seo.title, seo.description),
 * strict absolute canonical links (tagName: 'link'), and rich social cards.
 */

export const ROOT_DOMAIN = 'https://batiksmile.com';
export const SITE_NAME = 'Batik Smile Nusantara';
export const DEFAULT_OG_IMAGE = `${ROOT_DOMAIN}/banners/hero-desktop.webp`;

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
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:image', content: imageUrl },
    ...(product.featuredImage?.width ? [{ property: 'og:image:width', content: String(product.featuredImage.width) }] : []),
    ...(product.featuredImage?.height ? [{ property: 'og:image:height', content: String(product.featuredImage.height) }] : []),
    { property: 'og:image:alt', content: product.featuredImage?.altText || product.title },
    ...(price ? [
      { property: 'product:price:amount', content: price },
      { property: 'product:price:currency', content: currency },
    ] : []),
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: imageUrl },
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
    return [
      { title },
      { name: 'description', content: description },
      { tagName: 'link', rel: 'canonical', href: canonicalUrl },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:image', content: DEFAULT_OG_IMAGE },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: DEFAULT_OG_IMAGE },
    ];
  }

  const rawTitle = collection.seo?.title || collection.title;
  const title = getSeoTitle(rawTitle, `${collection.title} — ${SITE_NAME}`);
  const description = getSeoDescription(
    collection.seo?.description,
    collection.description || `Koleksi ${collection.title} berkualitas tinggi dari Butik Batik Smile Nusantara Semarang.`
  );
  const canonicalUrl = `${ROOT_DOMAIN}/collections/${collection.handle}`;
  const imageUrl = collection.image?.url || DEFAULT_OG_IMAGE;

  return [
    { title },
    { name: 'description', content: description },
    { tagName: 'link', rel: 'canonical', href: canonicalUrl },
    // OpenGraph
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:image', content: imageUrl },
    ...(collection.image?.width ? [{ property: 'og:image:width', content: String(collection.image.width) }] : []),
    ...(collection.image?.height ? [{ property: 'og:image:height', content: String(collection.image.height) }] : []),
    { property: 'og:image:alt', content: collection.image?.altText || collection.title },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: imageUrl },
  ];
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
    'Halaman informasi resmi Butik Batik Smile Nusantara Semarang.'
  );

  return [
    { title },
    { name: 'description', content: description },
    { tagName: 'link', rel: 'canonical', href: canonicalUrl },
    // OpenGraph
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:image', content: DEFAULT_OG_IMAGE },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: DEFAULT_OG_IMAGE },
  ];
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

  return [
    { title },
    { name: 'description', content: description },
    { tagName: 'link', rel: 'canonical', href: canonicalUrl },
    // OpenGraph
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:image', content: imageUrl },
    ...(article.publishedAt ? [{ property: 'article:published_time', content: article.publishedAt }] : []),
    ...(article.author?.name ? [{ property: 'article:author', content: article.author.name }] : []),
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: imageUrl },
  ];
}
