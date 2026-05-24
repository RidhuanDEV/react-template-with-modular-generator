import { create } from "zustand";
import type { ReactNode } from "react";

type ToastVariant = "default" | "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  title?: string;
  description?: string | ReactNode;
  variant: ToastVariant;
  duration: number;
}

interface ToastState {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

let toastCounter = 0;

export const useToastStore = create<ToastState>()((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = `toast-${String(++toastCounter)}`;
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }],
    }));
    if (toast.duration > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      }, toast.duration);
    }
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));

type ToastOptions = Partial<Pick<Toast, "title" | "description" | "duration">>;

export const toast = {
  success: (options: ToastOptions) =>
    useToastStore
      .getState()
      .addToast({ variant: "success", duration: 5000, ...options }),
  error: (options: ToastOptions) =>
    useToastStore
      .getState()
      .addToast({ variant: "error", duration: 7000, ...options }),
  warning: (options: ToastOptions) =>
    useToastStore
      .getState()
      .addToast({ variant: "warning", duration: 5000, ...options }),
  info: (options: ToastOptions) =>
    useToastStore
      .getState()
      .addToast({ variant: "info", duration: 5000, ...options }),
  default: (options: ToastOptions) =>
    useToastStore
      .getState()
      .addToast({ variant: "default", duration: 5000, ...options }),
};
