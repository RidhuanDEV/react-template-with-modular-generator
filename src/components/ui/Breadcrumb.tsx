import { Link } from "react-router-dom";
import { clsx } from "clsx";
import type { BreadcrumbItem } from "@/types/common.types";

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => {
  return (
    <nav aria-label="Breadcrumb" className={clsx("breadcrumb", className)}>
      <ol className="breadcrumb__list">
        {items.map((item, index) => (
          <li key={item.label} className="breadcrumb__item">
            {index > 0 && <span className="breadcrumb__separator">/</span>}
            {item.href && index < items.length - 1 ? (
              <Link to={item.href} className="breadcrumb__link">
                {item.label}
              </Link>
            ) : (
              <span className="breadcrumb__current" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
