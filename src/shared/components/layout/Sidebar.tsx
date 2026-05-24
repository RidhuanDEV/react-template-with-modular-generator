import React from "react";
import { NavLink } from "react-router-dom";
import { clsx } from "clsx";
import { ROUTES } from "@/config/routes";

export const Sidebar: React.FC = () => {
  const links = [
    { to: ROUTES.HOME, label: "Dashboard", icon: "📊" },
  ];

  return (
    <div className="sidebar-nav">
      <div className="sidebar-nav__brand">
        <span className="sidebar-nav__brand-icon">🚀</span>
        <span className="sidebar-nav__brand-name">SSO Portal</span>
      </div>
      <nav className="sidebar-nav__menu">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              clsx("sidebar-nav__link", isActive && "sidebar-nav__link--active")
            }
          >
            <span className="sidebar-nav__link-icon">{link.icon}</span>
            <span className="sidebar-nav__link-label">{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
