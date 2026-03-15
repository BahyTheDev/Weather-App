"use client";

import { WeatherIcon } from "@/components/shared/weather-icon";
import { Sun, Sunset } from "lucide-react";

interface DayCardProps {
  day: string;
  icon: string;
  high: string;
  low: string;
  precipitation: string;
  recommendation: string;
  sunrise?: string;
  sunset?: string;
}

export function DayCard({
  day,
  icon,
  high,
  low,
  precipitation,
  recommendation,
  sunrise,
  sunset,
}: DayCardProps) {
  return (
    <div className="py-4 px-6 hover:bg-white/10 transition-colors border-b border-white/10 last:border-b-0">
      <div className="flex items-center justify-between gap-4">
        {/* Day name */}
        <div className="w-20 font-semibold text-white">
          {day}
        </div>

        {/* Weather icon */}
        <div className="flex-shrink-0">
          <WeatherIcon code={icon} className="h-10 w-10 drop-shadow-lg" />
        </div>

        {/* Temperature range */}
        <div className="flex-1 flex items-center gap-2">
          <span className="font-bold text-xl text-white">{high}</span>
          <span className="text-white/40">/</span>
          <span className="text-white/70">{low}</span>
        </div>

        {/* Precipitation */}
        <div className="w-16 text-right">
          <div className="inline-flex items-center gap-1 text-white/80 text-sm">
            <span>💧</span>
            <span>{precipitation}</span>
          </div>
        </div>

        {/* Sunrise/Sunset */}
        {sunrise && sunset && (
          <div className="hidden sm:flex items-center gap-3 text-xs text-white/60">
            <div className="flex items-center gap-1">
              <Sun className="h-3 w-3" />
              <span>{sunrise}</span>
            </div>
            <div className="flex items-center gap-1">
              <Sunset className="h-3 w-3" />
              <span>{sunset}</span>
            </div>
          </div>
        )}

        {/* Recommendation tooltip */}
        <div className="hidden lg:block w-48 text-sm text-white/60 truncate" title={recommendation}>
          {recommendation}
        </div>
      </div>
    </div>
  );
}
