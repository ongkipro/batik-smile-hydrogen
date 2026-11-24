import { Link } from 'react-router';
import { Image, Pagination } from '@shopify/hydrogen';
import { urlWithTrackingParams } from '~/lib/search';
import { BoutiqueMoney } from '~/lib/currency';

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
          const blogHandle = article.blog?.handle || 'news';
          const articleUrl = urlWithTrackingParams({
            baseUrl: `/blogs/${blogHandle}/${article.handle}`,
            trackingParams: article.trackingParameters,
            term,
          });

          return (
            <div
              className="p-4 bg-[#FAF8F5] hover:bg-white transition-all group"
              key={article.id}
            >
              <Link prefetch="intent" to={articleUrl} className="block">
                <span className="text-xs uppercase tracking-[0.2em] text-[#9E7D3B] block mb-1 font-semibold">
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
              className="p-4 bg-[#FAF8F5] hover:bg-white transition-all group"
              key={page.id}
            >
              <Link prefetch="intent" to={pageUrl} className="block">
                <span className="font-serif text-base font-normal text-[#111111] group-hover:text-[#C5A059] transition-colors flex items-center justify-between">
                  <span>{page.title}</span>
                  <span className="text-[#C5A059] group-hover:translate-x-1 transition-transform">&rarr;</span>
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
        <h3 className="text-sm sm:text-base uppercase font-semibold tracking-[0.2em] text-[#9E7D3B]">
          PRODUK &amp; KARYA BATIK
        </h3>
      </div>

      <Pagination connection={products}>
        {({ nodes, isLoading, NextLink, PreviousLink }) => {
          return (
            <div>
              <div className="text-center mb-6">
                <PreviousLink className="inline-block px-6 py-2.5 bg-white border border-[#E2DFD8] text-xs uppercase font-semibold tracking-[0.16em] text-[#111111] hover:border-[#111111] transition-colors">
                  {isLoading ? 'MEMUAT...' : '↑ LIHAT SEBELUMNYA'}
                </PreviousLink>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10">
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
                      className="group relative flex flex-col justify-between h-full bg-transparent"
                      key={product.id}
                    >
                      {/* Frameless 4:5 Portrait Media */}
                      <Link prefetch="intent" to={productUrl} className="relative block w-full aspect-[4/5] overflow-hidden bg-[#EFECE6]">
                        {image ? (
                          <Image
                            data={image}
                            alt={product.title}
                            aspectRatio="4/5"
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                        ) : (
                          <img
                            src="/banners/hero_editorial_banner.jpg"
                            alt={product.title}
                            className="w-full h-full object-cover opacity-80"
                          />
                        )}

                        {/* Minimalist Hover Quick View Action */}
                        <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-gradient-to-t from-black/65 via-black/25 to-transparent">
                          <div className="w-full py-3 px-3 text-xs font-bold uppercase tracking-[0.2em] text-center bg-[#111111] text-white hover:bg-[#C5A059] hover:text-[#111111] transition-colors shadow-sm">
                            LIHAT DETAIL
                          </div>
                        </div>
                      </Link>

                      {/* Editorial Metadata */}
                      <div className="pt-3.5 pb-1 flex flex-col flex-grow justify-between text-center items-center">
                        <div>
                          <span className="text-xs uppercase tracking-[0.22em] text-[#7C3F1D] font-semibold block mb-1.5">
                            BATIK SMILE
                          </span>
                          <Link
                            prefetch="intent"
                            to={productUrl}
                            className="block font-serif text-base sm:text-lg font-normal text-[#111111] line-clamp-2 leading-snug group-hover:text-[#9E7D3B] transition-colors"
                          >
                            {product.title}
                          </Link>
                        </div>

                        <div className="mt-2.5 text-center">
                          <span className="text-sm sm:text-base font-semibold text-[#111111] tracking-wide">
                            {price && <BoutiqueMoney data={price} />}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-center mt-10">
                <NextLink className="inline-block px-8 py-3 bg-[#111111] hover:bg-[#C5A059] text-white hover:text-[#111111] text-xs uppercase font-semibold tracking-[0.18em] transition-colors">
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
