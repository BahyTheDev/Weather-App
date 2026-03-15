"use client";

import { useQuery } from "@tanstack/react-query";
import { WeatherResponse } from "@/lib/api/types";
import { CACHE } from "@/lib/config";
import { API } from "@/lib/config";

interface UseWeatherOptions {
  latitude: number;
  longitude: number;
  timezone?: string;
}

export function useWeather({ latitude, longitude, timezone }: UseWeatherOptions) {
  return useQuery<WeatherResponse, Error>({
    queryKey: ["weather", latitude, longitude, timezone],
    queryFn: async () => {
      // Direct fetch to Open-Meteo API (client-side for static export)
      const url = new URL(`${API.BASE_URL}/forecast`);
      url.searchParams.set("latitude", latitude.toString());
      url.searchParams.set("longitude", longitude.toString());
      url.searchParams.set("current", "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,pressure_msl,visibility");
      url.searchParams.set("hourly", "temperature_2m,relative_humidity_2m,weather_code,precipitation_probability,wind_speed_10m,wind_direction_10m");
      url.searchParams.set("daily", "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset");
      url.searchParams.set("forecast_days", "7");
      if (timezone) {
        url.searchParams.set("timezone", timezone);
      }

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error(`Failed to fetch weather: ${response.status}`);
      }
      return response.json();
    },
    staleTime: CACHE.QUERY_STALE_TIME,
    gcTime: CACHE.QUERY_GC_TIME,
    retry: CACHE.QUERY_RETRY,
  });
}
