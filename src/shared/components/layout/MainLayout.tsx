import React, { type ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { clsx } from "clsx";
import { useUIStore } from "@/store/ui.store";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface MainLayoutProps {
  sidebar?: ReactNode;
  header?: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ sidebar, header }) => {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);

  return (
    <div className={clsx("layout", sidebarOpen && "layout--sidebar-open")}>
      <header className="layout__header">
        {header || <Header />}
      </header>
      <div className="layout__body">
        <aside className="layout__sidebar">
          {sidebar || <Sidebar />}
        </aside>
        <main className="layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
