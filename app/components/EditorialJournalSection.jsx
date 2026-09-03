import React from 'react';
import { Link } from 'react-router';

/**
 * EditorialJournalSection: Asymmetric Magazine Gazette
 * - Left (7 cols): Prominent Lead Spotlight Article with large photography & deep excerpt.
 * - Right (5 cols): Compact horizontal editorial rows with thumbnails & clean dividers.
 * - Eliminates repetitive 3-box grid fatigue and brings high-editorial prestige.
 *
 * @param {{
 *   articles?: any[];
 *   blogHandle?: string;
 * }} props
 */
export function EditorialJournalSection({ articles = [], blogHandle = 'news' }) {
  if (!articles || articles.length === 0) {
    return null;
  }

  const formatDate = (dateString) => {
    try {
      return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(new Date(dateString));
    } catch {
      return dateString;
    }
  };

  const leadArticle = articles[0];
  const sideArticles = articles.slice(1, 3);

  const leadUrl = `/blogs/${leadArticle.blog?.handle || blogHandle}/${leadArticle.handle}`;
  const leadImage = leadArticle.image?.url || '/banners/hero_editorial_banner.jpg';
  const leadDate = formatDate(leadArticle.publishedAt);

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#FAF8F5] border-b border-[#E2DFD8]">
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-wide text-[#111111] mb-3 leading-tight">
            Catatan &amp; Filosofi Batik
          </h2>
          <div className="w-12 h-px bg-[#C5A059] mx-auto my-3" />
          <p className="text-xs sm:text-sm text-[#5A5550] font-light leading-relaxed">
            Menyelami makna adiluhung motif klasik, panduan berbusana sarimbit, serta dedikasi pelestarian batik tulis asli Jawa Tengah.
          </p>
        </div>

        {/* Asymmetric Magazine Gazette Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Lead Spotlight Article (7 Columns) */}
          <div className="lg:col-span-7">
            <Link
              to={leadUrl}
              className="group block bg-white border border-[#E2DFD8] hover:border-[#C5A059] transition-all duration-500 shadow-sm hover:shadow-[0_16px_40px_rgba(197,160,89,0.18)]"
            >
              {/* Media Container 16:10 */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#111111]">
                <img
                  src={leadImage}
                  alt={leadArticle.image?.altText || leadArticle.title}
                  loading="eager"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/75 backdrop-blur-md border border-[#C5A059]/50 text-[9px] uppercase tracking-[0.2em] text-[#C5A059] font-bold">
                    <span className="w-1.5 h-1.5 bg-[#C5A059]" />
                    ULASAN UTAMA
                  </span>
                </div>
              </div>

              {/* Lead Content */}
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.16em] text-[#9E7D3B] font-medium mb-3">
                  <time dateTime={leadArticle.publishedAt}>{leadDate}</time>
                  <span>•</span>
                  <span className="text-[#5A5550]">
                    {leadArticle.author?.name || 'Batik Smile Editorial'}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#111111] group-hover:text-[#9E7D3B] transition-colors leading-snug mb-3">
                  {leadArticle.title}
                </h3>

                {leadArticle.excerpt && (
                  <p className="text-xs sm:text-sm text-[#5A5550] font-light leading-relaxed mb-6 line-clamp-3">
                    {leadArticle.excerpt}
                  </p>
                )}

                <div className="pt-4 border-t border-[#E2DFD8]/60 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-[#111111] font-semibold group-hover:text-[#9E7D3B] transition-colors">
                  <span>BACA ULASAN LENGKAP</span>
                  <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                    &rarr;
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Right Column: Compact Horizontal Stories (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 sm:space-y-8">
            {sideArticles.map((article, idx) => {
              const articleUrl = `/blogs/${article.blog?.handle || blogHandle}/${article.handle}`;
              const imageUrl = article.image?.url || '/banners/hero_editorial_banner.jpg';
              const formattedDate = formatDate(article.publishedAt);
              const isLast = idx === sideArticles.length - 1;

              return (
                <Link
                  key={article.id || idx}
                  to={articleUrl}
                  className={`group block bg-white border border-[#E2DFD8] hover:border-[#C5A059] transition-all duration-500 p-5 sm:p-6 shadow-sm hover:shadow-[0_12px_32px_rgba(197,160,89,0.14)] ${
                    !isLast ? '' : ''
                  }`}
                >
                  <div className="flex gap-4 sm:gap-5 items-start">
                    {/* Compact Thumbnail */}
                    <div className="relative w-28 sm:w-32 aspect-square flex-shrink-0 overflow-hidden bg-[#111111]">
                      <img
                        src={imageUrl}
                        alt={article.image?.altText || article.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      />
                    </div>

                    {/* Article Summary */}
                    <div className="min-w-0 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-[#9E7D3B] font-semibold mb-1.5">
                          <span>CATATAN 0{idx + 2}</span>
                          <span>•</span>
                          <time dateTime={article.publishedAt} className="text-[#5A5550]">
                            {formattedDate}
                          </time>
                        </div>

                        <h4 className="font-serif text-base sm:text-lg font-normal text-[#111111] group-hover:text-[#9E7D3B] transition-colors leading-snug line-clamp-2 mb-2">
                          {article.title}
                        </h4>

                        {article.excerpt && (
                          <p className="text-[11px] text-[#5A5550] font-light leading-relaxed line-clamp-2 mb-3">
                            {article.excerpt}
                          </p>
                        )}
                      </div>

                      <div className="text-[9px] uppercase tracking-[0.18em] text-[#111111] font-semibold group-hover:text-[#9E7D3B] transition-colors flex items-center gap-1.5">
                        <span>BACA ARTIKEL</span>
                        <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">
                          &rarr;
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}

            {/* Quick Link Card to Full Archive */}
            <div className="p-5 sm:p-6 bg-white border border-dashed border-[#C5A059]/60 flex items-center justify-between">
              <div>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#9E7D3B] font-bold block mb-0.5">
                  ARSIP KEBUDAYAAN
                </span>
                <p className="text-xs text-[#5A5550] font-light">
                  Kumpulan esai, makna motif keraton, &amp; etika busana.
                </p>
              </div>
              <Link
                to="/blogs"
                className="px-4 py-2 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] text-[9px] uppercase tracking-[0.18em] font-semibold transition-colors flex-shrink-0"
              >
                SEMUA &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* View All Articles Action */}
        <div className="mt-14 text-center">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#111111] text-white text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold border border-[#C5A059]/40 hover:bg-[#C5A059] hover:text-[#111111] transition-all duration-300 shadow-sm"
          >
            <span>JELAJAHI SELURUH ARSIP JURNAL</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
