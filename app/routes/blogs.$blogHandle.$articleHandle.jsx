import { useLoaderData, NavLink } from 'react-router';
import { Image } from '@shopify/hydrogen';
import { redirectIfHandleIsLocalized } from '~/lib/redirect';

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({ data }) => {
  return [
    { title: `${data?.article.title ?? 'Artikel'} — Butik Batik Smile Nusantara` },
    {
      name: 'description',
      content:
        data?.article.seo?.description ||
        'Artikel kebudayaan dan panduan busana batik dari Butik Batik Smile Nusantara.',
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
async function loadCriticalData({ context, request, params }) {
  const { blogHandle, articleHandle } = params;

  if (!articleHandle || !blogHandle) {
    throw new Response('Not found', { status: 404 });
  }

  const [{ blog }] = await Promise.all([
    context.storefront.query(ARTICLE_QUERY, {
      variables: { blogHandle, articleHandle },
    }),
  ]);

  if (!blog?.articleByHandle) {
    throw new Response(null, { status: 404 });
  }

  redirectIfHandleIsLocalized(
    request,
    {
      handle: articleHandle,
      data: blog.articleByHandle,
    },
    {
      handle: blogHandle,
      data: blog,
    },
  );

  const article = blog.articleByHandle;
  return { article };
}

export default function Article() {
  /** @type {LoaderReturnData} */
  const { article } = useLoaderData();
  const { title, image, contentHtml, author } = article;

  const publishedDate = new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(article.publishedAt));

  return (
    <article className="bg-[#FAF8F5] min-h-screen text-[#111111] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
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
          <span className="text-[#111111] font-semibold uppercase truncate max-w-xs">{title}</span>
        </nav>

        {/* Article Header */}
        <header className="border-b border-[#E2DFD8] pb-8 mb-10 text-center max-w-3xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E7D3B] font-semibold block mb-3">
            CATATAN BUDAYA &bull; {publishedDate}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-wide text-[#111111] leading-tight mb-4">
            {title}
          </h1>
          {author?.name && (
            <p className="text-xs text-[#5A5550] font-light">
              Ditulis oleh <span className="font-medium text-[#111111]">{author.name}</span> &bull; Kurator Batik Smile
            </p>
          )}
          <div className="w-12 h-px bg-[#C5A059] mx-auto mt-6" />
        </header>

        {/* Featured Image */}
        {image && (
          <div className="mb-12 border border-[#E2DFD8] overflow-hidden shadow-sm bg-[#111111]">
            <Image
              data={image}
              sizes="(min-width: 1024px) 896px, 100vw"
              loading="eager"
              className="w-full h-auto object-cover max-h-[500px]"
            />
          </div>
        )}

        {/* Editorial Body */}
        <div className="bg-white p-8 sm:p-14 border border-[#E2DFD8] shadow-sm mb-16">
          <div
            className="prose prose-neutral max-w-none text-sm sm:text-base text-[#5A5550] font-light leading-relaxed [&>h2]:font-serif [&>h2]:text-2xl [&>h2]:font-normal [&>h2]:text-[#111111] [&>h2]:mt-10 [&>h2]:mb-4 [&>h3]:font-serif [&>h3]:text-xl [&>h3]:font-normal [&>h3]:text-[#111111] [&>h3]:mt-8 [&>h3]:mb-3 [&>p]:mb-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>blockquote]:border-l-2 [&>blockquote]:border-[#C5A059] [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-[#111111]"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>

        {/* Footer Back & Concierge CTA */}
        <div className="p-8 bg-[#111111] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-lg font-normal text-white mb-1">
              Tertarik Memiliki Mahakarya Batik Ini?
            </h3>
            <p className="text-xs text-[#E2DFD8]">
              Konsultasikan motif, ukuran sarimbit keluarga, atau kain tulis dengan kurator kami.
            </p>
          </div>
          <a
            href="https://wa.me/6281390888809?text=Halo%20Batik%20Smile%2C%20saya%20tertarik%20dengan%20artikel%20batik"
            target="_blank"
            rel="noreferrer"
            className="px-8 py-3 bg-[#C5A059] hover:bg-white text-[#111111] text-[10px] uppercase font-semibold tracking-[0.18em] transition-colors whitespace-nowrap"
          >
            KONSULTASI WHATSAPP &rarr;
          </a>
        </div>
      </div>
    </article>
  );
}

const ARTICLE_QUERY = `#graphql
  query Article(
    $articleHandle: String!
    $blogHandle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    blog(handle: $blogHandle) {
      articleByHandle(handle: $articleHandle) {
        title
        contentHtml
        publishedAt
        author: authorV2 {
          name
        }
        image {
          id
          altText
          url
          width
          height
        }
        seo {
          description
          title
        }
      }
    }
  }
`;

/** @typedef {import('./+types/blogs.$blogHandle.$articleHandle').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
