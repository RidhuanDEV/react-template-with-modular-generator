import { Link, useLocation } from "react-router-dom";
import { clsx } from "clsx";
import type { ReactNode } from "react";

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
    <nav className={clsx("menubar", className)} role="menubar">
      {items.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={clsx(
            "menubar__item",
            location.pathname === item.href && "menubar__item--active",
          )}
          role="menuitem"
        >
          {item.icon && <span className="menubar__icon">{item.icon}</span>}
          {item.label}
        </Link>
      ))}
    </nav>
  );
};
