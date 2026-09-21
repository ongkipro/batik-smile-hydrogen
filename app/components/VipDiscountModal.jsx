import React, { useState, useEffect } from 'react';
import { NavLink, useFetcher } from 'react-router';
import { CartForm } from '@shopify/hydrogen';

const STORAGE_KEY_DISMISSED = 'batik_smile_vip_discount_dismissed_at';
const STORAGE_KEY_CLAIMED = 'batik_smile_vip_discount_claimed';
const DISCOUNT_CODE = 'BATIK25';
const DISMISS_COOLDOWN_MS = 5 * 24 * 60 * 60 * 1000; // 5 days cooldown

/**
 * VIP Email Newsletter & Discount Modal
 * - Quiet Luxury Nusantara Zero-Radius aesthetics.
 * - Mobile zero-zoom input compliance (minimum 16px font size on mobile).
 * - Automatic 25% discount voucher reveal with one-click copy and auto-apply link.
 * - Live Shopify connection: syncs subscriber email to Shopify Cart Buyer Identity.
 * - Non-intrusive delayed trigger with localStorage persistence.
 */
export function VipDiscountModal() {
  const fetcher = useFetcher();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Check if already claimed or recently dismissed
    try {
      const isClaimed = localStorage.getItem(STORAGE_KEY_CLAIMED);
      if (isClaimed) return;

      const dismissedAt = localStorage.getItem(STORAGE_KEY_DISMISSED);
      if (dismissedAt) {
        const timeDiff = Date.now() - parseInt(dismissedAt, 10);
        if (timeDiff < DISMISS_COOLDOWN_MS) return;
      }
    } catch {
      // Ignore localStorage errors (e.g. incognito quota)
    }

    // Trigger after 5 seconds delay OR scroll trigger
    let timerId = null;
    let hasTriggered = false;

    const triggerModal = () => {
      if (hasTriggered) return;
      hasTriggered = true;
      setIsOpen(true);
      window.removeEventListener('scroll', handleScroll);
    };

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0 && window.scrollY / scrollHeight > 0.3) {
        triggerModal();
      }
    };

    timerId = setTimeout(triggerModal, 6000);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (timerId) clearTimeout(timerId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle ESC key to dismiss
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleDismiss();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleDismiss = () => {
    setIsOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY_DISMISSED, Date.now().toString());
    } catch {
      // Ignore storage error
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    // Dispatch subscriber email directly to Shopify Cart Buyer Identity
    try {
      fetcher.submit(
        {
          [CartForm.INPUT_NAME]: JSON.stringify({
            action: CartForm.ACTIONS.BuyerIdentityUpdate,
            inputs: {
              buyerIdentity: {
                email: email.trim(),
              },
            },
          }),
        },
        { method: 'POST', action: '/cart' }
      );
    } catch {
      // Fallback gracefully
    }

    setIsSubmitted(true);
    try {
      localStorage.setItem(STORAGE_KEY_CLAIMED, 'true');
    } catch {
      // Ignore storage error
    }
  };

  const handleCopyCode = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(DISCOUNT_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="vip-discount-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none animate-fadeIn"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/65 backdrop-blur-xs transition-opacity"
        onClick={handleDismiss}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-lg bg-[#FAF8F5] border border-[#C5A059]/50 shadow-2xl p-6 sm:p-10 z-10 text-center rounded-none transition-all">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Tutup penawaran diskon"
          className="absolute top-3 right-3 w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center text-sm font-light text-[#111111] hover:text-[#C5A059] transition-colors cursor-pointer"
        >
          ✕
        </button>

        {/* Top Gold Accent Bar */}
        <div className="w-12 h-0.5 bg-[#C5A059] mx-auto mb-5" />

        {/* Whispered Eyebrow */}
        <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#9E7D3B] block mb-2">
          HAK ISTIMEWA PELANGGAN
        </span>

        {!isSubmitted ? (
          <>
            {/* Main Headline */}
            <h2
              id="vip-discount-title"
              className="font-serif text-3xl sm:text-4xl text-[#111111] font-normal tracking-wide mb-3 leading-tight"
            >
              Hak Istimewa Diskon 25%
            </h2>

            {/* Editorial Description */}
            <p className="text-xs sm:text-[13px] text-[#5A5550] font-light leading-relaxed mb-6 max-w-md mx-auto">
              Daftarkan email Anda untuk menerima kode voucher eksklusif potongan 25% pada pesanan pertama, rilis wastra pusaka terbatas, dan layanan fitting VIP di Showroom Simongan.
            </p>

            {/* Subscription Form with Mobile Zero-Zoom 16px Font Input */}
            <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
              <div>
                <label htmlFor="vip-discount-email" className="sr-only">
                  Alamat Email Anda
                </label>
                <input
                  id="vip-discount-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan alamat email Anda..."
                  className="w-full px-4 py-3.5 text-base sm:text-sm text-[#111111] placeholder:text-[#888888] bg-white border border-[#E2DFD8] focus:border-[#C5A059] focus:outline-none rounded-none transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-[#111111] hover:bg-[#C5A059] text-white hover:text-[#111111] text-[11px] font-bold uppercase tracking-[0.22em] transition-colors rounded-none cursor-pointer shadow-sm min-h-[44px]"
              >
                KLAIM DISKON 25% SEKARANG
              </button>
            </form>

            <div className="mt-4 flex items-center justify-between text-[10px] tracking-wider text-[#888888]">
              <span className="font-light">Privasi terlindungi &bull; Tanpa spam</span>
              <button
                type="button"
                onClick={handleDismiss}
                className="uppercase tracking-[0.16em] hover:text-[#111111] transition-colors cursor-pointer py-1"
              >
                Nanti Saja
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-5 animate-fadeIn">
            {/* Success Headline */}
            <h2
              id="vip-discount-title"
              className="font-serif text-3xl sm:text-4xl text-[#111111] font-normal tracking-wide leading-tight"
            >
              Selamat! Hak Istimewa Aktif
            </h2>

            <p className="text-xs sm:text-[13px] text-[#5A5550] font-light leading-relaxed max-w-md mx-auto">
              Terima kasih telah bergabung. Salin kode voucher eksklusif Anda di bawah ini dan gunakan saat checkout:
            </p>

            {/* Voucher Box (Quiet Luxury Hairline Card) */}
            <div className="bg-white border border-[#C5A059]/60 py-4 px-6 flex items-center justify-between gap-4 my-4 shadow-xs">
              <div className="text-left">
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#9E7D3B] font-semibold block">
                  KODE VOUCHER
                </span>
                <span className="font-mono text-2xl font-bold tracking-[0.2em] text-[#111111]">
                  {DISCOUNT_CODE}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopyCode}
                className="px-4 py-2 text-[10px] uppercase font-bold tracking-[0.16em] bg-[#111111] hover:bg-[#C5A059] text-white hover:text-[#111111] transition-colors rounded-none cursor-pointer min-h-[38px]"
              >
                {copied ? '✓ TERSALIN' : 'SALIN KODE'}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <NavLink
                to={`/discount/${DISCOUNT_CODE}?redirect=/collections/all`}
                onClick={handleDismiss}
                className="w-full block py-3.5 px-6 bg-[#C5A059] hover:bg-[#111111] text-[#111111] hover:text-white text-[11px] font-bold uppercase tracking-[0.22em] transition-colors rounded-none text-center min-h-[44px]"
              >
                GUNAKAN DISKON 25% &amp; MULAI BELANJA &rarr;
              </NavLink>

              <button
                type="button"
                onClick={handleDismiss}
                className="text-[10px] uppercase tracking-[0.16em] text-[#777777] hover:text-[#111111] transition-colors cursor-pointer py-1"
              >
                Tutup Jendela
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
