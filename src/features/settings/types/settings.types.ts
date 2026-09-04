import type { AuthUser } from "@/types/auth.types";

export interface UpdateProfileRequest {
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface UpdateProfileResponse {
  user: AuthUser;
  message: string;
}

export interface UpdatePasswordRequest {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
}

export interface UpdatePasswordResponse {
  message: string;
}

export interface DeleteAccountRequest {
  password: string;
}

export interface DeleteAccountResponse {
  message: string;
}

export interface SessionInfo {
  id: string;
  device: string;
  ipAddress: string;
  lastActive: string;
  isCurrent: boolean;
}
