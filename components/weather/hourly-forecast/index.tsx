"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HourlyForecast as HourlyForecastType } from "@/lib/api/types";
import { formatTime, formatTemperature } from "@/lib/utils/format";
import { getWeatherInfo } from "@/lib/utils/weather-codes";
import { HourlyCard } from "./hourly-card";

interface HourlyForecastProps {
  hourly: HourlyForecastType;
  timezone?: string;
  useImperial: boolean;
}

export function HourlyForecast({ hourly, timezone, useImperial }: HourlyForecastProps) {
  // Show next 12 hours
  const hoursToShow = Math.min(12, hourly.time.length);

  return (
    <Card className="overflow-hidden border-0 bg-white/10 backdrop-blur-xl text-white shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-white drop-shadow-lg flex items-center gap-2">
          <span>⏱️ Hourly Forecast</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
          {Array.from({ length: hoursToShow }).map((_, idx) => {
            const time = hourly.time[idx];
            const temp = hourly.temperature_2m[idx];
            const code = hourly.weather_code[idx];
            const precip = hourly.precipitation_probability?.[idx] ?? 0;
            const weatherInfo = getWeatherInfo(code);

            if (!time) return null;

            return (
              <HourlyCard
                key={idx}
                time={formatTime(time, timezone)}
                temperature={formatTemperature(temp, useImperial)}
                icon={weatherInfo.icon}
                precipitation={precip}
                isCurrent={idx === 0}
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

