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
    <div className="lg:hidden fixed bottom-16 left-0 right-0 z-30 p-3 bg-white/95 backdrop-blur-md border-t border-neutral-200 shadow-xl transition-all animate-in slide-in-from-bottom duration-300">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        {/* Left: Title & Price */}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-neutral-900 truncate">{product.title}</p>
          <div className="text-xs font-bold text-[#9E4719]">
            {selectedVariant?.price && <Money data={selectedVariant.price} />}
          </div>
        </div>

        {/* Right: Add to Cart CTA */}
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
          className="px-5 py-2.5 rounded-lg bg-[#9E4719] hover:bg-[#7A320C] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md disabled:bg-neutral-300 whitespace-nowrap"
        >
          {isAvailable ? '+ Tas' : 'Habis'}
        </AddToCartButton>
      </div>
    </div>
  );
}
