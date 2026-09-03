import React from 'react';
import { Link, useLoaderData, NavLink } from 'react-router';
import { Image, getPaginationVariables } from '@shopify/hydrogen';
import { PaginatedResourceSection } from '~/components/PaginatedResourceSection';

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
    pageBy: 12,
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
    <div className="bg-[#FAF8F5] min-h-screen text-[#111111] py-16 sm:py-24 px-4 sm:px-8 lg:px-12 xl:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="text-[10px] text-[#5A5550] uppercase tracking-[0.2em] mb-10 flex items-center gap-2">
          <NavLink to="/" className="hover:text-[#9E7D3B] transition-colors">
            BERANDA
          </NavLink>
          <span>/</span>
          <span className="text-[#111111] font-semibold uppercase">
            JURNAL &amp; WARTA
          </span>
        </nav>

        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#9E7D3B] font-semibold block mb-2">
            CATATAN &amp; ARSIP KEBUDAYAAN
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-wide text-[#111111] mb-4 leading-tight">
            Jurnal Batik Nusantara
          </h1>
          <div className="w-12 h-px bg-[#C5A059] mx-auto my-4" />
          <p className="text-xs sm:text-sm text-[#5A5550] font-light leading-relaxed">
            Menelusuri sejarah canting malam, makna filosofis motif Jawa, etika berbusana resmi, serta panduan praktis merawat busana batik warisan leluhur.
          </p>
        </div>

        {/* Grand Featured Hero Article */}
        {featuredArticle && (
          <div className="mb-16 sm:mb-20">
            <FeaturedHeroCard article={featuredArticle} blogHandle={blogHandle} />
          </div>
        )}

        {/* Section Divider & Curatorial Label */}
        <div className="flex items-center justify-between border-b border-[#E2DFD8] pb-4 mb-10">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#C5A059]" />
            <h2 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#111111]">
              SELURUH ARSIP ARTIKEL
            </h2>
          </div>
          <span className="text-[10px] uppercase tracking-[0.16em] text-[#888888]">
            {articles.length} ARTIKEL TERKURASI
          </span>
        </div>

        {/* Paginated Articles Grid */}
        <PaginatedResourceSection
          connection={articlesConnection}
          resourcesClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
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
 * FeaturedHeroCard: Wide Landscape Editorial Hero
 */
function FeaturedHeroCard({ article, blogHandle }) {
  const targetUrl = `/blogs/${article.blog?.handle || blogHandle}/${article.handle}`;
  const publishedDate = new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(article.publishedAt));

  return (
    <article className="group relative bg-[#111111] border border-[#C5A059]/40 hover:border-[#C5A059] transition-all duration-500 overflow-hidden shadow-sm hover:shadow-[0_16px_40px_rgba(197,160,89,0.18)]">
      <Link to={targetUrl} className="block lg:grid lg:grid-cols-12 items-stretch">
        {/* Media Container (7 Cols on Desktop) */}
        <div className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:min-h-[440px] w-full overflow-hidden bg-[#111111]">
          {article.image ? (
            <Image
              alt={article.image.altText || article.title}
              data={article.image}
              loading="eager"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-85 group-hover:opacity-100"
            />
          ) : (
            <img
              src="/banners/hero_editorial_banner.jpg"
              alt={article.title}
              className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden" />
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/70 backdrop-blur-md border border-[#C5A059]/60 text-[9px] uppercase tracking-[0.2em] text-[#C5A059] font-bold">
              <span>◆</span>
              MAHASOROT EDITORIAL
            </span>
          </div>
        </div>

        {/* Text Container (5 Cols on Desktop) */}
        <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between text-white border-t lg:border-t-0 lg:border-l border-[#C5A059]/30">
          <div>
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[#9E7D3B] font-medium mb-3">
              <time dateTime={article.publishedAt}>{publishedDate}</time>
              <span>&bull;</span>
              <span>{article.author?.name || 'Batik Smile Editorial'}</span>
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

          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#C5A059] font-semibold">
            <span>BACA ARTIKEL UTAMA</span>
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
 * EditorialArticleCard: 3-Column Zero-Radius Quiet Luxury Card
 */
function EditorialArticleCard({ article, blogHandle, loading }) {
  const targetUrl = `/blogs/${article.blog?.handle || blogHandle}/${article.handle}`;
  const publishedDate = new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(article.publishedAt));

  return (
    <article className="group relative flex flex-col bg-white border border-[#E2DFD8] hover:border-[#C5A059] transition-all duration-500 overflow-hidden shadow-sm hover:shadow-[0_12px_32px_rgba(197,160,89,0.14)]">
      <Link to={targetUrl} className="flex-1 flex flex-col">
        {/* Media 16:10 */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#111111]">
          {article.image ? (
            <Image
              alt={article.image.altText || article.title}
              data={article.image}
              loading={loading}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
            />
          ) : (
            <img
              src="/banners/hero_editorial_banner.jpg"
              alt={article.title}
              className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-3.5 left-3.5 z-10">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-black/70 backdrop-blur-md border border-[#C5A059]/40 text-[8px] sm:text-[9px] uppercase tracking-[0.18em] text-[#C5A059] font-bold">
              <span>◆</span>
              JURNAL BUDAYA
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-[#9E7D3B] font-medium mb-2.5">
              <time dateTime={article.publishedAt}>{publishedDate}</time>
              <span className="text-[#888888]">{article.author?.name || 'Batik Smile'}</span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#111111] group-hover:text-[#C5A059] transition-colors leading-snug mb-3 line-clamp-2">
              {article.title}
            </h3>

            {article.excerpt && (
              <p className="text-xs sm:text-sm text-[#5A5550] font-light leading-relaxed line-clamp-3 mb-4">
                {article.excerpt}
              </p>
            )}
          </div>

          <div className="pt-3 border-t border-[#F0ECE1] flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-[#111111] font-semibold group-hover:text-[#C5A059] transition-colors">
            <span>BACA SELENGKAPNYA</span>
            <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">
              &rarr;
            </span>
          </div>
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
