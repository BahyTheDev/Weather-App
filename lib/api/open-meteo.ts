import { WeatherResponse } from "./types";
import { API, CACHE } from "@/lib/config";

export async function fetchWeather(
  latitude: number,
  longitude: number,
  timezone?: string
): Promise<WeatherResponse> {
  // Current weather
  const currentUrl = new URL(`${API.BASE_URL}/forecast`);
  currentUrl.searchParams.set("latitude", latitude.toString());
  currentUrl.searchParams.set("longitude", longitude.toString());
  currentUrl.searchParams.set(
    "current",
    "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,pressure_msl,visibility"
  );
  currentUrl.searchParams.set(
    "hourly",
    "temperature_2m,relative_humidity_2m,weather_code,precipitation_probability,wind_speed_10m,wind_direction_10m"
  );
  currentUrl.searchParams.set(
    "daily",
    "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset"
  );
  currentUrl.searchParams.set("forecast_days", "7");
  if (timezone) {
    currentUrl.searchParams.set("timezone", timezone);
  }

  const response = await fetch(currentUrl.toString(), {
    next: {
      // Revalidate data every 10 minutes when using SSR
      revalidate: CACHE.WEATHER_REVALIDATE,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch weather: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  // Transform data to match our schema
  return {
    current: {
      time: data.current.time,
      temperature: data.current.temperature_2m,
      relative_humidity: data.current.relative_humidity_2m,
      weather_code: data.current.weather_code,
      wind_speed_10m: data.current.wind_speed_10m,
      wind_direction_10m: data.current.wind_direction_10m,
      pressure_msl: data.current.pressure_msl,
      visibility: data.current.visibility,
      elevation: data.elevation,
      apparent_temperature: data.current.apparent_temperature,
    },
    hourly: {
      time: data.hourly.time,
      temperature_2m: data.hourly.temperature_2m,
      relative_humidity_2m: data.hourly.relative_humidity_2m,
      weather_code: data.hourly.weather_code,
      precipitation_probability: data.hourly.precipitation_probability,
      wind_speed_10m: data.hourly.wind_speed_10m,
      wind_direction_10m: data.hourly.wind_direction_10m,
    },
    daily: {
      time: data.daily.time,
      weather_code: data.daily.weather_code,
      temperature_2m_max: data.daily.temperature_2m_max,
      temperature_2m_min: data.daily.temperature_2m_min,
      precipitation_probability_max: data.daily.precipitation_probability_max,
      sunrise: data.daily.sunrise,
      sunset: data.daily.sunset,
    },
    latitude: data.latitude,
    longitude: data.longitude,
    timezone: data.timezone,
  };
}

export async function searchCity(
  name: string,
  count: number = 5
): Promise<{ latitude: number; longitude: number; name: string; country: string }[]> {
  // Use Open-Meteo's geocoding API
  const url = new URL(API.GEOCODING_URL);
  url.searchParams.set("name", name);
  url.searchParams.set("count", count.toString());
  url.searchParams.set("language", "en");
  url.searchParams.set("format", "json");

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Failed to search city: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    return [];
  }

  return data.results.map((result: {
    name: string;
    country: string;
    latitude: number;
    longitude: number;
    admin1?: string;
  }) => ({
    latitude: result.latitude,
    longitude: result.longitude,
    name: `${result.name}${result.admin1 ? `, ${result.admin1}` : ""}`,
    country: result.country,
  }));
}
