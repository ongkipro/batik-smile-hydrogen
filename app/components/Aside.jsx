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
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={close} 
        aria-hidden="true"
      />
      
      {/* Drawer Container */}
      <aside
        className={`absolute top-0 ${
          type === 'mobile' ? 'left-0' : 'right-0'
        } h-[100dvh] max-h-[100dvh] w-full sm:w-[420px] bg-[#FAF8F5] shadow-[0_20px_50px_rgba(0,0,0,0.18)] flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] transition-transform duration-300 ease-in-out ${
          expanded
            ? 'translate-x-0'
            : type === 'mobile'
            ? '-translate-x-full'
            : 'translate-x-full'
        }`}
      >
        <header className={`flex flex-shrink-0 items-center justify-between h-16 sm:h-20 px-6 sm:px-8 border-b border-[#E2DFD8] z-10 ${type === 'mobile' ? 'bg-[#FAF8F5]' : 'bg-white'}`}>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#C5A059]" />
            <h3 id={id} className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#111111] m-0">
              {heading}
            </h3>
          </div>
          <button 
            className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center text-sm font-light text-[#111111] hover:text-[#C5A059] transition-colors cursor-pointer"
            onClick={close} 
            aria-label="Tutup menu samping"
          >
            ✕
          </button>
        </header>
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </aside>
    </div>
  );
}

const AsideContext = createContext(null);

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
