import { useEffect, useState } from "react";

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

const getScoreColor = (score: number) => {
  if (score >= 85) return "hsl(152, 69%, 50%)";
  if (score >= 70) return "hsl(38, 92%, 50%)";
  return "hsl(0, 72%, 51%)";
};

const getScoreLabel = (score: number) => {
  if (score >= 90) return "Top 10% Performer";
  if (score >= 80) return "Above Market Average";
  if (score >= 70) return "Market Average";
  return "Below Average";
};

const ScoreRing = ({ score, size = 120, strokeWidth = 8 }: ScoreRingProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;
  const color = getScoreColor(score);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 100);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--secondary))"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{ filter: `drop-shadow(0 0 6px ${color}40)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-foreground">{score}</span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Score</span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground font-medium">{getScoreLabel(score)}</p>
    </div>
  );
};

export default ScoreRing;
