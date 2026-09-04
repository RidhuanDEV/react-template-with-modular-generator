import React, { useRef } from "react";
import { cn } from "@/lib/utils";

export interface InputOTPProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
  className?: string;
  autoFocus?: boolean;
}

export const InputOTP: React.FC<InputOTPProps> = ({
  value = "",
  onChange,
  length = 6,
  disabled = false,
  className,
  autoFocus = false,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const digits = Array.from({ length }, (_, i) => value[i] || "");

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (event.key === "Backspace") {
      if (!digits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (event.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const rawVal = event.target.value;
    const char = rawVal.slice(-1);

    if (char && !/^\d$/.test(char)) {
      return;
    }

    const newDigits = [...digits];
    newDigits[index] = char;
    const newValue = newDigits.join("");
    onChange(newValue);

    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const pastedData = event.clipboardData
      .getData("text/plain")
      .trim()
      .replace(/\D/g, "")
      .slice(0, length);

    if (pastedData) {
      onChange(pastedData);
      const nextFocus = Math.min(pastedData.length, length - 1);
      inputRefs.current[nextFocus]?.focus();
    }
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 sm:gap-3",
        className,
      )}
    >
      {digits.map((digit, index) => {
        const isCurrentActive =
          value.length === index ||
          (value.length === length && index === length - 1);

        return (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength={1}
            value={digit}
            disabled={disabled}
            autoFocus={autoFocus && index === 0}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className={cn(
              "flex size-11 items-center justify-center rounded-lg border text-center font-mono text-lg font-bold shadow-2xs transition-all duration-150 sm:size-12",
              "border-input bg-background text-foreground hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
              isCurrentActive && "border-primary ring-2 ring-primary/20",
              disabled && "cursor-not-allowed opacity-50",
            )}
            aria-label={`Digit ${index + 1} of ${length}`}
          />
        );
      })}
    </div>
  );
};
