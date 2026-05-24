import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "@/config/routes";
import { useAuthStore } from "@/store/auth.store";
import { hasPermission } from "@/config/permissions";
import type { Permission } from "@/types/common.types";

interface PermissionGuardProps {
  permissions: Permission[];
  fallbackPath?: string;
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  permissions,
  fallbackPath = ROUTES.UNAUTHORIZED,
}) => {
  const user = useAuthStore((s) => s.user);

  if (!user || !hasPermission(user.permissions, permissions)) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <Outlet />;
};
