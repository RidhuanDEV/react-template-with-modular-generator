import React from "react";
import { cn } from "@/lib/utils";

interface InputErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {
  message?: string;
}

export const InputError: React.FC<InputErrorProps> = ({
  message,
  className,
  ...props
}) => {
  if (!message) return null;

  return (
    <p
      className={cn(
        "text-xs font-medium text-destructive animate-in fade-in-0 slide-in-from-top-1 duration-150",
        className,
      )}
      role="alert"
      {...props}
    >
      {message}
    </p>
  );
};
