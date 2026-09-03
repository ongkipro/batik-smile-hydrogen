import React, { useEffect, useState } from 'react';
import { AddToCartButton } from './AddToCartButton';
import { formatRupiah } from '~/lib/currency';

export function StickyMobileBar({ product, selectedVariant, isExclusive = false, isPremium = false }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar when scrolled past 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const isAvailable = selectedVariant?.availableForSale;

  return (
    <div
      className={`lg:hidden fixed bottom-[max(3.8rem,calc(env(safe-area-inset-bottom)+3.5rem))] left-0 right-0 z-30 p-3 backdrop-blur-md shadow-xl transition-all animate-in slide-in-from-bottom duration-300 ${
        isExclusive
          ? 'bg-[#111111]/95 border-t border-[#C5A059]/40 text-white'
          : isPremium
          ? 'bg-[#F3EDE2]/95 border-t border-[#C5A059]/40 text-[#111111]'
          : 'bg-[#FAF8F5]/95 border-t border-[#E2DFD8] text-[#111111]'
      }`}
    >
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        {/* Left: Title & Price */}
        <div className="flex-1 min-w-0">
          <p className={`text-xs font-semibold truncate ${isExclusive ? 'text-white' : 'text-[#111111]'}`}>
            {product.title}
          </p>
          <div className={`text-xs font-bold ${isExclusive ? 'text-[#C5A059]' : 'text-[#9E7D3B]'}`}>
            {selectedVariant?.price && formatRupiah(selectedVariant.price)}
          </div>
        </div>

        {/* Right: Direct Checkout CTA */}
        <AddToCartButton
          disabled={!isAvailable}
          lines={
            selectedVariant
              ? [
                  {
                    merchandiseId: selectedVariant.id,
                    quantity: 1,
                    selectedVariant,
                  },
                ]
              : []
          }
          redirectTo="checkout"
          className={`px-5 py-2.5 rounded-none font-semibold text-xs uppercase tracking-[0.16em] transition-colors shadow-sm disabled:cursor-not-allowed whitespace-nowrap cursor-pointer ${
            isExclusive
              ? 'bg-[#C5A059] hover:bg-white !text-[#111111] font-bold disabled:bg-[#333333] disabled:!text-[#888888]'
              : 'bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] disabled:bg-[#E2DFD8] disabled:!text-[#5A5550]'
          }`}
        >
          {isAvailable ? 'BELI SEKARANG' : 'HABIS TERJUAL'}
        </AddToCartButton>
      </div>
    </div>
  );
}
