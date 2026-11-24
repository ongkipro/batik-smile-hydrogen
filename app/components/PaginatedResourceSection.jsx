import * as React from 'react';
import {Pagination} from '@shopify/hydrogen';

/**
 * <PaginatedResourceSection> encapsulates the previous and next pagination behaviors throughout your application.
 * Calibrated for Quiet Luxury 0px radius architecture, seamless flow, and zero harsh divider lines.
 *
 * @param {{
 *   connection: any;
 *   children: (props: {node: any; index: number}) => React.ReactNode;
 *   ariaLabel?: string;
 *   resourcesClassName?: string;
 *   loadMoreText?: string;
 *   loadPreviousText?: string;
 *   badgeText?: string;
 *   captionText?: string;
 * }} props
 */
export function PaginatedResourceSection({
  connection,
  children,
  ariaLabel,
  resourcesClassName,
  loadMoreText = 'LIHAT LEBIH BANYAK',
  loadPreviousText = 'LIHAT SEBELUMNYA',
  badgeText = 'KURASI ARSIP',
  captionText,
}) {
  return (
    <Pagination connection={connection}>
      {({nodes, isLoading, hasNextPage, hasPreviousPage, PreviousLink, NextLink}) => {
        const resourcesMarkup = nodes.map((node, index) =>
          children({node, index}),
        );

        return (
          <div className="w-full">
            {hasPreviousPage && (
              <div className="flex justify-center mb-10">
                <PreviousLink className="group inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-white hover:bg-[#111111] text-[#111111] hover:text-white border border-[#E2DFD8] hover:border-[#C5A059] text-xs uppercase font-bold tracking-[0.2em] transition-all no-underline shadow-sm cursor-pointer">
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 border border-[#C5A059] border-t-transparent animate-spin inline-block" />
                      <span>MEMUAT...</span>
                    </span>
                  ) : (
                    <span>
                      <span className="text-[#C5A059] group-hover:-translate-y-0.5 inline-block transition-transform">&uarr;</span> {loadPreviousText}
                    </span>
                  )}
                </PreviousLink>
              </div>
            )}

            {resourcesClassName ? (
              <div
                aria-label={ariaLabel}
                className={resourcesClassName}
                role={ariaLabel ? 'region' : undefined}
              >
                {resourcesMarkup}
              </div>
            ) : (
              resourcesMarkup
            )}

            {hasNextPage && (
              <div className="flex flex-col items-center justify-center mt-12 sm:mt-16 text-center">
                {badgeText && (
                  <span className="text-xs uppercase tracking-[0.25em] text-[#9E7D3B] font-semibold mb-3">
                    {badgeText}
                  </span>
                )}

                <NextLink className="group relative inline-flex items-center justify-center gap-3 px-10 py-3.5 bg-[#111111] hover:bg-[#C5A059] text-white hover:text-[#111111] border border-[#C5A059]/40 hover:border-[#111111] text-xs uppercase font-bold tracking-[0.22em] transition-all duration-300 shadow-md hover:shadow-lg no-underline cursor-pointer">
                  {isLoading ? (
                    <span className="flex items-center gap-2.5">
                      <span className="w-4 h-4 border-2 border-[#C5A059] border-t-transparent animate-spin inline-block" />
                      <span>MEMUAT ARSIP...</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-2.5">
                      <span>{loadMoreText}</span>
                      <span className="text-[#C5A059] group-hover:text-[#111111] group-hover:translate-y-0.5 transition-transform duration-300">&darr;</span>
                    </span>
                  )}
                </NextLink>

                {captionText && (
                  <p className="text-xs text-[#A69F96] tracking-wider mt-3 font-light max-w-md">
                    {captionText}
                  </p>
                )}
              </div>
            )}
          </div>
        );
      }}
    </Pagination>
  );
}
