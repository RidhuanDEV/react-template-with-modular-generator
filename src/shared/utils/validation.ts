export const isEmail = (value: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

export const isStrongPassword = (value: string): boolean => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(value);
};

export const isUrl = (value: string): boolean => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

export const isPhone = (value: string): boolean => {
  return /^\+?[\d\s-()]{10,}$/.test(value);
};

export const isNotEmpty = (value: string): boolean => {
  return value.trim().length > 0;
};

export const hasMinLength = (value: string, min: number): boolean => {
  return value.length >= min;
};

export const hasMaxLength = (value: string, max: number): boolean => {
  return value.length <= max;
};
