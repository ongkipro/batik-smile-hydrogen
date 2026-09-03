import React from 'react';

/**
 * TrustGuaranteeBar: Engrasia Archetype 4 Core Trust Pillars
 * Local Free Delivery, Tukar Size Guarantee, Styling Support, Secure Payments
 */
export function TrustGuaranteeBar() {
  const pillars = [
    {
      id: 'delivery',
      title: 'LOCAL FREE DELIVERY',
      desc: 'Bebas Ongkir Seluruh Nusantara',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      ),
    },
    {
      id: 'satisfaction',
      title: 'SATISFIED OR REFUNDED',
      desc: 'Jaminan Kepuasan & Bebas Tukar Ukuran',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
    },
    {
      id: 'support',
      title: 'TOP-NOTCH SUPPORT',
      desc: 'Konsultan Batik Pribadi 3S 1C 1T 1H',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      id: 'security',
      title: 'SECURE PAYMENTS',
      desc: 'Pembayaran Resmi Terenkripsi',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-[#F4EFEA] border-b border-[#E2DFD8] py-10 sm:py-12 px-4 sm:px-8 lg:px-12 xl:px-16">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {pillars.map((pillar) => (
          <div
            key={pillar.id}
            className="flex items-center gap-4 py-2 px-3 border-l-2 border-[#C5A059] sm:border-l-0 sm:border-t-2 sm:pt-4"
          >
            <div className="text-[#C5A059] flex-shrink-0">{pillar.icon}</div>
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#111111]">
                {pillar.title}
              </h3>
              <p className="text-[10px] text-[#5A5550] mt-0.5 tracking-wide">
                {pillar.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
