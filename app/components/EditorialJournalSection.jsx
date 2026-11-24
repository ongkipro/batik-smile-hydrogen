import React from 'react';
import { Link } from 'react-router';

/**
 * EditorialJournalSection: Frameless Minimalist Cultural Journal
 * Pure editorial typography, frameless photography, zero clunky card boxes, zero harsh divider lines.
 * Clean, breathable, and deeply sophisticated.
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

  const displayArticles = articles.slice(0, 3);

  const categories = ['ARSIP BUDAYA', 'SERAGAM SARIMBIT', 'FILOSOFI WASTRA'];

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#FAF8F5]">
      <div className="w-full max-w-7xl mx-auto">
        {/* Minimalist Editorial Header (No dividing lines, generous whitespace) */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-wide text-[#111111] mb-3 leading-tight">
            Catatan &amp; Filosofi Batik
          </h2>
          <p className="text-xs sm:text-sm text-[#5A5550] font-light leading-relaxed">
            Menyelami makna adiluhung motif keraton, panduan berbusana sarimbit keluarga, serta dedikasi pelestarian batik tulis Jawa Tengah.
          </p>
        </div>

        {/* 3-Column Frameless Editorial Stories (No card frames, no borders, no box shadows) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {displayArticles.map((article, idx) => {
            const articleUrl = `/blogs/${article.blog?.handle || blogHandle}/${article.handle}`;
            const imageUrl = article.image?.url || '/banners/hero_editorial_banner.jpg';
            const formattedDate = formatDate(article.publishedAt);
            const category = categories[idx % categories.length];

            return (
              <article key={article.id || idx} className="group flex flex-col">
                <Link to={articleUrl} className="block no-underline">
                  {/* Frameless Media (Locked 3:2 ratio with subtle hover zoom) */}
                  <div className="relative aspect-[3/2] w-full overflow-hidden bg-[#111111] mb-4">
                    <img
                      src={imageUrl}
                      alt={article.image?.altText || article.title}
                      width="600"
                      height="400"
                      decoding="async"
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-95 group-hover:opacity-100"
                    />
                  </div>

                  {/* Micro Index & Metadata */}
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#9E7D3B] font-semibold mb-2.5">
                    <span>0{idx + 1}</span>
                    <span>/</span>
                    <span>{category}</span>
                    <span className="text-[#A69F96]">•</span>
                    <time dateTime={article.publishedAt} className="text-[#A69F96] font-normal lowercase tracking-normal">
                      {formattedDate}
                    </time>
                  </div>

                  {/* Pure Serif Editorial Headline */}
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#111111] group-hover:text-[#9E7D3B] transition-colors leading-snug mb-3 line-clamp-2">
                    {article.title}
                  </h3>

                  {/* Gentle Narrative Excerpt */}
                  {article.excerpt && (
                    <p className="text-xs sm:text-sm text-[#5A5550] font-light leading-relaxed line-clamp-3 mb-4">
                      {article.excerpt}
                    </p>
                  )}

                  {/* Subtle Text Action Link */}
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#111111] group-hover:text-[#9E7D3B] transition-colors">
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
          })}
        </div>

        {/* Minimalist Centered Archive Action */}
        <div className="mt-8 sm:mt-10 text-center">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] font-semibold text-[#111111] hover:text-[#9E7D3B] transition-colors group pb-1 border-b border-[#111111]/30 hover:border-[#9E7D3B]"
          >
            <span>JELAJAHI SELURUH ARSIP JURNAL</span>
            <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
