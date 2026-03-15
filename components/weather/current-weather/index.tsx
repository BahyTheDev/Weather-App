"use client";

import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { WeatherResponse } from "@/lib/api/types";
import { getWeatherInfo } from "@/lib/utils/weather-codes";
import {
  formatTemperature,
  directionToCardinal,
  formatSpeed,
} from "@/lib/utils/format";
import {
  Droplets,
  Wind,
  Gauge,
  Eye,
  Sun,
  MapPin,
} from "lucide-react";

interface CurrentWeatherProps {
  weather: WeatherResponse;
  useImperial: boolean;
}

export function CurrentWeather({ weather, useImperial }: CurrentWeatherProps) {
  const current = weather.current;
  const weatherInfo = getWeatherInfo(current.weather_code);

  const todayHigh = weather.daily.temperature_2m_max[0];
  const todayLow = weather.daily.temperature_2m_min[0];

  const stats = useMemo(() => [
    {
      label: "Humidity",
      value: `${current.relative_humidity ?? "--"}%`,
      icon: Droplets,
      color: "text-blue-300",
      bg: "bg-blue-500/20",
      border: "border-blue-400/30",
    },
    {
      label: "Wind",
      value: `${formatSpeed(current.wind_speed_10m, useImperial)}`,
      sub: directionToCardinal(current.wind_direction_10m),
      icon: Wind,
      color: "text-cyan-300",
      bg: "bg-cyan-500/20",
      border: "border-cyan-400/30",
    },
    {
      label: "Pressure",
      value: current.pressure_msl ? `${current.pressure_msl.toFixed(1)}` : "--",
      sub: "hPa",
      icon: Gauge,
      color: "text-indigo-300",
      bg: "bg-indigo-500/20",
      border: "border-indigo-400/30",
    },
    {
      label: "Visibility",
      value: current.visibility ? `${(current.visibility / 1000).toFixed(1)}` : "--",
      sub: "km",
      icon: Eye,
      color: "text-emerald-300",
      bg: "bg-emerald-500/20",
      border: "border-emerald-400/30",
    },
    {
      label: "Feels Like",
      value: current.apparent_temperature
        ? formatTemperature(current.apparent_temperature, useImperial)
        : formatTemperature(current.temperature, useImperial),
      icon: Sun,
      color: "text-amber-300",
      bg: "bg-amber-500/20",
      border: "border-amber-400/30",
    },
  ], [current, useImperial]);

  return (
    <Card className="overflow-hidden border-0 bg-white/10 backdrop-blur-xl text-white shadow-2xl">
      <CardContent className="p-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Main Weather Display */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
                <MapPin className="h-4 w-4" />
                <span className="text-sm font-medium">{weatherInfo.description}</span>
              </div>

              <div className="text-8xl md:text-9xl font-bold tracking-tight drop-shadow-2xl">
                {formatTemperature(current.temperature, useImperial)}
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-6 text-xl text-white/90">
                <span>H: {formatTemperature(todayHigh, useImperial)}</span>
                <span className="text-white/40">|</span>
                <span>L: {formatTemperature(todayLow, useImperial)}</span>
              </div>
            </div>
          </div>

          {/* Weather Stats Grid */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col items-center p-4 rounded-2xl ${stat.bg} backdrop-blur-sm border ${stat.border} hover:scale-105 transition-all duration-300 shadow-lg`}
                >
                  <stat.icon className={`h-6 w-6 ${stat.color} mb-3`} />
                  <span className="text-xs text-white/70 uppercase tracking-wide mb-1">
                    {stat.label}
                  </span>
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold text-white">{stat.value}</span>
                    {stat.sub && (
                      <span className="text-xs text-white/60">{stat.sub}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
