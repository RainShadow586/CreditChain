import React, { useEffect, useState } from 'react';
import { getScoreBand } from '@/lib/scoreEngine';

interface ScoreGaugeProps {
  score: number;
  size?: number;
}

export function ScoreGauge({ score, size = 220 }: ScoreGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const band = getScoreBand(score);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * score);
      setAnimatedScore(current);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [score]);

  const radius = (size - 20) / 2;
  const circumference = Math.PI * radius;
  const progress = (animatedScore / 850) * circumference;
  const center = size / 2;

  return (
    <div className="flex flex-col items-center gap-3">
      <svg width={size} height={size / 2 + 20} viewBox={`0 0 ${size} ${size / 2 + 20}`}>
        {/* Track */}
        <path
          d={`M 10 ${center} A ${radius} ${radius} 0 0 1 ${size - 10} ${center}`}
          fill="none"
          stroke="#162E93"
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* Active arc */}
        <path
          d={`M 10 ${center} A ${radius} ${radius} 0 0 1 ${size - 10} ${center}`}
          fill="none"
          stroke="#2F2FE4"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          style={{ transition: 'stroke-dashoffset 0.3s ease' }}
        />
        {/* Score number */}
        <text
          x={center}
          y={center - 15}
          textAnchor="middle"
          fill="white"
          fontSize={size > 160 ? "42" : "28"}
          fontWeight="700"
        >
          {animatedScore}
        </text>
        <text
          x={center}
          y={center + 10}
          textAnchor="middle"
          fill="#A0AEC0"
          fontSize="14"
        >
          out of 850
        </text>
      </svg>
      <div
        className="px-4 py-1.5 rounded-full text-sm font-semibold"
        style={{ backgroundColor: band.color + '20', color: band.color }}
      >
        {band.label}
      </div>
    </div>
  );
}
