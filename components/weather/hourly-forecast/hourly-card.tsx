"use client";

import { Card, CardContent } from "@/components/ui/card";
import { WeatherIcon } from "@/components/shared/weather-icon";

interface HourlyCardProps {
  time: string;
  temperature: string;
  icon: string;
  precipitation: number;
  isCurrent?: boolean;
}

export function HourlyCard({ time, temperature, icon, precipitation, isCurrent = false }: HourlyCardProps) {
  return (
    <div
      className={`flex-shrink-0 w-28 snap-center transition-all duration-300 ${
        isCurrent ? "scale-105" : "hover:scale-105"
      }`}
    >
      <Card
        className={`overflow-hidden backdrop-blur-md ${
          isCurrent
            ? "bg-white/30 border-2 border-white/50 shadow-xl shadow-white/20"
            : "bg-white/10 border border-white/20 hover:bg-white/20 hover:shadow-lg hover:shadow-white/10"
        }`}
      >
        <CardContent className="p-5 flex flex-col items-center gap-3 text-white">
          <div className={`text-sm font-semibold ${isCurrent ? "text-white" : "text-white/80"}`}>
            {time}
          </div>
          <WeatherIcon code={icon} className="h-12 w-12 drop-shadow-lg" />
          <div className="text-2xl font-bold">{temperature}</div>
          {precipitation > 0 && (
            <>
              <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-white/80 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${precipitation}%` }}
                />
              </div>
              <div className="text-xs text-white/70">
                💧 {precipitation}%
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
