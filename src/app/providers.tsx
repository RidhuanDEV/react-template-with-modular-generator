import type { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "@/components/ui/Toaster";
import { queryClient } from "@/lib/queryClient";
import { ErrorFallback } from "@/components/feedback/ErrorFallback";
import { AuthBootstrap } from "@/features/auth/components/AuthBootstrap";

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <AuthBootstrap>{children}</AuthBootstrap>
        <Toaster />
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
