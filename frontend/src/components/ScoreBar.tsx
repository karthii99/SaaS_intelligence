import { useEffect, useState } from "react";

interface ScoreBarProps {
  label: string;
  value: number;
  maxValue?: number;
  interpretation?: string;
}

const getBarColor = (value: number) => {
  if (value >= 85) return "bg-success";
  if (value >= 70) return "bg-info";
  if (value >= 55) return "bg-warning";
  return "bg-destructive";
};

const ScoreBar = ({ label, value, maxValue = 100, interpretation }: ScoreBarProps) => {
  const [animatedWidth, setAnimatedWidth] = useState(0);
  const percentage = (value / maxValue) * 100;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedWidth(percentage), 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-sm font-semibold text-foreground">{value}</span>
      </div>
      <div className="h-2 rounded-full bg-secondary overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${getBarColor(value)}`}
          style={{ width: `${animatedWidth}%` }}
        />
      </div>
      {interpretation && (
        <p className="text-xs text-muted-foreground/70 italic">{interpretation}</p>
      )}
    </div>
  );
};

export default ScoreBar;
