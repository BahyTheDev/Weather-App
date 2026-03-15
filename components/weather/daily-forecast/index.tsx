"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DailyForecast as DailyForecastType } from "@/lib/api/types";
import { formatDay, formatTemperature } from "@/lib/utils/format";
import { getWeatherInfo, getRecommendation } from "@/lib/utils/weather-codes";
import { DayCard } from "./day-card";

interface DailyForecastProps {
  daily: DailyForecastType;
  timezone?: string;
  useImperial: boolean;
}

export function DailyForecast({ daily, timezone, useImperial }: DailyForecastProps) {
  // Show next 7 days
  const daysToShow = Math.min(7, daily.time.length);

  const formatTime = (timeString: string): string => {
    // For timezone-aware formatting, we need to parse and format correctly
    const date = timezone ? new Date(timeString + "Z") : new Date(timeString);
    return date.toLocaleTimeString("en-US", { hour: "numeric", hour12: true });
  };

  return (
    <Card className="overflow-hidden border-0 bg-white/10 backdrop-blur-xl text-white shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-white drop-shadow-lg flex items-center gap-2">
          <span>📅 7-Day Forecast</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-white/10">
          {Array.from({ length: daysToShow }).map((_, idx) => {
            const day = daily.time[idx];
            const code = daily.weather_code[idx];
            const tempMax = daily.temperature_2m_max[idx];
            const tempMin = daily.temperature_2m_min[idx];
            const precip = daily.precipitation_probability_max?.[idx] ?? 0;
            const sunrise = daily.sunrise?.[idx];
            const sunset = daily.sunset?.[idx];

            if (!day) return null;

            const weatherInfo = getWeatherInfo(code);
            const recommendation = getRecommendation(
              tempMax,
              50, // average humidity guess
              10, // average wind guess
              code
            );

            return (
              <DayCard
                key={idx}
                day={formatDay(day, timezone)}
                icon={weatherInfo.icon}
                high={formatTemperature(tempMax, useImperial)}
                low={formatTemperature(tempMin, useImperial)}
                precipitation={`${precip}%`}
                recommendation={recommendation}
                sunrise={sunrise ? formatTime(sunrise) : undefined}
                sunset={sunset ? formatTime(sunset) : undefined}
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

