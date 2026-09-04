export interface AuthUser {
  id: string;
  email: string;
  name: string;
  permissions: string[];
  avatarUrl?: string;
  emailVerified?: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface RegisterResponse {
  token: string;
  user: AuthUser;
  message?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ResetPasswordRequest {
  token: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export interface ConfirmPasswordRequest {
  password: string;
}

export interface ConfirmPasswordResponse {
  confirmed: boolean;
  message: string;
}

export interface ResendVerificationResponse {
  message: string;
}
