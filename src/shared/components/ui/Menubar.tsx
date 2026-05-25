import { Link, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MenubarItem {
  label: string;
  href: string;
  icon?: ReactNode;
}

interface MenubarProps {
  items: MenubarItem[];
  className?: string;
}

export const Menubar: React.FC<MenubarProps> = ({ items, className }) => {
  const location = useLocation();

  return (
    <nav
      className={cn(
        "flex items-center gap-1 rounded-md border bg-background p-1",
        className,
      )}
      role="menubar"
    >
      {items.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "inline-flex items-center gap-2 rounded-sm px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
            location.pathname === item.href &&
              "bg-accent text-accent-foreground",
          )}
          role="menuitem"
        >
          {item.icon && <span className="size-4 shrink-0">{item.icon}</span>}
          {item.label}
        </Link>
      ))}
    </nav>
  );
};
