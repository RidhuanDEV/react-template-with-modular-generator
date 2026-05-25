import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const pageButtonClass =
    "inline-flex size-9 items-center justify-center rounded-md border border-input bg-background text-sm font-medium shadow-xs transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";

  return (
    <nav
      className={cn(
        "flex flex-wrap items-center justify-center gap-2",
        className,
      )}
      aria-label="Pagination"
    >
      <button
        type="button"
        className={pageButtonClass}
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
      </button>
      <div className="flex items-center gap-1">
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            className={cn(
              pageButtonClass,
              page === currentPage &&
                "border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground",
            )}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        type="button"
        className={pageButtonClass}
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
      >
        <ChevronRight className="size-4" aria-hidden="true" />
      </button>
    </nav>
  );
};
