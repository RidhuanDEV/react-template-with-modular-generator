import React, { type ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { useUIStore } from "@/store/ui.store";
import { cn } from "@/lib/utils";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface MainLayoutProps {
  sidebar?: ReactNode;
  header?: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ sidebar, header }) => {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);

  return (
    <div className="grid min-h-svh grid-rows-[auto_1fr] bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        {header || <Header />}
      </header>
      <div
        className={cn(
          "grid min-h-0 transition-[grid-template-columns] duration-300 ease-out",
          sidebarOpen ? "grid-cols-[16rem_1fr]" : "grid-cols-[0rem_1fr]",
        )}
      >
        <aside className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden border-r bg-sidebar text-sidebar-foreground transition-all duration-300 ease-out">
          {sidebar || <Sidebar />}
        </aside>
        <main className="min-w-0 overflow-y-auto bg-muted/30 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
