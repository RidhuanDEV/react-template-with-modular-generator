import { type ReactNode, useEffect, useState } from "react";
import { LoadingOverlay } from "@/components/feedback";
import { logger } from "@/lib/logger";
import { useAuthStore } from "@/store/auth.store";
import { authService } from "../services";

interface AuthBootstrapProps {
  children: ReactNode;
}

export const AuthBootstrap = ({ children }: AuthBootstrapProps) => {
  const token = useAuthStore((state) => state.token);
  const setAuth = useAuthStore((state) => state.setAuth);
  const logout = useAuthStore((state) => state.logout);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isActive = true;

    if (!token) {
      setIsReady(true);

      return () => {
        isActive = false;
      };
    }

    const bootstrapSession = async (): Promise<void> => {
      try {
        const response = await authService.me();

        if (isActive) {
          setAuth(token, response.data);
        }
      } catch (error) {
        logger.warn(
          "[Auth] Session bootstrap failed. Clearing auth state.",
          error,
        );

        if (isActive) {
          logout();
        }
      } finally {
        if (isActive) {
          setIsReady(true);
        }
      }
    };

    setIsReady(false);
    void bootstrapSession();

    return () => {
      isActive = false;
    };
  }, [logout, setAuth, token]);

  if (!isReady) {
    return <LoadingOverlay visible message="Restoring your session..." />;
  }

  return <>{children}</>;
};
