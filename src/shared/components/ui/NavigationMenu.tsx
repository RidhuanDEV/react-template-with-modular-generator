import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  icon?: ReactNode;
}

interface NavigationMenuProps {
  items: NavItem[];
  className?: string;
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({
  items,
  className,
}) => {
  return (
    <nav className={cn("relative", className)}>
      <ul className="flex flex-wrap items-center gap-1">
        {items.map((item) => (
          <li key={item.href} className="group relative">
            <Link
              to={item.href}
              className="inline-flex h-10 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {item.icon && (
                <span className="size-4 shrink-0">{item.icon}</span>
              )}
              {item.label}
              {item.children && item.children.length > 0 && (
                <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" />
              )}
            </Link>
            {item.children && item.children.length > 0 && (
              <ul className="invisible absolute left-0 top-full z-50 mt-2 min-w-48 rounded-md border bg-popover p-1 text-popover-foreground opacity-0 shadow-md transition-all duration-200 group-hover:visible group-hover:opacity-100">
                {item.children.map((child) => (
                  <li key={child.href}>
                    <Link
                      to={child.href}
                      className="block rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
