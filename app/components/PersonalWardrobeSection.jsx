import React from 'react';
import { Link } from 'react-router';

/**
 * PersonalWardrobeSection: Symmetrical 3-Column Luxury Triptych
 * Dedicated to individual & multi-generational wardrobe pillars:
 * 1. Batik Pria (Sambung Motif & Furing Hero)
 * 2. Batik Wanita (Blus, Dress & Kebaya Modern)
 * 3. Batik Anak & Tradisional (Surjan Adat & Katun Lembut)
 *
 * 0px Radius, Quad-Harmonic Palette, Cormorant Garamond Typography.
 *
 * @param {{
 *   collections?: any[];
 * }} props
 */
export function PersonalWardrobeSection({ collections = [] }) {
  const defaultFallbackImages = {
    'batik-pria':
      'https://cdn.shopify.com/s/files/1/0813/3224/0441/collections/banner_batik_pria_1785995886986.jpg?v=1786004442',
    'batik-wanita':
      'https://cdn.shopify.com/s/files/1/0813/3224/0441/collections/banner_batik_wanita_cat_1786004365241.jpg?v=1786004433',
    'batik-anak':
      'https://cdn.shopify.com/s/files/1/0813/3224/0441/collections/banner_batik_anak_cat_1786004381125.jpg?v=1786004452',
  };

  const personalWardrobeMetadata = {
    'batik-pria': {
      title: 'Kemeja Batik Pria',
      subtitle:
        'Potongan pola menyatu presisi berlapis furing katun hero penyerap keringat.',
      badge: 'JAHITAN SAMBUNG MOTIF',
      pill: 'FURING KATUN HERO SEJUK',
      cta: 'JELAJAHI BATIK PRIA',
    },
    'batik-wanita': {
      title: 'Busana Batik Wanita',
      subtitle:
        'Blus modern, tunik sutra anggun, outer elegan, dan kebaya kontemporer.',
      badge: 'ANGGUN KONTEMPORER',
      pill: 'SILUET ELEGAN MODERN',
      cta: 'JELAJAHI BATIK WANITA',
    },
    'batik-anak': {
      title: 'Batik Anak & Tradisional',
      subtitle:
        'Setelan surjan adat Jawa, kebaya cilik, dan katun lembut ramah kulit anak.',
      badge: 'WARISAN LINTAS GENERASI',
      pill: 'KATUN RAMAH KULIT',
      cta: 'JELAJAHI BATIK ANAK',
    },
  };

  const pillars = ['batik-pria', 'batik-wanita', 'batik-anak'].map((handle) => {
    const found = collections.find((c) => c.handle === handle);
    const meta = personalWardrobeMetadata[handle];
    return {
      handle,
      title: meta.title,
      subtitle: meta.subtitle,
      badge: meta.badge,
      pill: meta.pill,
      cta: meta.cta,
      imageUrl:
        found?.image?.url || defaultFallbackImages[handle] || '/banners/hero_editorial_banner.jpg',
      altText: found?.image?.altText || meta.title,
    };
  });

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#FAF8F5] border-b border-[#E2DFD8]">
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#9E7D3B] font-semibold block mb-2">
            BUSANA PERSONAL & LINTAS GENERASI
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-wide text-[#111111] mb-4 leading-tight">
            Harmoni Busana Perseorangan & Tradisi
          </h2>
          <div className="w-12 h-px bg-[#C5A059] mx-auto my-4" />
          <p className="text-xs sm:text-sm text-[#5A5550] font-light leading-relaxed">
            Dedikasi jahitan sambung motif presisi, lapisan furing katun hero penyerap keringat, dan keanggunan siluet batik kontemporer untuk setiap generasi keluarga.
          </p>
        </div>

        {/* 3-Column Symmetrical Triptych Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((item, idx) => (
            <Link
              key={item.handle || idx}
              to={`/collections/${item.handle}`}
              className="group relative flex flex-col bg-[#111111] border border-[#E2DFD8] hover:border-[#C5A059] transition-all duration-500 overflow-hidden shadow-sm hover:shadow-[0_12px_32px_rgba(197,160,89,0.14)]"
            >
              {/* Media Container with 4:5 Portrait Editorial Proportion */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#111111]">
                <img
                  src={item.imageUrl}
                  alt={item.altText}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-85 group-hover:opacity-100"
                />

                {/* Ambient Dark Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                {/* Top Subtle Pill Stamp */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/70 backdrop-blur-md border border-[#C5A059]/40 text-[8px] sm:text-[9px] uppercase tracking-[0.18em] text-[#C5A059] font-bold">
                    <span className="text-[10px] leading-none">◆</span>
                    {item.badge}
                  </span>
                </div>

                {/* Overlay Content */}
                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end text-white z-10">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#9E7D3B] font-semibold block mb-1">
                    {item.pill}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-white group-hover:text-[#C5A059] transition-colors leading-snug mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#E2DFD8] font-light line-clamp-2 mb-3">
                    {item.subtitle}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[#C5A059] font-semibold">
                    <span>{item.cta}</span>
                    <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">
                      &rarr;
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom White/Linen Action Bar */}
              <div className="p-4 bg-white border-t border-[#E2DFD8] flex items-center justify-between transition-colors group-hover:bg-[#FAF8F5]">
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#111111] font-semibold group-hover:text-[#C5A059] transition-colors">
                  JELAJAHI KOLEKSI &rarr;
                </span>
                <span className="text-xs text-[#C5A059] transform group-hover:translate-x-1 transition-transform">
                  &bull;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
