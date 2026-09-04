import React, { useState, useEffect } from 'react';
import { useLoaderData, Link, redirect } from 'react-router';
import { Image, Money } from '@shopify/hydrogen';
import { redirectIfHandleIsLocalized } from '~/lib/redirect';
import { Breadcrumb } from '~/components/Breadcrumb';
import { generateArticleMeta } from '~/lib/seo';

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({ data }) => {
  return generateArticleMeta(data?.article, data?.blogHandle);
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

  // Redirect alias 'jurnal' to official Shopify blog handle 'news'
  if (blogHandle === 'jurnal') {
    throw redirect(`/blogs/news/${articleHandle}`, 301);
  }

  const [{ blog, products }] = await Promise.all([
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
  const curatedProducts = products?.nodes || [];

  return { article, relatedArticles, curatedProducts, blogHandle };
}

export default function Article() {
  /** @type {LoaderReturnData} */
  const { article, relatedArticles, curatedProducts, blogHandle } = useLoaderData();
  const { title, image, contentHtml, author, publishedAt } = article;

  // Reading Progress Bar
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

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
    <article className="bg-[#FAF8F5] min-h-screen text-[#111111] py-12 sm:py-16 px-4 sm:px-8 lg:px-12 xl:px-16 relative">
      {/* Hairline Antique Gold Reading Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2.5px] bg-transparent pointer-events-none">
        <div
          className="h-full bg-[#C5A059] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Minimalist Centered Breadcrumbs */}
        <Breadcrumb
          items={[
            { label: 'JURNAL', to: '/blogs' },
            { label: title.toUpperCase() },
          ]}
          className="justify-center mb-10 sm:mb-12"
        />

        {/* Grand Editorial Header (Centered in max-w-3xl) */}
        <header className="mb-12 sm:mb-14 text-center max-w-3xl mx-auto">
          <span className="inline-block text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#9E7D3B] font-bold mb-4">
            CATATAN &amp; FILOSOFI WASTRA
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-wide text-[#111111] leading-[1.14] mb-6">
            {title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#5A5550]">
            <span className="font-semibold text-[#111111]">{author?.name || 'Batik Smile Editorial'}</span>
            <span>&bull;</span>
            <time dateTime={publishedAt}>{publishedDate}</time>
            <span>&bull;</span>
            <span className="text-[#9E7D3B] font-semibold">{readingTime} MENIT BACA</span>
          </div>
        </header>

        {/* Hero Featured Media (Strictly Locked to 3:2 Ratio in max-w-4xl) */}
        {image && (
          <figure className="max-w-4xl mx-auto mb-14 sm:mb-16">
            <div className="relative aspect-[3/2] w-full overflow-hidden bg-[#111111] shadow-sm">
              <Image
                data={image}
                sizes="(min-width: 1024px) 896px, 100vw"
                loading="eager"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <figcaption className="text-[10px] sm:text-[11px] text-[#888888] uppercase tracking-[0.16em] mt-3 text-center font-light">
              Dokumentasi Arsip Wastra &bull; Butik Batik Smile Nusantara Semarang
            </figcaption>
          </figure>
        )}

        {/* Frameless Article Reading Canvas (Intimate max-w-2xl ~ 680px for Maximum Comfort) */}
        <div className="max-w-2xl mx-auto mb-16 sm:mb-20">
          <div
            className="prose prose-neutral max-w-none text-[15px] sm:text-[17px] text-[#2C2A28] font-light leading-[1.85] [&>p:first-of-type::first-letter]:text-5xl sm:[&>p:first-of-type::first-letter]:text-6xl [&>p:first-of-type::first-letter]:font-serif [&>p:first-of-type::first-letter]:mr-3.5 [&>p:first-of-type::first-letter]:float-left [&>p:first-of-type::first-letter]:text-[#9E7D3B] [&>p:first-of-type::first-letter]:leading-none [&>h2]:font-serif [&>h2]:text-2xl sm:[&>h2]:text-3xl [&>h2]:font-normal [&>h2]:text-[#111111] [&>h2]:mt-12 [&>h2]:mb-4 [&>h2]:tracking-wide [&>h3]:font-serif [&>h3]:text-xl sm:[&>h3]:text-2xl [&>h3]:font-normal [&>h3]:text-[#111111] [&>h3]:mt-10 [&>h3]:mb-3 [&>p]:mb-6 [&>p]:leading-[1.85] [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>blockquote]:border-l-2 [&>blockquote]:border-[#C5A059] [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-[#111111] [&>blockquote]:font-serif [&>blockquote]:text-xl sm:[&>blockquote]:text-2xl [&>blockquote]:my-10 [&>blockquote]:py-1"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* Curator Provenance Signature Stamp */}
          <div className="mt-14 pt-8 border-t border-[#E2DFD8] flex items-start justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#111111] block mb-1">
                Kurasi Redaksi Butik Batik Smile Nusantara
              </span>
              <p className="text-xs text-[#5A5550] font-light leading-relaxed max-w-md">
                Didedikasikan untuk riset canting malam, pelestarian filosofi motif keraton, serta panduan keserasian busana sarimbit keluarga sejak 2007 di Semarang.
              </p>
            </div>
            <span className="text-2xl text-[#C5A059] font-serif shrink-0">◆</span>
          </div>

          {/* Refined Minimalist Action & Share Toolbar */}
          <div className="mt-8 pt-4 border-t border-[#E2DFD8] flex items-center justify-between text-[10px] uppercase tracking-[0.2em] font-semibold text-[#111111]">
            <Link
              to="/blogs"
              className="hover:text-[#9E7D3B] transition-colors flex items-center gap-1.5 no-underline"
            >
              &larr; ARSIP JURNAL
            </Link>

            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                `Baca catatan wastra "${title}" dari Butik Batik Smile Nusantara:\nhttps://batiksmile.com/blogs/${blogHandle}/${article.handle}`,
              )}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#25D366] transition-colors flex items-center gap-1.5 no-underline"
            >
              BAGIKAN KE WHATSAPP &rarr;
            </a>
          </div>
        </div>

        {/* Shop The Story: Curated Pieces Linked to This Article */}
        {curatedProducts.length > 0 && (
          <section className="max-w-4xl mx-auto mb-16 sm:mb-20">
            <div className="flex items-center justify-between pb-3 mb-8 border-b border-[#E2DFD8]">
              <div>
                <span className="text-[9px] uppercase tracking-[0.22em] text-[#9E7D3B] font-semibold block mb-0.5">
                  SHOP THE STORY
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#111111]">
                  Karya Wastra Terkait Catatan Ini
                </h3>
              </div>
              <Link
                to="/collections/all"
                className="text-[10px] uppercase tracking-[0.18em] text-[#5A5550] hover:text-[#111111] transition-colors no-underline font-medium"
              >
                SEMUA KOLEKSI &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {curatedProducts.map((prod) => (
                <ProductStoryCard key={prod.id} product={prod} />
              ))}
            </div>
          </section>
        )}

        {/* Related Articles Section (Frameless Minimalist with Locked 3:2 Ratio) */}
        {relatedArticles.length > 0 && (
          <section className="max-w-4xl mx-auto mb-16 sm:mb-20">
            <div className="flex items-center justify-between pb-3 mb-8 border-b border-[#E2DFD8]">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#111111]">
                REKOMENDASI JURNAL LAINNYA
              </span>
              <Link
                to="/blogs"
                className="text-[10px] uppercase tracking-[0.16em] text-[#9E7D3B] hover:text-[#111111] transition-colors no-underline font-medium"
              >
                LIHAT SEMUA &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {relatedArticles.map((rel) => {
                const relUrl = `/blogs/${blogHandle}/${rel.handle}`;
                const relDate = new Intl.DateTimeFormat('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                }).format(new Date(rel.publishedAt));

                return (
                  <article key={rel.id} className="group flex flex-col">
                    <Link to={relUrl} className="block no-underline">
                      {/* Media 3:2 Ratio Locked */}
                      <div className="relative aspect-[3/2] w-full overflow-hidden bg-[#111111] mb-3">
                        {rel.image ? (
                          <Image
                            data={rel.image}
                            alt={rel.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                          />
                        ) : (
                          <img
                            src="/banners/hero_editorial_banner.jpg"
                            alt={rel.title}
                            className="w-full h-full object-cover opacity-95 group-hover:scale-105 transition-transform duration-700"
                          />
                        )}
                      </div>

                      {/* Metadata */}
                      <time className="text-[9px] uppercase tracking-[0.16em] text-[#9E7D3B] font-semibold block mb-1.5">
                        {relDate}
                      </time>

                      {/* Headline */}
                      <h4 className="font-serif text-lg font-normal text-[#111111] group-hover:text-[#9E7D3B] transition-colors line-clamp-2 leading-snug mb-2">
                        {rel.title}
                      </h4>

                      {/* Text Action */}
                      <div className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.18em] font-semibold text-[#111111] group-hover:text-[#9E7D3B] transition-colors">
                        <span className="border-b border-[#111111]/30 group-hover:border-[#9E7D3B] pb-0.5 transition-colors">
                          BACA CATATAN
                        </span>
                        <span>&rarr;</span>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* Bespoke Concierge Consultation Banner */}
        <div className="max-w-4xl mx-auto p-8 sm:p-10 bg-[#111111] text-white border border-[#C5A059]/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div>
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#C5A059] font-bold block mb-1">
              LAYANAN KONSULTASI WASTRA
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-white mb-2 leading-tight">
              Tertarik Memiliki Busana dengan Corak Ini?
            </h3>
            <p className="text-xs text-[#E2DFD8] font-light max-w-lg leading-relaxed">
              Diskusikan ketersediaan motif, jahit kustom sarimbit keluarga, atau pemesanan kain batik tulis halus langsung dengan konsultan butik kami.
            </p>
          </div>
          <a
            href={`https://wa.me/6281390888809?text=${encodeURIComponent(
              `Halo Butik Batik Smile Nusantara, saya sedang membaca jurnal "${title}" dan ingin berkonsultasi mengenai motif ini.`,
            )}`}
            target="_blank"
            rel="noreferrer"
            className="px-8 py-3.5 bg-[#C5A059] hover:bg-white text-[#111111] text-[10px] uppercase font-semibold tracking-[0.2em] transition-colors whitespace-nowrap shadow-sm no-underline cursor-pointer"
          >
            KONSULTASI VIA WHATSAPP &rarr;
          </a>
        </div>
      </div>
    </article>
  );
}

/**
 * ProductStoryCard: Curated Product linked from the story (Strict 4:5 Portrait Media)
 */
function ProductStoryCard({ product }) {
  const targetUrl = `/products/${product.handle}`;
  const price = product.priceRange?.minVariantPrice;

  return (
    <div className="group flex flex-col">
      <Link to={targetUrl} className="block no-underline">
        {/* Strict 4:5 Media */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#111111] mb-3 border border-[#E2DFD8] group-hover:border-[#C5A059] transition-colors">
          {product.featuredImage ? (
            <Image
              data={product.featuredImage}
              alt={product.featuredImage.altText || product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          ) : (
            <img
              src="/banners/hero_editorial_banner.jpg"
              alt={product.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute top-2.5 left-2.5">
            <span className="px-2 py-0.5 bg-black/75 backdrop-blur-sm text-[8px] uppercase tracking-[0.16em] text-[#C5A059] font-semibold border border-[#C5A059]/30">
              KARYA TERPILIH
            </span>
          </div>
        </div>

        {/* Title */}
        <h4 className="font-serif text-base font-normal text-[#111111] group-hover:text-[#9E7D3B] transition-colors line-clamp-1 mb-1">
          {product.title}
        </h4>

        {/* Price */}
        {price && (
          <div className="text-xs font-semibold text-[#111111] mb-2 tracking-wide">
            <Money data={price} />
          </div>
        )}

        {/* Action Link */}
        <div className="inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.18em] font-semibold text-[#9E7D3B] group-hover:text-[#111111] transition-colors">
          <span>LIHAT KARYA</span>
          <span>&rarr;</span>
        </div>
      </Link>
    </div>
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
    products(first: 3, sortKey: BEST_SELLING) {
      nodes {
        id
        title
        handle
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        featuredImage {
          id
          url
          altText
          width
          height
        }
      }
    }
  }
`;

/** @typedef {import('./+types/blogs.$blogHandle.$articleHandle').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
