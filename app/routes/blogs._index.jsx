import React from 'react';
import { Link, useLoaderData } from 'react-router';
import { Image, getPaginationVariables } from '@shopify/hydrogen';
import { PaginatedResourceSection } from '~/components/PaginatedResourceSection';
import { Breadcrumb } from '~/components/Breadcrumb';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [
    { title: 'Warta & Jurnal Kebudayaan — Butik Batik Smile Semarang' },
    {
      name: 'description',
      content:
        'Kumpulan artikel, jurnal batik tulis, filosofi motif Jawa, etika berbusana, dan panduan perawatan busana batik dari Butik Batik Smile Semarang.',
    },
  ];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  const criticalData = await loadCriticalData(args);
  return { ...criticalData };
}

/**
 * @param {Route.LoaderArgs}
 */
async function loadCriticalData({ context, request }) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 9,
  });

  const [{ blogs }] = await Promise.all([
    context.storefront.query(BLOGS_PAGE_QUERY, {
      variables: {
        ...paginationVariables,
      },
    }),
  ]);

  const primaryBlog = blogs?.nodes?.[0] || null;
  const articlesConnection = primaryBlog?.articles || { nodes: [] };
  const blogHandle = primaryBlog?.handle || 'news';

  return {
    blog: primaryBlog,
    articlesConnection,
    blogHandle,
  };
}

export default function BlogsIndex() {
  /** @type {LoaderReturnData} */
  const { _blog, articlesConnection, blogHandle } = useLoaderData();

  const articles = articlesConnection?.nodes || [];
  const featuredArticle = articles.length > 0 ? articles[0] : null;

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#111111] py-12 sm:py-16 px-4 sm:px-8 lg:px-12 xl:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Minimalist Breadcrumbs */}
        <Breadcrumb items={[{ label: 'JURNAL & WARTA' }]} />

        {/* Editorial Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-wide text-[#111111] mb-3 leading-tight">
            Catatan &amp; Filosofi Wastra
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5550] font-light leading-relaxed">
            Menelusuri sejarah canting malam, makna adiluhung motif keraton, etika berbusana, serta panduan perawatan busana batik warisan leluhur.
          </p>
        </div>

        {/* Grand Featured Hero Article (3:2 Aspect Ratio Locked) */}
        {featuredArticle && (
          <div className="mb-14 sm:mb-16">
            <FeaturedHeroCard article={featuredArticle} blogHandle={blogHandle} />
          </div>
        )}

        {/* Archive Label */}
        <div className="flex items-center justify-between pb-3 mb-8 border-b border-[#E2DFD8]">
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#111111]">
            ARSIP TULISAN TERKURASI
          </span>
          <span className="text-[10px] uppercase tracking-[0.16em] text-[#9E7D3B] font-medium">
            {articles.length} CATATAN
          </span>
        </div>

        {/* Paginated Frameless Articles Grid (3:2 Aspect Ratio Locked, 3x3 Grid = 9 Items) */}
        <PaginatedResourceSection
          connection={articlesConnection}
          resourcesClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          loadMoreText="MUAT LEBIH BANYAK CATATAN"
          loadPreviousText="CATATAN SEBELUMNYA"
          badgeText="ARSIP JURNAL BUDAYA"
          captionText="Menampilkan arsip catatan makna motif, filosofi adiluhung, serta etika berbusana batik"
        >
          {({ node: article, index }) => (
            <EditorialArticleCard
              article={article}
              key={article.id}
              blogHandle={blogHandle}
              loading={index < 3 ? 'eager' : 'lazy'}
            />
          )}
        </PaginatedResourceSection>
      </div>
    </div>
  );
}

/**
 * FeaturedHeroCard: Wide Landscape Editorial Hero (Locked 3:2 Aspect Ratio)
 */
function FeaturedHeroCard({ article, blogHandle }) {
  const targetUrl = `/blogs/${article.blog?.handle || blogHandle}/${article.handle}`;
  const publishedDate = new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(article.publishedAt));

  return (
    <article className="group relative bg-[#111111] overflow-hidden shadow-sm hover:shadow-[0_16px_40px_rgba(197,160,89,0.18)] transition-all duration-500">
      <Link to={targetUrl} className="block lg:grid lg:grid-cols-12 items-stretch no-underline">
        {/* Media Container (7 Cols on Desktop, Locked 3:2 Aspect Ratio) */}
        <div className="lg:col-span-7 relative aspect-[3/2] w-full overflow-hidden bg-[#111111]">
          {article.image ? (
            <Image
              alt={article.image.altText || article.title}
              data={article.image}
              loading="eager"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
            />
          ) : (
            <img
              src="/banners/hero_editorial_banner.jpg"
              alt={article.title}
              className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden" />
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/75 backdrop-blur-md border border-[#C5A059]/50 text-[9px] uppercase tracking-[0.2em] text-[#C5A059] font-bold">
              <span className="w-1.5 h-1.5 bg-[#C5A059]" />
              ULASAN UTAMA
            </span>
          </div>
        </div>

        {/* Text Container (5 Cols on Desktop) */}
        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between text-white border-t lg:border-t-0 lg:border-l border-white/10">
          <div>
            <div className="flex items-center gap-2.5 text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-medium mb-3">
              <time dateTime={article.publishedAt}>{publishedDate}</time>
              <span>•</span>
              <span className="text-[#A69F96]">
                {article.author?.name || 'Batik Smile Editorial'}
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white group-hover:text-[#C5A059] transition-colors leading-tight mb-4">
              {article.title}
            </h2>

            {article.excerpt && (
              <p className="text-xs sm:text-sm text-[#E2DFD8] font-light leading-relaxed mb-6 line-clamp-3">
                {article.excerpt}
              </p>
            )}
          </div>

          <div className="pt-4 border-t border-white/15 flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#C5A059] font-semibold">
            <span>BACA ULASAN LENGKAP</span>
            <span className="transform group-hover:translate-x-2 transition-transform duration-300">
              &rarr;
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

/**
 * EditorialArticleCard: Frameless Minimalist Card (Locked 3:2 Aspect Ratio)
 */
function EditorialArticleCard({ article, blogHandle, loading }) {
  const targetUrl = `/blogs/${article.blog?.handle || blogHandle}/${article.handle}`;
  const publishedDate = new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(article.publishedAt));

  return (
    <article className="group flex flex-col">
      <Link to={targetUrl} className="block no-underline">
        {/* Frameless Media (Locked 3:2 Ratio) */}
        <div className="relative aspect-[3/2] w-full overflow-hidden bg-[#111111] mb-4">
          {article.image ? (
            <Image
              alt={article.image.altText || article.title}
              data={article.image}
              loading={loading}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-95 group-hover:opacity-100"
            />
          ) : (
            <img
              src="/banners/hero_editorial_banner.jpg"
              alt={article.title}
              className="w-full h-full object-cover opacity-95 group-hover:scale-105 transition-transform duration-700"
            />
          )}
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[#9E7D3B] font-semibold mb-2">
          <time dateTime={article.publishedAt}>{publishedDate}</time>
          <span className="text-[#A69F96]">•</span>
          <span className="text-[#A69F96] font-normal">
            {article.author?.name || 'Batik Smile'}
          </span>
        </div>

        {/* Pure Serif Editorial Headline */}
        <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#111111] group-hover:text-[#9E7D3B] transition-colors leading-snug mb-2.5 line-clamp-2">
          {article.title}
        </h3>

        {/* Narrative Excerpt */}
        {article.excerpt && (
          <p className="text-xs sm:text-sm text-[#5A5550] font-light leading-relaxed line-clamp-3 mb-4">
            {article.excerpt}
          </p>
        )}

        {/* Subtle Text Action Link */}
        <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-[#111111] group-hover:text-[#9E7D3B] transition-colors">
          <span className="border-b border-[#111111]/30 group-hover:border-[#9E7D3B] pb-0.5 transition-colors">
            BACA CATATAN
          </span>
          <span className="transform group-hover:translate-x-1 transition-transform duration-300">
            &rarr;
          </span>
        </div>
      </Link>
    </article>
  );
}

const BLOGS_PAGE_QUERY = `#graphql
  query BlogsPage(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    blogs(first: 1) {
      nodes {
        id
        title
        handle
        seo {
          title
          description
        }
        articles(
          first: $first
          last: $last
          before: $startCursor
          after: $endCursor
          sortKey: PUBLISHED_AT
          reverse: true
        ) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          nodes {
            id
            title
            handle
            publishedAt
            excerpt
            blog {
              handle
            }
            image {
              id
              url
              altText
              width
              height
            }
            author: authorV2 {
              name
            }
          }
        }
      }
    }
  }
`;

/** @typedef {import('./+types/blogs._index').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
