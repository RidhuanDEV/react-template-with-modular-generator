import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { BreadcrumbItem } from "@/types/common.types";
import { cn } from "@/lib/utils";

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
        {items.map((item, index) => (
          <li key={item.label} className="inline-flex items-center gap-1.5">
            {index > 0 && (
              <ChevronRight className="size-3.5" aria-hidden="true" />
            )}
            {item.href && index < items.length - 1 ? (
              <Link
                to={item.href}
                className="font-medium text-muted-foreground no-underline transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-foreground" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
