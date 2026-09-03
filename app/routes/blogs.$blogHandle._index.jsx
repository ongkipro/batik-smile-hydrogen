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
    <article className="bg-white border border-[#E2DFD8] hover:border-[#111111] shadow-sm hover:shadow-md transition-all group block overflow-hidden">
      <Link to={`/blogs/${article.blog.handle}/${article.handle}`} className="block">
        <div className="relative aspect-[16/10] bg-[#111111] overflow-hidden">
          {article.image ? (
            <Image
              alt={article.image.altText || article.title}
              data={article.image}
              loading={loading}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <img
              src="/banners/hero_editorial_banner.jpg"
              alt={article.title}
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            />
          )}
        </div>

        <div className="p-6">
          <time className="text-[10px] uppercase tracking-wider text-[#9E7D3B] font-medium block mb-2">
            {publishedAt}
          </time>
          <h2 className="font-serif text-xl font-normal text-[#111111] group-hover:text-[#C5A059] transition-colors leading-snug mb-3">
            {article.title}
          </h2>
          <span className="text-[10px] uppercase tracking-[0.16em] text-[#111111] font-semibold inline-flex items-center gap-1 group-hover:text-[#9E7D3B] transition-colors">
            BACA SELENGKAPNYA &rarr;
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
