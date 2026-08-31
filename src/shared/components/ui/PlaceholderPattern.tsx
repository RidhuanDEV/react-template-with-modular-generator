import React, { type SVGProps } from "react";
import { cn } from "@/lib/utils";

interface PlaceholderPatternProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

export const PlaceholderPattern: React.FC<PlaceholderPatternProps> = ({
  className,
  ...props
}) => {
  const patternId = React.useId();

  return (
    <svg
      className={cn(
        "absolute inset-0 size-full stroke-muted-foreground/20 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]",
        className,
      )}
      aria-hidden="true"
      {...props}
    >
      <defs>
        <pattern
          id={patternId}
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
          x="-1"
          y="-1"
        >
          <path d="M.5 24V.5H24" fill="none" strokeDasharray="2 2" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth="0"
        fill={`url(#${patternId})`}
      />
    </svg>
  );
};
