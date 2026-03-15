import { z } from "zod";

// Open-Meteo weather code mapping
export const WeatherCodeSchema = z.object({
  code: z.number(),
  description: z.string(),
  icon: z.string(),
});

export type WeatherCode = z.infer<typeof WeatherCodeSchema>;

// Current weather data
export const CurrentWeatherSchema = z.object({
  time: z.string(),
  temperature: z.number(),
  relative_humidity: z.number().optional(),
  weather_code: z.number(),
  wind_speed_10m: z.number(),
  wind_direction_10m: z.number(),
  pressure_msl: z.number().optional(),
  visibility: z.number().optional(),
  elevation: z.number().optional(),
  apparent_temperature: z.number().optional(),
});

export type CurrentWeather = z.infer<typeof CurrentWeatherSchema>;

// Hourly forecast data
export const HourlyForecastSchema = z.object({
  time: z.array(z.string()),
  temperature_2m: z.array(z.number()),
  relative_humidity_2m: z.array(z.number()).optional(),
  weather_code: z.array(z.number()),
  precipitation_probability: z.array(z.number()).optional(),
  wind_speed_10m: z.array(z.number()),
  wind_direction_10m: z.array(z.number()),
});

export type HourlyForecast = z.infer<typeof HourlyForecastSchema>;

// Daily forecast data
export const DailyForecastSchema = z.object({
  time: z.array(z.string()),
  weather_code: z.array(z.number()),
  temperature_2m_max: z.array(z.number()),
  temperature_2m_min: z.array(z.number()),
  precipitation_probability_max: z.array(z.number()).optional(),
  sunrise: z.array(z.string()).optional(),
  sunset: z.array(z.string()).optional(),
});

export type DailyForecast = z.infer<typeof DailyForecastSchema>;

// Complete weather response
export const WeatherResponseSchema = z.object({
  current: CurrentWeatherSchema,
  hourly: HourlyForecastSchema,
  daily: DailyForecastSchema,
  latitude: z.number(),
  longitude: z.number(),
  timezone: z.string(),
});

export type WeatherResponse = z.infer<typeof WeatherResponseSchema>;

// Geocoding response
export const GeoLocationSchema = z.object({
  name: z.string(),
  country: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  admin1: z.string().optional(),
});

export type GeoLocation = z.infer<typeof GeoLocationSchema>;
