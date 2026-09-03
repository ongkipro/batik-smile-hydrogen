import React, { useEffect, useState } from 'react';
import { Money } from '@shopify/hydrogen';
import { AddToCartButton } from './AddToCartButton';

export function StickyMobileBar({ product, selectedVariant }) {
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
    <div className="lg:hidden fixed bottom-[max(3.8rem,calc(env(safe-area-inset-bottom)+3.5rem))] left-0 right-0 z-30 p-3 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-[#E2DFD8] shadow-xl transition-all animate-in slide-in-from-bottom duration-300">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        {/* Left: Title & Price */}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-[#111111] truncate">{product.title}</p>
          <div className="text-xs font-bold text-[#9E7D3B]">
            {selectedVariant?.price && <Money data={selectedVariant.price} />}
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
          className="px-5 py-2.5 rounded-none bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] font-semibold text-xs uppercase tracking-[0.16em] transition-colors shadow-sm disabled:bg-[#E2DFD8] disabled:!text-[#5A5550] whitespace-nowrap cursor-pointer"
        >
          {isAvailable ? 'BELI SEKARANG' : 'HABIS TERJUAL'}
        </AddToCartButton>
      </div>
    </div>
  );
}
