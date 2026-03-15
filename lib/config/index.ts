/**
 * Application configuration constants
 * Centralized configuration for easy maintenance and consistency
 */

export const API = {
  BASE_URL: "https://api.open-meteo.com/v1",
  GEOCODING_URL: "https://geocoding-api.open-meteo.com/v1/search",
} as const;

export const CACHE = {
  // Weather data cache duration in seconds (10 minutes)
  WEATHER_REVALIDATE: 600,
  // React Query cache times in milliseconds
  QUERY_STALE_TIME: 10 * 60 * 1000, // 10 minutes
  QUERY_GC_TIME: 15 * 60 * 1000, // 15 minutes
  QUERY_RETRY: 2,
} as const;

export const GEOLOCATION = {
  TIMEOUT: 10000,
  MAXIMUM_AGE: 0,
  ENABLE_HIGH_ACCURACY: true,
} as const;

export const STORAGE = {
  UNIT_PREFERENCE_KEY: "weather-app.use-imperial",
} as const;

export const LOCATION_SEARCH = {
  MIN_QUERY_LENGTH: 2,
  DEFAULT_RESULT_COUNT: 5,
} as const;

export const WEATHER_CODE_RANGES = {
  CLEAR: [0] as const,
  CLOUDY: [1, 2, 3] as const,
  RAIN: [51, 52, 53, 54, 55, 56, 57, 61, 62, 63, 64, 65, 66, 67, 80, 81, 82] as const,
  SNOW: [71, 73, 75, 77, 85, 86] as const,
  STORM: [95, 96, 99] as const,
} as const;

export const BACKGROUND_GRADIENTS = {
  DEFAULT: "from-blue-50 to-cyan-100 dark:from-slate-900 dark:to-slate-800",
  CLEAR_WARM: "from-blue-100 to-cyan-200 dark:from-slate-900 dark:to-slate-800",
  CLEAR_COLD: "from-blue-200 to-indigo-300 dark:from-slate-900 dark:to-slate-800",
  CLOUDY: "from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-900",
  RAIN: "from-slate-200 to-blue-300 dark:from-slate-900 dark:to-slate-800",
  STORM: "from-purple-900 to-indigo-900 dark:from-slate-900 dark:to-slate-800",
  SNOW: "from-cyan-100 to-blue-100 dark:from-slate-900 dark:to-slate-800",
} as const;

export const DEFAULT_LOCATION = {
  LATITUDE: 51.5074,
  LONGITUDE: -0.1278,
  NAME: "San Francisco, CA",
} as const;
