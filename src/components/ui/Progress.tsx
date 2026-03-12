import { clsx } from "clsx";

interface ProgressProps {
  value: number;
  max?: number;
  label?: string;
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  label,
  className,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={clsx("progress", className)}>
      {label && <span className="progress__label">{label}</span>}
      <div
        className="progress__track"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className="progress__fill"
          style={{ width: `${String(percentage)}%` }}
        />
      </div>
    </div>
  );
};
