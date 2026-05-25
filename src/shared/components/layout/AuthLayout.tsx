import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "@/config/routes";
import { useAuthStore } from "@/store/auth.store";

export const AuthLayout: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return (
    <div className="min-h-svh bg-background">
      <div className="min-h-svh">
        <Outlet />
      </div>
    </div>
  );
};
