import type { ReactNode } from "react";
import { clsx } from "clsx";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import type { BreadcrumbItem } from "@/types/common.types";

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  breadcrumbs,
  actions,
  className,
}) => {
  return (
    <div className={clsx("page-header", className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumb items={breadcrumbs} />
      )}
      <div className="page-header__row">
        <div className="page-header__text">
          <h1 className="page-header__title">{title}</h1>
          {description && (
            <p className="page-header__description">{description}</p>
          )}
        </div>
        {actions && <div className="page-header__actions">{actions}</div>}
      </div>
    </div>
  );
};
