import React, { type ReactNode } from "react";
import { MainLayout } from "./MainLayout";

interface AppSidebarLayoutProps {
  sidebar?: ReactNode;
  header?: ReactNode;
}

export const AppSidebarLayout: React.FC<AppSidebarLayoutProps> = (props) => {
  return <MainLayout {...props} />;
};
