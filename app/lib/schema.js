import { ROOT_DOMAIN, SITE_NAME } from '~/lib/seo';

/**
 * Authoritative JSON-LD Structured Data generator for Batik Smile Hydrogen.
 * Strictly implements Schema.org specifications for ClothingStore, Organization,
 * WebSite, Product, CollectionPage/ItemList, BlogPosting, and BreadcrumbList.
 */

/**
 * Organization and Official Storefront LocalBusiness Schema
 * Represents the multi-floor flagship showroom in Pamularsih and Banyumanik branch.
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    '@id': `${ROOT_DOMAIN}/#organization`,
    name: 'Batik Smile Nusantara',
    alternateName: SITE_NAME,
    url: ROOT_DOMAIN,
    logo: {
      '@type': 'ImageObject',
      url: `${ROOT_DOMAIN}/brand/batik-smile-logo.png`,
      caption: 'Logo Resmi Batik Smile Nusantara',
    },
    image: `${ROOT_DOMAIN}/og-image.jpg`,
    description:
      'Butik busana batik modern dan spesialis sarimbit keluarga 3 kasta (Exclusive, Premium, Ekonomi), kain batik tulis asli Pekalongan & Solo, serta layanan jahit bespoke tanpa minimal order di Semarang sejak 2007.',
    foundingDate: '2007',
    priceRange: 'Rp 150.000 - Rp 5.000.000',
    telephone: '+62-813-9088-8809',
    currenciesAccepted: 'IDR',
    paymentAccepted: 'Cash, Credit Card, QRIS, Bank Transfer',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jl. Simongan Raya No. 109, Pamularsih',
      addressLocality: 'Semarang',
      addressRegion: 'Jawa Tengah',
      postalCode: '50148',
      addressCountry: 'ID',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -6.9942,
      longitude: 110.3956,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '09:00',
        closes: '21:00',
      },
    ],
    department: [
      {
        '@type': 'ClothingStore',
        name: 'Batik Smile Cabang Semarang Atas',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Jl. Sukun Raya No. 23, Banyumanik',
          addressLocality: 'Semarang',
          addressRegion: 'Jawa Tengah',
          postalCode: '50263',
          addressCountry: 'ID',
        },
        telephone: '+62-813-9088-8809',
        openingHours: 'Mo-Su 09:00-21:00',
      },
    ],
    sameAs: [
      'https://www.instagram.com/batiksmile.official',
      'https://wa.me/6281390888809',
    ],
  };
}

/**
 * WebSite Schema with Sitelinks SearchBox
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${ROOT_DOMAIN}/#website`,
    url: ROOT_DOMAIN,
    name: 'Batik Smile Nusantara',
    alternateName: SITE_NAME,
    publisher: {
      '@id': `${ROOT_DOMAIN}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${ROOT_DOMAIN}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'id-ID',
  };
}

/**
 * Product Schema with rich Offer / AggregateOffer details
 * @param {any} product
 */
export function generateProductSchema(product) {
  if (!product) return null;

  const minPrice = product.priceRange?.minVariantPrice?.amount;
  const maxPrice = product.priceRange?.maxVariantPrice?.amount;
  const currency = product.priceRange?.minVariantPrice?.currencyCode || 'IDR';
  const variants = product.variants?.nodes || [];
  const primaryVariant = variants[0] || product.selectedVariant;
  const canonicalUrl = `${ROOT_DOMAIN}/products/${product.handle}`;

  const imageList = (product.images?.nodes || [product.featuredImage])
    .filter(Boolean)
    .map((img) => img.url);

  const cleanDescription = product.description
    ? product.description.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    : `${product.title} dari Butik Batik Smile Semarang.`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${canonicalUrl}#product`,
    name: product.title,
    description: cleanDescription,
    image: imageList.length > 0 ? imageList : [`${ROOT_DOMAIN}/og-image.jpg`],
    url: canonicalUrl,
    sku: primaryVariant?.sku || product.handle,
    brand: {
      '@type': 'Brand',
      name: 'Batik Smile',
    },
    category: 'Apparel & Accessories > Clothing > Traditional & Cultural Clothing > Batik',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: currency,
      lowPrice: minPrice || '0',
      highPrice: maxPrice || minPrice || '0',
      price: minPrice || '0',
      offerCount: variants.length || 1,
      availability: product.availableForSale !== false
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'Batik Smile Nusantara',
      },
      url: canonicalUrl,
    },
  };
}

/**
 * Collection Page & ItemList Schema
 * @param {any} collection
 * @param {Array<any>} [products=[]]
 */
export function generateCollectionSchema(collection, products = []) {
  if (!collection) return null;

  const canonicalUrl = `${ROOT_DOMAIN}/collections/${collection.handle}`;
  const cleanDescription = collection.description
    ? collection.description.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    : `Koleksi ${collection.title} berkualitas tinggi dari Butik Batik Smile Semarang.`;

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: collection.title,
    description: cleanDescription,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: products.length,
      itemListElement: products.map((prod, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${ROOT_DOMAIN}/products/${prod.handle}`,
        name: prod.title,
        ...(prod.featuredImage?.url ? { image: prod.featuredImage.url } : {}),
      })),
    },
  };
}

/**
 * Article / BlogPosting Schema
 * @param {any} article
 * @param {string} [blogHandle='news']
 */
export function generateArticleSchema(article, blogHandle = 'news') {
  if (!article) return null;

  const canonicalUrl = `${ROOT_DOMAIN}/blogs/${blogHandle}/${article.handle}`;
  const cleanExcerpt = article.excerpt
    ? article.excerpt.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    : `${article.title} oleh Batik Smile.`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${canonicalUrl}#article`,
    headline: article.title,
    description: cleanExcerpt,
    image: article.image?.url || `${ROOT_DOMAIN}/og-image.jpg`,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    mainEntityOfPage: canonicalUrl,
    inLanguage: 'id-ID',
    author: {
      '@type': 'Person',
      name: article.author?.name || 'Kurator Wastra Batik Smile',
    },
    publisher: {
      '@id': `${ROOT_DOMAIN}/#organization`,
      '@type': 'Organization',
      name: 'Batik Smile Nusantara',
      logo: {
        '@type': 'ImageObject',
        url: `${ROOT_DOMAIN}/brand/batik-smile-logo.png`,
      },
    },
  };
}

/**
 * BreadcrumbList Schema
 * @param {Array<{ label: string, to?: string }>} items
 */
export function generateBreadcrumbSchema(items = []) {
  if (!items || items.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Beranda',
        item: ROOT_DOMAIN,
      },
      ...items.map((item, idx) => {
        const itemObj = {
          '@type': 'ListItem',
          position: idx + 2,
          name: item.label,
        };
        if (item.to) {
          itemObj.item = item.to.startsWith('http')
            ? item.to
            : `${ROOT_DOMAIN}${item.to.startsWith('/') ? item.to : `/${item.to}`}`;
        }
        return itemObj;
      }),
    ],
  };
}
