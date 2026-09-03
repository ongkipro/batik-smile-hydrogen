import React from 'react';
import { Link } from 'react-router';

/**
 * EditorialJournalSection: Quiet Luxury Cultural Journal & Blog Showcase
 * 0px Radius, Quad-Harmonic Palette, Cormorant Garamond Typography.
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

  // Format date to Indonesian localized string
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

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#FAF8F5] border-b border-[#E2DFD8]">
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#9E7D3B] font-semibold block mb-2">
            WARTA &amp; JURNAL KEBUDAYAAN
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-wide text-[#111111] mb-4 leading-tight">
            Catatan &amp; Filosofi Batik Nusantara
          </h2>
          <div className="w-12 h-px bg-[#C5A059] mx-auto my-4" />
          <p className="text-xs sm:text-sm text-[#5A5550] font-light leading-relaxed">
            Menyelami makna adiluhung motif klasik, panduan etika berbusana sarimbit keluarga, serta dedikasi pelestarian batik tulis asli Jawa Tengah.
          </p>
        </div>

        {/* 3-Column Luxury Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {articles.map((article, idx) => {
            const articleBlogHandle = article.blog?.handle || blogHandle;
            const targetUrl = `/blogs/${articleBlogHandle}/${article.handle}`;
            const imageUrl =
              article.image?.url ||
              '/banners/hero_editorial_banner.jpg';
            const authorName = article.author?.name || 'Batik Smile Editorial';
            const formattedDate = formatDate(article.publishedAt);

            return (
              <article
                key={article.id || idx}
                className="group relative flex flex-col bg-white border border-[#E2DFD8] hover:border-[#C5A059] transition-all duration-500 overflow-hidden shadow-sm hover:shadow-[0_12px_32px_rgba(197,160,89,0.14)]"
              >
                <Link to={targetUrl} className="flex-1 flex flex-col">
                  {/* Media Container 16:10 */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#111111]">
                    <img
                      src={imageUrl}
                      alt={article.image?.altText || article.title}
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                    />

                    {/* Dark gradient vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Top Pill Stamp */}
                    <div className="absolute top-3.5 left-3.5 z-10">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-black/70 backdrop-blur-md border border-[#C5A059]/40 text-[8px] sm:text-[9px] uppercase tracking-[0.18em] text-[#C5A059] font-bold">
                        <span className="text-[10px] leading-none">◆</span>
                        JURNAL BUDAYA
                      </span>
                    </div>
                  </div>

                  {/* Editorial Content */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Meta Date & Author */}
                      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-[#9E7D3B] font-medium mb-2.5">
                        <time dateTime={article.publishedAt}>{formattedDate}</time>
                        <span className="text-[#888888]">{authorName}</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#111111] group-hover:text-[#C5A059] transition-colors leading-snug mb-3 line-clamp-2">
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      {article.excerpt && (
                        <p className="text-xs sm:text-sm text-[#5A5550] font-light leading-relaxed line-clamp-2 sm:line-clamp-3 mb-4">
                          {article.excerpt}
                        </p>
                      )}
                    </div>

                    {/* Action Link */}
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
          })}
        </div>

        {/* View All Articles Action */}
        <div className="mt-14 text-center">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#111111] text-white text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold border border-[#C5A059]/40 hover:bg-[#C5A059] hover:text-[#111111] transition-all duration-300 shadow-sm"
          >
            <span>JELAJAHI SELURUH ARSIP JURNAL</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
