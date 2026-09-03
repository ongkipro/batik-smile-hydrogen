import React from 'react';
import { useLoaderData, NavLink, Link } from 'react-router';
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
        'Artikel kebudayaan dan panduan busana batik dari Butik Batik Smile Nusantara Semarang.',
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
  const rawRelated = blog.articles?.nodes || [];
  const relatedArticles = rawRelated
    .filter((a) => a.handle !== articleHandle)
    .slice(0, 3);

  return { article, relatedArticles, blogHandle };
}

export default function Article() {
  /** @type {LoaderReturnData} */
  const { article, relatedArticles, blogHandle } = useLoaderData();
  const { title, image, contentHtml, author, publishedAt } = article;

  const publishedDate = new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(publishedAt));

  // Calculated reading time
  const textOnly = (contentHtml || '').replace(/<[^>]+>/g, '');
  const wordCount = textOnly.trim().split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 180));

  return (
    <article className="bg-[#FAF8F5] min-h-screen text-[#111111] py-16 sm:py-24 px-4 sm:px-8 lg:px-12 xl:px-16">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-[10px] text-[#5A5550] uppercase tracking-[0.2em] mb-10 flex items-center gap-2">
          <NavLink to="/" className="hover:text-[#9E7D3B] transition-colors">
            BERANDA
          </NavLink>
          <span>/</span>
          <NavLink to="/blogs" className="hover:text-[#9E7D3B] transition-colors">
            JURNAL
          </NavLink>
          <span>/</span>
          <span className="text-[#111111] font-semibold uppercase truncate max-w-xs sm:max-w-md">
            {title}
          </span>
        </nav>

        {/* Article Header */}
        <header className="border-b border-[#E2DFD8] pb-10 mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#9E7D3B] font-semibold">
              CATATAN BUDAYA
            </span>
            <span className="text-xs text-[#9E7D3B]">&bull;</span>
            <time dateTime={publishedAt} className="text-[10px] uppercase tracking-[0.2em] text-[#5A5550]">
              {publishedDate}
            </time>
            <span className="text-xs text-[#9E7D3B]">&bull;</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#5A5550]">
              {readingTime} MENIT BACA
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-5xl font-normal tracking-wide text-[#111111] leading-tight mb-6">
            {title}
          </h1>

          {author?.name && (
            <p className="text-xs text-[#5A5550] font-light">
              Ditulis oleh <span className="font-medium text-[#111111]">{author.name}</span> &bull; Kurasi Butik Batik Smile
            </p>
          )}

          <div className="w-12 h-px bg-[#C5A059] mx-auto mt-6" />
        </header>

        {/* Featured Image */}
        {image && (
          <div className="mb-14 border border-[#E2DFD8] overflow-hidden shadow-sm bg-[#111111]">
            <Image
              data={image}
              sizes="(min-width: 1024px) 896px, 100vw"
              loading="eager"
              className="w-full h-auto object-cover max-h-[540px]"
            />
          </div>
        )}

        {/* Editorial Body */}
        <div className="bg-white p-8 sm:p-14 lg:p-16 border border-[#E2DFD8] shadow-sm mb-16">
          <div
            className="prose prose-neutral max-w-none text-sm sm:text-base text-[#444444] font-light leading-relaxed [&>h2]:font-serif [&>h2]:text-2xl sm:[&>h2]:text-3xl [&>h2]:font-normal [&>h2]:text-[#111111] [&>h2]:mt-12 [&>h2]:mb-4 [&>h3]:font-serif [&>h3]:text-xl sm:[&>h3]:text-2xl [&>h3]:font-normal [&>h3]:text-[#111111] [&>h3]:mt-10 [&>h3]:mb-3 [&>p]:mb-6 [&>p]:leading-relaxed [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>blockquote]:border-l-2 [&>blockquote]:border-[#C5A059] [&>blockquote]:pl-5 [&>blockquote]:italic [&>blockquote]:text-[#111111] [&>blockquote]:my-8"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* Author Footnote Stamp */}
          <div className="mt-14 pt-8 border-t border-[#E2DFD8] flex items-center justify-between text-xs text-[#5A5550]">
            <div>
              <span className="font-semibold text-[#111111] block mb-1 uppercase tracking-wider text-[11px]">
                Redaksi Jurnal Butik Batik Smile
              </span>
              <p className="font-light text-[#777777]">
                Didedikasikan untuk riset, dokumentasi, dan edukasi wastra batik Nusantara sejak 2007 di Semarang.
              </p>
            </div>
            <span className="text-xl text-[#C5A059] shrink-0 ml-4">◆</span>
          </div>
        </div>

        {/* Social Share & Navigation Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-[#FAF8F5] border border-[#E2DFD8] mb-16">
          <Link
            to="/blogs"
            className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#111111] hover:text-[#9E7D3B] transition-colors flex items-center gap-2"
          >
            &larr; KEMBALI KE SELURUH JURNAL
          </Link>

          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              `Baca artikel menarik "${title}" dari Batik Smile Nusantara:\nhttps://cart.batiksmile.com/blogs/${blogHandle}/${article.handle}`,
            )}`}
            target="_blank"
            rel="noreferrer"
            className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#111111] hover:text-[#25D366] transition-colors flex items-center gap-1.5"
          >
            BAGIKAN KE WHATSAPP &rarr;
          </a>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between border-b border-[#E2DFD8] pb-4 mb-8">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#C5A059]" />
                <h3 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#111111]">
                  REKOMENDASI JURNAL LAINNYA
                </h3>
              </div>
              <Link
                to="/blogs"
                className="text-[10px] uppercase tracking-[0.16em] text-[#9E7D3B] hover:text-[#111111] transition-colors"
              >
                LIHAT SEMUA &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => {
                const relUrl = `/blogs/${blogHandle}/${rel.handle}`;
                const relDate = new Intl.DateTimeFormat('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                }).format(new Date(rel.publishedAt));

                return (
                  <Link
                    key={rel.id}
                    to={relUrl}
                    className="group bg-white border border-[#E2DFD8] hover:border-[#C5A059] transition-all duration-300 overflow-hidden block shadow-sm"
                  >
                    <div className="relative aspect-[16/10] bg-[#111111] overflow-hidden">
                      {rel.image ? (
                        <Image
                          data={rel.image}
                          alt={rel.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                        />
                      ) : (
                        <img
                          src="/banners/hero_editorial_banner.jpg"
                          alt={rel.title}
                          className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                        />
                      )}
                    </div>
                    <div className="p-5">
                      <time className="text-[9px] uppercase tracking-wider text-[#9E7D3B] font-medium block mb-2">
                        {relDate}
                      </time>
                      <h4 className="font-serif text-lg font-normal text-[#111111] group-hover:text-[#C5A059] transition-colors line-clamp-2 leading-snug mb-3">
                        {rel.title}
                      </h4>
                      <span className="text-[9px] uppercase tracking-[0.16em] text-[#111111] font-semibold inline-flex items-center gap-1 group-hover:text-[#9E7D3B] transition-colors">
                        BACA &rarr;
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Footer Concierge Consultation CTA */}
        <div className="p-8 sm:p-10 bg-[#111111] text-white border border-[#C5A059]/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div>
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#C5A059] font-bold block mb-1">
              LAYANAN KONSULTASI WASTRA
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-white mb-2 leading-tight">
              Tertarik Memiliki Mahakarya Batik Ini?
            </h3>
            <p className="text-xs text-[#E2DFD8] font-light max-w-lg leading-relaxed">
              Diskusikan makna motif, ketersediaan bahan sutra ATBM, atau konsultasi ukuran sarimbit keluarga langsung dengan konsultan butik kami.
            </p>
          </div>
          <a
            href={`https://wa.me/6281390888809?text=${encodeURIComponent(
              `Halo Batik Smile, saya sedang membaca artikel "${title}" dan ingin berkonsultasi lebih lanjut.`,
            )}`}
            target="_blank"
            rel="noreferrer"
            className="px-8 py-3.5 bg-[#C5A059] hover:bg-white text-[#111111] text-[10px] uppercase font-semibold tracking-[0.2em] transition-colors whitespace-nowrap shadow-sm"
          >
            KONSULTASI VIA WHATSAPP &rarr;
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
      handle
      articleByHandle(handle: $articleHandle) {
        handle
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
      articles(first: 6, sortKey: PUBLISHED_AT, reverse: true) {
        nodes {
          id
          title
          handle
          publishedAt
          excerpt
          image {
            id
            altText
            url
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
`;

/** @typedef {import('./+types/blogs.$blogHandle.$articleHandle').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
