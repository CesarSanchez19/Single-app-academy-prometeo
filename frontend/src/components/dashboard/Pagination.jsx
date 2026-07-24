import { ChevronLeft, ChevronRight } from 'lucide-react';

const getVisiblePages = (currentPage, totalPages) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = new Set([1, totalPages, currentPage]);

  if (currentPage > 2) pages.add(currentPage - 1);
  if (currentPage < totalPages - 1) pages.add(currentPage + 1);
  if (currentPage <= 3) pages.add(2).add(3).add(4);
  if (currentPage >= totalPages - 2) {
    pages.add(totalPages - 1).add(totalPages - 2).add(totalPages - 3);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const result = [];

  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      result.push('ellipsis');
    }
    result.push(sorted[i]);
  }

  return result;
};

export const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);
  const visiblePages = getVisiblePages(currentPage, totalPages);

  const navButtonClass =
    'inline-flex size-9 cursor-pointer items-center justify-center rounded-lg border border-[rgba(14,21,32,0.14)] bg-white text-[#243044] transition-[color,border-color,transform] duration-150 hover:border-[rgba(14,21,32,0.22)] hover:text-[#b85c28] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(184,92,40,0.35)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[rgba(14,21,32,0.14)] disabled:hover:text-[#243044] disabled:active:scale-100 motion-reduce:transition-none motion-reduce:active:scale-100';

  const pageButtonClass = (isActive) =>
    `inline-flex size-9 cursor-pointer items-center justify-center rounded-lg border text-[13px] font-semibold tabular-nums transition-[color,background-color,border-color,transform] duration-150 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(184,92,40,0.35)] motion-reduce:transition-none motion-reduce:active:scale-100 ${
      isActive
        ? 'border-[#b85c28] bg-[rgba(184,92,40,0.1)] text-[#b85c28]'
        : 'border-transparent bg-transparent text-[#5a6a7e] hover:border-[rgba(14,21,32,0.14)] hover:bg-white hover:text-[#0e1520]'
    }`;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[rgba(14,21,32,0.08)] bg-[#fafbfc] px-5 py-3.5">
      <p className="text-[13px] text-[#8d9aad]">
        Showing{' '}
        <span className="font-semibold text-[#5a6a7e]">{startItem}</span>
        {' – '}
        <span className="font-semibold text-[#5a6a7e]">{endItem}</span>
        {' of '}
        <span className="font-semibold text-[#5a6a7e]">{totalItems}</span>
      </p>

      <nav className="flex items-center gap-1" aria-label="Pagination">
        <button
          type="button"
          className={navButtonClass}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>

        {visiblePages.map((page, index) =>
          page === 'ellipsis' ? (
            <span
              key={`ellipsis-${index}`}
              className="inline-flex size-9 items-center justify-center text-[13px] text-[#8d9aad]"
              aria-hidden="true"
            >
              …
            </span>
          ) : (
            <button
              key={page}
              type="button"
              className={pageButtonClass(page === currentPage)}
              onClick={() => onPageChange(page)}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          )
        )}

        <button
          type="button"
          className={navButtonClass}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </nav>
    </div>
  );
};
