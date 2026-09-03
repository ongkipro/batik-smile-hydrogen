import { Link } from 'react-router';
import { Image, Money, Pagination } from '@shopify/hydrogen';
import { urlWithTrackingParams } from '~/lib/search';

/**
 * @param {Omit<SearchResultsProps, 'error' | 'type'>}
 */
export function SearchResults({ term, result, children }) {
  if (!result?.total) {
    return null;
  }

  if (children) {
    return children({ ...result.items, term });
  }

  return (
    <div className="space-y-12">
      {result.items?.products && (
        <SearchResultsProducts term={term} products={result.items.products} />
      )}
      {result.items?.articles && (
        <SearchResultsArticles term={term} articles={result.items.articles} />
      )}
      {result.items?.pages && (
        <SearchResultsPages term={term} pages={result.items.pages} />
      )}
    </div>
  );
}

SearchResults.Articles = SearchResultsArticles;
SearchResults.Pages = SearchResultsPages;
SearchResults.Products = SearchResultsProducts;
SearchResults.Empty = SearchResultsEmpty;

/**
 * @param {PartialSearchResult<'articles'>}
 */
function SearchResultsArticles({ term, articles }) {
  if (!articles?.nodes.length) {
    return null;
  }

  return (
    <div className="pt-8 border-t border-[#E2DFD8]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xs uppercase font-semibold tracking-[0.2em] text-[#9E7D3B]">
          ARTIKEL &amp; JURNAL
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {articles.nodes.map((article) => {
          const articleUrl = urlWithTrackingParams({
            baseUrl: `/blogs/${article.handle}`,
            trackingParams: article.trackingParameters,
            term,
          });

          return (
            <div
              className="p-5 bg-white border border-[#E2DFD8] hover:border-[#111111] transition-all"
              key={article.id}
            >
              <Link prefetch="intent" to={articleUrl} className="block group">
                <span className="text-[9px] uppercase tracking-wider text-[#A69F96] block mb-1">
                  CATATAN BUDAYA
                </span>
                <h4 className="font-serif text-lg font-normal text-[#111111] group-hover:text-[#C5A059] transition-colors leading-snug">
                  {article.title}
                </h4>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * @param {PartialSearchResult<'pages'>}
 */
function SearchResultsPages({ term, pages }) {
  if (!pages?.nodes.length) {
    return null;
  }

  return (
    <div className="pt-8 border-t border-[#E2DFD8]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xs uppercase font-semibold tracking-[0.2em] text-[#9E7D3B]">
          HALAMAN RESMI BUTIK
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {pages.nodes.map((page) => {
          const pageUrl = urlWithTrackingParams({
            baseUrl: `/pages/${page.handle}`,
            trackingParams: page.trackingParameters,
            term,
          });

          return (
            <div
              className="p-4 bg-white border border-[#E2DFD8] hover:border-[#111111] transition-all"
              key={page.id}
            >
              <Link prefetch="intent" to={pageUrl} className="block group">
                <span className="font-serif text-base font-normal text-[#111111] group-hover:text-[#C5A059] transition-colors">
                  {page.title} &rarr;
                </span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * @param {PartialSearchResult<'products'>}
 */
function SearchResultsProducts({ term, products }) {
  if (!products?.nodes.length) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xs uppercase font-semibold tracking-[0.2em] text-[#9E7D3B]">
          PRODUK &amp; KARYA BATIK ({products.nodes.length})
        </h3>
      </div>

      <Pagination connection={products}>
        {({ nodes, isLoading, NextLink, PreviousLink }) => {
          return (
            <div>
              <div className="text-center mb-6">
                <PreviousLink className="inline-block px-6 py-2.5 bg-white border border-[#E2DFD8] text-[10px] uppercase font-semibold tracking-[0.16em] text-[#111111] hover:border-[#111111] transition-colors">
                  {isLoading ? 'MEMUAT...' : '↑ LIHAT SEBELUMNYA'}
                </PreviousLink>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {nodes.map((product) => {
                  const productUrl = urlWithTrackingParams({
                    baseUrl: `/products/${product.handle}`,
                    trackingParams: product.trackingParameters,
                    term,
                  });

                  const price =
                    product?.selectedOrFirstAvailableVariant?.price ||
                    product?.priceRange?.minVariantPrice;
                  const image =
                    product?.selectedOrFirstAvailableVariant?.image ||
                    product?.featuredImage;

                  return (
                    <div
                      className="group bg-white border border-[#E2DFD8] hover:border-[#111111] transition-all overflow-hidden flex flex-col"
                      key={product.id}
                    >
                      <Link prefetch="intent" to={productUrl} className="block">
                        <div className="relative aspect-[4/5] bg-[#111111] overflow-hidden">
                          {image ? (
                            <Image
                              data={image}
                              alt={product.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <img
                              src="/banners/hero_editorial_banner.jpg"
                              alt={product.title}
                              className="w-full h-full object-cover opacity-80"
                            />
                          )}
                        </div>

                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <span className="text-[9px] uppercase tracking-[0.18em] text-[#9E7D3B] font-semibold block mb-1">
                              BATIK SMILE
                            </span>
                            <h4 className="font-serif text-sm font-normal text-[#111111] line-clamp-2 leading-snug group-hover:text-[#C5A059] transition-colors">
                              {product.title}
                            </h4>
                          </div>

                          <div className="mt-3 pt-3 border-t border-[#E2DFD8] flex items-center justify-between">
                            <span className="text-xs font-semibold text-[#111111]">
                              {price && <Money data={price} withoutTrailingZeros as="span" />}
                            </span>
                            <span className="text-[10px] text-[#A69F96] group-hover:text-[#111111] transition-colors">
                              LIHAT &rarr;
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>

              <div className="text-center mt-10">
                <NextLink className="inline-block px-8 py-3 bg-[#111111] hover:bg-[#C5A059] text-white hover:text-[#111111] text-[10px] uppercase font-semibold tracking-[0.18em] transition-colors">
                  {isLoading ? 'MEMUAT...' : 'MUAT LEBIH BANYAK ↓'}
                </NextLink>
              </div>
            </div>
          );
        }}
      </Pagination>
    </div>
  );
}

function SearchResultsEmpty() {
  return (
    <div className="text-center py-12 bg-white border border-[#E2DFD8] p-6">
      <p className="text-xs text-[#5A5550]">
        Tidak ada hasil yang cocok. Silakan coba kata kunci lain.
      </p>
    </div>
  );
}

/** @typedef {RegularSearchReturn['result']['items']} SearchItems */
/**
 * @typedef {Pick<
 *   SearchItems,
 *   ItemType
 * > &
 *   Pick<RegularSearchReturn, 'term'>} PartialSearchResult
 * @template {keyof SearchItems} ItemType
 */
/**
 * @typedef {RegularSearchReturn & {
 *   children?: (args: SearchItems & {term: string}) => React.ReactNode;
 * }} SearchResultsProps
 */

/** @typedef {import('~/lib/search').RegularSearchReturn} RegularSearchReturn */
