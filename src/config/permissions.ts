import type { Permission } from "@/types/common.types";

export const PERMISSIONS = {
  USER_VIEW: "user:view",
  USER_CREATE: "user:create",
  USER_EDIT: "user:edit",
  USER_DELETE: "user:delete",
  ADMIN_ACCESS: "admin:access",
  SETTINGS_VIEW: "settings:view",
  SETTINGS_EDIT: "settings:edit",
} as const;

export type AppPermission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export const hasPermission = (
  userPermissions: Permission[],
  required: Permission | Permission[],
): boolean => {
  const requiredList = Array.isArray(required) ? required : [required];
  return requiredList.every((p) => userPermissions.includes(p));
};
