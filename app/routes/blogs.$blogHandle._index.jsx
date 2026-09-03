import { Link, useLoaderData, NavLink } from 'react-router';
import { Image, getPaginationVariables } from '@shopify/hydrogen';
import { PaginatedResourceSection } from '~/components/PaginatedResourceSection';
import { redirectIfHandleIsLocalized } from '~/lib/redirect';

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({ data }) => {
  return [{ title: `${data?.blog.title ?? 'Jurnal'} — Butik Batik Smile Nusantara` }];
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
async function loadCriticalData({ context, request, params }) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 12,
  });

  if (!params.blogHandle) {
    throw new Response('Blog tidak ditemukan', { status: 404 });
  }

  const [{ blog }] = await Promise.all([
    context.storefront.query(BLOGS_QUERY, {
      variables: {
        blogHandle: params.blogHandle,
        ...paginationVariables,
      },
    }),
  ]);

  if (!blog?.articles) {
    throw new Response('Not found', { status: 404 });
  }

  redirectIfHandleIsLocalized(request, { handle: params.blogHandle, data: blog });

  return { blog };
}

export default function Blog() {
  /** @type {LoaderReturnData} */
  const { blog } = useLoaderData();
  const { articles } = blog;

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#111111] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-[10px] text-[#5A5550] uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
          <NavLink to="/" className="hover:text-[#9E7D3B]">
            BERANDA
          </NavLink>
          <span>/</span>
          <NavLink to="/blogs" className="hover:text-[#9E7D3B]">
            JURNAL
          </NavLink>
          <span>/</span>
          <span className="text-[#111111] font-semibold uppercase">{blog.title}</span>
        </nav>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E7D3B] font-semibold block mb-2">
            ARSIP TULISAN RESMI
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-wide text-[#111111] mb-4">
            {blog.title}
          </h1>
          <div className="w-12 h-px bg-[#C5A059] mx-auto mt-4 mb-4" />
        </div>

        {/* Articles Grid (0px Radius) */}
        <PaginatedResourceSection
          connection={articles}
          resourcesClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {({ node: article, index }) => (
            <ArticleItem
              article={article}
              key={article.id}
              loading={index < 3 ? 'eager' : 'lazy'}
            />
          )}
        </PaginatedResourceSection>
      </div>
    </div>
  );
}

/**
 * @param {{
 *   article: ArticleItemFragment;
 *   loading?: HTMLImageElement['loading'];
 * }}
 */
function ArticleItem({ article, loading }) {
  const publishedAt = new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(article.publishedAt));

  return (
    <article className="group relative flex flex-col bg-white border border-[#E2DFD8] hover:border-[#C5A059] transition-all duration-500 overflow-hidden shadow-sm hover:shadow-[0_12px_32px_rgba(197,160,89,0.14)]">
      <Link to={`/blogs/${article.blog.handle}/${article.handle}`} className="flex-1 flex flex-col">
        <div className="relative aspect-[16/10] bg-[#111111] overflow-hidden">
          {article.image ? (
            <Image
              alt={article.image.altText || article.title}
              data={article.image}
              loading={loading}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
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

        <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-[#9E7D3B] font-medium mb-2.5">
              <time dateTime={article.publishedAt}>{publishedAt}</time>
              <span className="text-[#888888]">{article.author?.name || 'Batik Smile'}</span>
            </div>

            <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#111111] group-hover:text-[#C5A059] transition-colors leading-snug mb-3 line-clamp-2">
              {article.title}
            </h2>

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

const BLOGS_QUERY = `#graphql
  query Blog(
    $language: LanguageCode
    $blogHandle: String!
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(language: $language) {
    blog(handle: $blogHandle) {
      title
      handle
      seo {
        title
        description
      }
      articles(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ArticleItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
  fragment ArticleItem on Article {
    author: authorV2 {
      name
    }
    contentHtml
    handle
    id
    image {
      id
      altText
      url
      width
      height
    }
    publishedAt
    title
    blog {
      handle
    }
  }
`;

/** @typedef {import('./+types/blogs.$blogHandle._index').Route} Route */
/** @typedef {import('storefrontapi.generated').ArticleItemFragment} ArticleItemFragment */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
