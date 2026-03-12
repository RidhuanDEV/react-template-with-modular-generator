import {
  type ReactNode,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { clsx } from "clsx";

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
    if (autoPlay) {
      timerRef.current = setInterval(next, interval);
      return () => clearInterval(timerRef.current);
    }
  }, [autoPlay, interval, next]);

  return (
    <div className={clsx("carousel", className)}>
      <div className="carousel__viewport">
        <div className="carousel__slide">{items[current]}</div>
      </div>
      <button
        type="button"
        className="carousel__prev"
        onClick={prev}
        aria-label="Previous"
      >
        &#8592;
      </button>
      <button
        type="button"
        className="carousel__next"
        onClick={next}
        aria-label="Next"
      >
        &#8594;
      </button>
      <div className="carousel__dots">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            className={clsx(
              "carousel__dot",
              i === current && "carousel__dot--active",
            )}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${String(i + 1)}`}
          />
        ))}
      </div>
    </div>
  );
};
