import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "@/config/routes";
import { useAuthStore } from "@/store/auth.store";

export const AuthLayout: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return (
    <div className="auth-layout">
      <div className="auth-layout__container">
        <Outlet />
      </div>
    </div>
  );
};
