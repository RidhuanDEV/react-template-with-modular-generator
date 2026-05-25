import {
  type ReactNode,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CarouselProps {
  items: ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

export const Carousel: React.FC<CarouselProps> = ({
  items,
  autoPlay = false,
  interval = 5000,
  className,
}) => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prev = useCallback(() => {
    setCurrent((p) => (p - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (autoPlay && items.length > 1) {
      timerRef.current = setInterval(next, interval);
      return () => clearInterval(timerRef.current);
    }
  }, [autoPlay, interval, items.length, next]);

  if (items.length === 0) return null;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border bg-card",
        className,
      )}
    >
      <div className="min-h-40 p-6 transition-all duration-300">
        {items[current]}
      </div>
      {items.length > 1 && (
        <>
          <button
            type="button"
            className="absolute left-3 top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full border bg-background/90 text-foreground shadow-sm transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={prev}
            aria-label="Previous"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="absolute right-3 top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full border bg-background/90 text-foreground shadow-sm transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={next}
            aria-label="Next"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                className={cn(
                  "size-2 rounded-full bg-muted-foreground/35 transition-all hover:bg-muted-foreground/60",
                  i === current && "w-5 bg-primary",
                )}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${String(i + 1)}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
