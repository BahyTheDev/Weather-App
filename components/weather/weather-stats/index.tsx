"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeatherResponse } from "@/lib/api/types";
import { formatTemperature, formatSpeed, directionToCardinal } from "@/lib/utils/format";
import {
  Droplets,
  Wind,
  Gauge,
  Eye,
  Sun,
} from "lucide-react";
import { getWeatherInfo } from "@/lib/utils/weather-codes";

interface WeatherStatsProps {
  weather: WeatherResponse;
  useImperial: boolean;
}

export function WeatherStats({ weather, useImperial }: WeatherStatsProps) {
  const current = weather.current;
  const weatherInfo = getWeatherInfo(current.weather_code);

  const stats = [
    {
      label: "Humidity",
      value: `${current.relative_humidity ?? "--"}%`,
      icon: Droplets,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-slate-800",
    },
    {
      label: "Wind",
      value: `${formatSpeed(current.wind_speed_10m, useImperial)} ${directionToCardinal(current.wind_direction_10m)}`,
      icon: Wind,
      color: "text-cyan-600 dark:text-cyan-400",
      bg: "bg-cyan-50 dark:bg-slate-800",
    },
    {
      label: "Pressure",
      value: current.pressure_msl ? `${current.pressure_msl.toFixed(1)} hPa` : "--",
      icon: Gauge,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-50 dark:bg-slate-800",
    },
    {
      label: "Visibility",
      value: current.visibility ? `${(current.visibility / 1000).toFixed(1)} km` : "--",
      icon: Eye,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-slate-800",
    },
    {
      label: "Condition",
      value: weatherInfo.description,
      icon: Sun,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-slate-800",
    },
    {
      label: "Feels Like",
      value: current.apparent_temperature
        ? formatTemperature(current.apparent_temperature, useImperial)
        : formatTemperature(current.temperature, useImperial),
      icon: Wind,
      color: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-50 dark:bg-slate-800",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Weather Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center p-4 rounded-lg ${stat.bg} hover:shadow-md transition-shadow`}
            >
              <stat.icon className={`h-6 w-6 ${stat.color} mb-2`} />
              <span className="text-xs text-gray-500 dark:text-gray-400 text-center">
                {stat.label}
              </span>
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 text-center">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
