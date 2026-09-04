import { Link, useLoaderData, redirect } from 'react-router';
import { Image, getPaginationVariables } from '@shopify/hydrogen';
import { PaginatedResourceSection } from '~/components/PaginatedResourceSection';
import { redirectIfHandleIsLocalized } from '~/lib/redirect';
import { Breadcrumb } from '~/components/Breadcrumb';
import { generateBlogMeta } from '~/lib/seo';

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({ data }) => {
  return generateBlogMeta(data?.blog);
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
    pageBy: 9,
  });

  if (!params.blogHandle) {
    throw new Response('Blog tidak ditemukan', { status: 404 });
  }

  if (params.blogHandle === 'jurnal') {
    throw redirect('/blogs', 301);
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
  const articlesList = articles?.nodes || [];

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#111111] py-12 sm:py-16 px-4 sm:px-8 lg:px-12 xl:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Minimalist Breadcrumbs */}
        <Breadcrumb
          items={[
            { label: 'JURNAL', to: '/blogs' },
            { label: blog.title.toUpperCase() },
          ]}
        />

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-wide text-[#111111] mb-3 leading-tight">
            {blog.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5550] font-light leading-relaxed">
            Arsip tulisan resmi, catatan filosofi motif, etika berbusana, serta warta kebudayaan Butik Batik Smile Nusantara.
          </p>
        </div>

        {/* Curatorial Archive Label */}
        <div className="flex items-center justify-between pb-3 mb-8 border-b border-[#E2DFD8]">
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#111111]">
            DAFTAR ARTIKEL TERKURASI
          </span>
          <span className="text-[10px] uppercase tracking-[0.16em] text-[#9E7D3B] font-medium">
            {articlesList.length} TULISAN
          </span>
        </div>

        {/* Frameless Articles Grid (Locked 3:2 Aspect Ratio, 3x3 Grid = 9 Items) */}
        <PaginatedResourceSection
          connection={articles}
          resourcesClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          loadMoreText="MUAT LEBIH BANYAK CATATAN"
          loadPreviousText="CATATAN SEBELUMNYA"
          badgeText="ARSIP JURNAL BUDAYA"
          captionText="Menampilkan arsip catatan makna motif, filosofi adiluhung, serta etika berbusana batik"
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
 * ArticleItem: Frameless Minimalist Card (Locked 3:2 Aspect Ratio)
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
    <article className="group flex flex-col">
      <Link to={`/blogs/${article.blog.handle}/${article.handle}`} className="block no-underline">
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
          <time dateTime={article.publishedAt}>{publishedAt}</time>
          <span className="text-[#A69F96]">•</span>
          <span className="text-[#A69F96] font-normal">
            {article.author?.name || 'Batik Smile'}
          </span>
        </div>

        {/* Pure Serif Editorial Headline */}
        <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#111111] group-hover:text-[#9E7D3B] transition-colors leading-snug mb-2.5 line-clamp-2">
          {article.title}
        </h2>

        {/* Narrative Excerpt */}
        {article.contentHtml && (
          <p className="text-xs sm:text-sm text-[#5A5550] font-light leading-relaxed line-clamp-3 mb-4">
            {article.contentHtml.replace(/<[^>]*>?/gm, '').slice(0, 140)}...
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
