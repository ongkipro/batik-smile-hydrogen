import {Await, Link} from 'react-router';
import {Suspense, useId} from 'react';
import {Aside} from '~/components/Aside';
import {Footer} from '~/components/Footer';
import {Header, HeaderMenu} from '~/components/Header';
import {CartMain} from '~/components/CartMain';
import {MobileNavigation} from '~/components/MobileNavigation';
import {
  SEARCH_ENDPOINT,
  SearchFormPredictive,
} from '~/components/SearchFormPredictive';
import {SearchResultsPredictive} from '~/components/SearchResultsPredictive';

import {WhatsAppConcierge} from '~/components/WhatsAppConcierge';

/**
 * @param {PageLayoutProps}
 */
export function PageLayout({
  cart,
  children = null,
  footer,
  header,
  isLoggedIn,
  publicStoreDomain,
}) {
  return (
    <Aside.Provider>
      <CartAside cart={cart} />
      <SearchAside />
      <MobileMenuAside header={header} publicStoreDomain={publicStoreDomain} />
      {header && (
        <Header
          header={header}
          cart={cart}
          isLoggedIn={isLoggedIn}
          publicStoreDomain={publicStoreDomain}
        />
      )}
      <main className="min-h-screen">{children}</main>
      <Footer
        footer={footer}
        header={header}
        publicStoreDomain={publicStoreDomain}
      />
      <MobileNavigation />
      <WhatsAppConcierge />
    </Aside.Provider>
  );
}

/**
 * @param {{cart: PageLayoutProps['cart']}}
 */
function CartAside({cart}) {
  return (
    <Aside type="cart" heading="TAS BELANJA">
      <Suspense fallback={<p className="p-4 text-xs text-neutral-500">Memuat keranjang belanja ...</p>}>
        <Await resolve={cart}>
          {(cart) => {
            return <CartMain cart={cart} layout="aside" />;
          }}
        </Await>
      </Suspense>
    </Aside>
  );
}

function SearchAside() {
  const queriesDatalistId = useId();
  return (
    <Aside type="search" heading="CARI PRODUK">
      <div className="predictive-search p-4 sm:p-6 bg-[#FAF8F5] min-h-full">
        <div className="mb-6">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E7D3B] font-semibold block mb-2">
            PENCARIAN BUTIK
          </span>
          <p className="text-xs text-[#5A5550] font-light">
            Ketik motif, koleksi sarimbit, atau jenis bahan kain.
          </p>
        </div>
        <SearchFormPredictive>
          {({fetchResults, goToSearch, inputRef}) => (
            <div className="flex border border-[#E2DFD8] bg-white shadow-sm focus-within:border-[#111111] transition-all mb-8">
              <input
                name="q"
                onChange={fetchResults}
                onFocus={fetchResults}
                placeholder="Contoh: Sarimbit, Tulis..."
                ref={inputRef}
                type="search"
                list={queriesDatalistId}
                className="flex-1 px-4 py-3 text-xs sm:text-sm bg-transparent outline-none placeholder-[#A69F96] text-[#111111]"
              />
              <button
                onClick={goToSearch}
                className="px-6 py-3 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors cursor-pointer shadow-sm"
              >
                CARI
              </button>
            </div>
          )}
        </SearchFormPredictive>

        <SearchResultsPredictive>
          {({items, total, term, state, closeSearch}) => {
            const {articles, collections, pages, products, queries} = items;

            if (state === 'loading' && term.current) {
              return <div className="text-xs text-[#5A5550] tracking-widest uppercase">Sedang mencari...</div>;
            }

            if (!total) {
              return <SearchResultsPredictive.Empty term={term} />;
            }

            return (
              <div className="mt-4">
                <SearchResultsPredictive.Queries
                  queries={queries}
                  queriesDatalistId={queriesDatalistId}
                />
                <SearchResultsPredictive.Products
                  products={products}
                  closeSearch={closeSearch}
                  term={term}
                />
                <SearchResultsPredictive.Collections
                  collections={collections}
                  closeSearch={closeSearch}
                  term={term}
                />
                <SearchResultsPredictive.Pages
                  pages={pages}
                  closeSearch={closeSearch}
                  term={term}
                />
                <SearchResultsPredictive.Articles
                  articles={articles}
                  closeSearch={closeSearch}
                  term={term}
                />
                {term.current && total ? (
                  <div className="mt-8 pt-4 border-t border-[#E2DFD8] text-center">
                    <Link
                      onClick={closeSearch}
                      to={`${SEARCH_ENDPOINT}?q=${term.current}`}
                      className="inline-block px-6 py-3 bg-white border border-[#111111] hover:bg-[#111111] !text-[#111111] hover:!text-white text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors w-full"
                    >
                      LIHAT SEMUA {total} HASIL &rarr;
                    </Link>
                  </div>
                ) : null}
              </div>
            );
          }}
        </SearchResultsPredictive>
      </div>
    </Aside>
  );
}

/**
 * @param {{
 *   header: PageLayoutProps['header'];
 *   publicStoreDomain: PageLayoutProps['publicStoreDomain'];
 * }}
 */
function MobileMenuAside({header, publicStoreDomain}) {
  return (
    header.menu &&
    header.shop.primaryDomain?.url && (
      <Aside type="mobile" heading="MENU">
        <HeaderMenu
          menu={header.menu}
          viewport="mobile"
          primaryDomainUrl={header.shop.primaryDomain.url}
          publicStoreDomain={publicStoreDomain}
        />
      </Aside>
    )
  );
}

/**
 * @typedef {Object} PageLayoutProps
 * @property {Promise<CartApiQueryFragment|null>} cart
 * @property {Promise<FooterQuery|null>} footer
 * @property {HeaderQuery} header
 * @property {Promise<boolean>} isLoggedIn
 * @property {string} publicStoreDomain
 * @property {React.ReactNode} [children]
 */

/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
