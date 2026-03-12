import { Link } from "react-router-dom";
import { clsx } from "clsx";
import type { ReactNode } from "react";

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
    <nav className={clsx("nav-menu", className)}>
      <ul className="nav-menu__list">
        {items.map((item) => (
          <li key={item.href} className="nav-menu__item">
            <Link to={item.href} className="nav-menu__link">
              {item.icon && <span className="nav-menu__icon">{item.icon}</span>}
              {item.label}
            </Link>
            {item.children && item.children.length > 0 && (
              <ul className="nav-menu__submenu">
                {item.children.map((child) => (
                  <li key={child.href} className="nav-menu__subitem">
                    <Link to={child.href} className="nav-menu__sublink">
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
