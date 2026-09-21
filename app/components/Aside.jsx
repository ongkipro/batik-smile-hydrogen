import {createContext, useContext, useEffect, useState} from 'react';
import {useId} from 'react';

/**
 * A side bar component with Overlay
 * @example
 * ```jsx
 * <Aside type="search" heading="SEARCH">
 *  <input type="search" />
 *  ...
 * </Aside>
 * ```
 * @param {{
 *   children?: React.ReactNode;
 *   type: AsideType;
 *   heading: React.ReactNode;
 * }}
 */
export function Aside({children, heading, type}) {
  const {type: activeType, close} = useAside();
  const expanded = type === activeType;
  const id = useId();
  useEffect(() => {
    const abortController = new AbortController();

    if (expanded) {
      document.addEventListener(
        'keydown',
        function handler(event) {
          if (event.key === 'Escape') {
            close();
          }
        },
        {signal: abortController.signal},
      );
    }
    return () => abortController.abort();
  }, [close, expanded]);

  return (
    <div
      aria-modal
      className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
        expanded ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
      }`}
      role="dialog"
      aria-labelledby={id}
    >
      {/* Backdrop with Velvety Blur (Symmetric with LuxurySearchModal) */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-300" 
        onClick={close} 
        aria-hidden="true"
      />
      
      {/* Drawer Container (Slide from left for mobile menu, right for cart) */}
      <aside
        className={`fixed top-0 ${
          type === 'mobile' ? 'left-0' : 'right-0'
        } h-[100dvh] max-h-[100dvh] w-full sm:w-[460px] lg:w-[480px] bg-[#FAF8F5] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] transition-transform duration-300 ease-in-out ${
          expanded
            ? 'translate-x-0'
            : type === 'mobile'
            ? '-translate-x-full'
            : 'translate-x-full'
        }`}
      >
        {/* Top Header Bar with Architectural Precision */}
        <header className="flex flex-shrink-0 items-center justify-between px-5 sm:px-8 py-3.5 sm:py-4 border-b border-[#E2DFD8] bg-white z-10 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 bg-[#C5A059] shrink-0" />
            <h3 id={id} className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-[#111111] m-0">
              {heading}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-[9px] uppercase tracking-[0.2em] text-[#888888]">
              [ESC] TUTUP
            </span>
            <button 
              className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center text-base font-light text-[#111111] hover:text-[#C5A059] transition-colors cursor-pointer"
              onClick={close} 
              aria-label="Tutup panel samping"
            >
              &#10005;
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col">
          {children}
        </main>
      </aside>
    </div>
  );
}

export const AsideContext = createContext(null);

Aside.Provider = function AsideProvider({children}) {
  const [type, setType] = useState('closed');

  return (
    <AsideContext.Provider
      value={{
        type,
        open: setType,
        close: () => setType('closed'),
      }}
    >
      {children}
    </AsideContext.Provider>
  );
};

export function useAside() {
  const aside = useContext(AsideContext);
  if (!aside) {
    throw new Error('useAside must be used within an AsideProvider');
  }
  return aside;
}

/** @typedef {'search' | 'cart' | 'mobile' | 'closed'} AsideType */
/**
 * @typedef {{
 *   type: AsideType;
 *   open: (mode: AsideType) => void;
 *   close: () => void;
 * }} AsideContextValue
 */

/** @typedef {import('react').ReactNode} ReactNode */
