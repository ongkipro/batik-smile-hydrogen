import React from 'react';
import { Link } from 'react-router';

/**
 * FeaturedCollections: Curated Luxury Collection Cards
 * Fetches and displays real collection images directly from Shopify Storefront API
 * 0px Radius, Quad-Harmonic Palette, Cormorant Garamond Typography
 *
 * @param {{
 *   collections?: any[];
 * }} props
 */
export function FeaturedCollections({ collections = [] }) {
  // Default fallback banners matching Shopify inventory
  const defaultFallbackImages = {
    'sarimbit-exclusive': 'https://cdn.shopify.com/s/files/1/0813/3224/0441/collections/banner_batik_couple_1785995932731_51f1e349-35df-4896-b08d-6290f84897d9.jpg?v=1786005734',
    'sarimbit-premium': 'https://cdn.shopify.com/s/files/1/0813/3224/0441/collections/banner_batik_couple_1785995932731_d8691b10-ece8-4430-a8c6-d184fa0c467a.jpg?v=1786004716',
    'sarimbit-ekonomis': 'https://cdn.shopify.com/s/files/1/0813/3224/0441/collections/banner_batik_couple_1785995932731_7d17a644-177e-4489-bcf6-490c3c74d39f.jpg?v=1786005749',
    'batik-wanita': 'https://cdn.shopify.com/s/files/1/0813/3224/0441/collections/banner_batik_wanita_cat_1786004365241.jpg?v=1786004433',
    'batik-pria': 'https://cdn.shopify.com/s/files/1/0813/3224/0441/collections/banner_batik_pria_1785995886986.jpg?v=1786004442',
    'jarik-kain-batik': 'https://cdn.shopify.com/s/files/1/0813/3224/0441/collections/banner_batik_wanita_cat_1786004365241_74b9bcb8-fe35-457a-8161-5dc886cf9cb7.jpg?v=1786006762',
    'batik-anak': 'https://cdn.shopify.com/s/files/1/0813/3224/0441/collections/banner_batik_anak_cat_1786004381125.jpg?v=1786004452',
  };

  // Curated list prioritizes the 3 Sarimbit tiers, Wanita, Pria, and Kain Jarik
  const targetHandles = [
    'sarimbit-exclusive',
    'sarimbit-premium',
    'sarimbit-ekonomis',
    'batik-wanita',
    'batik-pria',
    'jarik-kain-batik',
  ];

  // Map incoming Shopify collections or provide default structure
  const displayCollections = targetHandles.map((handle) => {
    const found = collections.find((c) => c.handle === handle);
    if (found) {
      return {
        ...found,
        imageUrl: found.image?.url || defaultFallbackImages[handle] || '/banners/hero_editorial_banner.jpg',
      };
    }
    // Fallback descriptors
    const metaMap = {
      'sarimbit-exclusive': {
        title: 'Sarimbit Exclusive',
        subtitle: 'Sutra ATBM & Tulis Prada Emas',
        badge: 'Koleksi Mahakarya',
      },
      'sarimbit-premium': {
        title: 'Sarimbit Premium',
        subtitle: 'Tenun Dobby & Furing Pesta',
        badge: 'Resepsi & Jamuan',
      },
      'sarimbit-ekonomis': {
        title: 'Sarimbit Ekonomis',
        subtitle: 'Katun Primisima Adem Harian',
        badge: 'Favorit Keluarga',
      },
      'batik-wanita': {
        title: 'Busana Batik Wanita',
        subtitle: 'Blus, Dress, Gamis & Kebaya',
        badge: 'Anggun Kontemporer',
      },
      'batik-pria': {
        title: 'Kemeja Batik Pria',
        subtitle: 'Lapis Furing Hero Katun Sejuk',
        badge: 'Jahitan Sambung Motif',
      },
      'jarik-kain-batik': {
        title: 'Kain Batik & Jarik Tradisional',
        subtitle: 'Lembaran Batik Asli Solo & Pekalongan',
        badge: 'Mahakarya Pengrajin',
      },
    };
    return {
      handle,
      title: metaMap[handle]?.title || handle,
      subtitle: metaMap[handle]?.subtitle || '',
      badge: metaMap[handle]?.badge || 'Koleksi Butik',
      imageUrl: defaultFallbackImages[handle] || '/banners/hero_editorial_banner.jpg',
    };
  });

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#FAF8F5] border-b border-[#E2DFD8]">
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#9E7D3B] font-semibold block mb-2">
            KURASI KOLEKSI RESMI BUTIK
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-wide text-[#111111] mb-4 leading-tight">
            Katalog Koleksi Unggulan Butik
          </h2>
          <div className="w-12 h-px bg-[#C5A059] mx-auto my-4" />
          <p className="text-xs sm:text-sm text-[#5A5550] font-light leading-relaxed">
            Jelajahi koleksi sarimbit keluarga, busana wanita modern, kemeja pria lapis furing hero, dan lembaran kain batik tulis asli yang diambil langsung dari katalog resmi kami.
          </p>
        </div>

        {/* 6-Card Responsive Grid (0px Radius, Quiet Luxury) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayCollections.map((col, idx) => {
            const badge = col.badge || 'Koleksi Resmi';
            return (
              <Link
                key={col.handle || idx}
                to={`/collections/${col.handle}`}
                className="group relative block bg-[#111111] border border-[#E2DFD8] hover:border-[#C5A059] transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md"
              >
                {/* 16:10 Aspect Ratio Image Container */}
                <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-[#111111]">
                  <img
                    src={col.imageUrl}
                    alt={col.image?.altText || col.title}
                    loading={idx < 3 ? 'eager' : 'lazy'}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-85 group-hover:opacity-100"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="text-[9px] uppercase tracking-[0.22em] text-[#C5A059] font-bold block mb-1">
                      {badge}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-white group-hover:text-[#C5A059] transition-colors leading-snug">
                      {col.title}
                    </h3>
                    {col.subtitle && (
                      <p className="text-[11px] text-[#E2DFD8] font-light mt-1 line-clamp-1">
                        {col.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                {/* Bottom Action Strip */}
                <div className="p-4 bg-white border-t border-[#E2DFD8] flex items-center justify-between transition-colors group-hover:bg-[#FAF8F5]">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#111111] font-semibold group-hover:text-[#C5A059] transition-colors">
                    JELAJAHI KOLEKSI &rarr;
                  </span>
                  <span className="text-xs text-[#C5A059] transform group-hover:translate-x-1 transition-transform">
                    &bull;
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
