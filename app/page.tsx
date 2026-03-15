"use client";

import { useState, useCallback, useMemo } from "react";
import { CurrentWeather } from "@/components/weather/current-weather";
import { HourlyForecast } from "@/components/weather/hourly-forecast";
import { DailyForecast } from "@/components/weather/daily-forecast";
import { LocationSearch } from "@/components/shared/location-search";
import { UnitToggle } from "@/components/shared/unit-toggle";
import { useGeolocation } from "@/lib/hooks/use-geolocation";
import { useWeather } from "@/lib/hooks/use-weather";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import { MapPin, CloudSun, Wind } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DEFAULT_LOCATION, STORAGE } from "@/lib/config";

export default function HomePage() {
  const [locationName, setLocationName] = useState<string>("");
  const [manualCoords, setManualCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [useImperial, setUseImperial] = useLocalStorage<boolean>(STORAGE.UNIT_PREFERENCE_KEY, false);

  const { position, error: geoError, loading: geoLoading } = useGeolocation();

  // Use manual coords if set, otherwise use geolocation or default
  const effectiveCoords = manualCoords || position || { latitude: DEFAULT_LOCATION.LATITUDE, longitude: DEFAULT_LOCATION.LONGITUDE };
  const { latitude, longitude } = effectiveCoords;

  const {
    data: weather,
    isLoading,
    error: weatherError,
  } = useWeather({
    latitude,
    longitude,
    timezone: "auto",
  });

  const handleLocationSelect = useCallback(
    (lat: number, lon: number, name: string) => {
      setManualCoords({ latitude: lat, longitude: lon });
      setLocationName(name);
    },
    []
  );

  const getBackgroundStyle = () => {
    if (!weather) {
      return {
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      };
    }

    const code = weather.current.weather_code;
    const temp = weather.current.temperature;

    // Clear day
    if (code === 0 && temp > 15) {
      return {
        background: "linear-gradient(135deg, #56CCF2 0%, #2F80ED 100%)",
      };
    }
    // Clear cold
    if (code === 0 && temp <= 15) {
      return {
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      };
    }
    // Cloudy
    if (code >= 1 && code <= 3) {
      return {
        background: "linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)",
      };
    }
    // Rain
    if (code >= 51 && code <= 67) {
      return {
        background: "linear-gradient(135deg, #373B44 0%, #4286f4 100%)",
      };
    }
    // Storm
    if (code >= 95) {
      return {
        background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
      };
    }
    // Snow
    if (code >= 71) {
      return {
        background: "linear-gradient(135deg, #E0EAFC 0%, #CFDEF3 100%)",
      };
    }

    return {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    };
  };

  const currentLocationDisplay = useMemo(() => {
    if (locationName) return locationName;
    if (geoLoading) return "Detecting location...";
    return DEFAULT_LOCATION.NAME;
  }, [locationName, geoLoading]);

  return (
    <div className="min-h-screen" style={getBackgroundStyle()}>
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
              <CloudSun className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white drop-shadow-lg">
                Meteora
              </h1>
              <div className="flex items-center gap-2 mt-1 text-white/90">
                <MapPin className="h-4 w-4" />
                <span className="text-sm font-medium">{currentLocationDisplay}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <LocationSearch
              onLocationSelect={handleLocationSelect}
              currentLocationName={locationName}
            />
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-1">
              <UnitToggle
                useImperial={useImperial}
                onToggle={setUseImperial}
              />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="space-y-8">
          {/* Error Alert */}
          {(geoError || weatherError) && (
            <Alert variant="destructive" className="bg-red-100 dark:bg-red-900/40 border-2 border-red-500 text-gray-900 dark:text-white shadow-md">
              <AlertDescription className="font-semibold text-gray-900 dark:text-white">
                {geoError?.message || weatherError?.message || "Failed to load weather data"}
              </AlertDescription>
            </Alert>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <div className="relative">
                <div className="h-20 w-20 rounded-full border-4 border-white/30 border-t-white animate-spin" />
                <Wind className="absolute inset-0 m-auto h-8 w-8 text-white animate-pulse" />
              </div>
              <span className="text-white text-lg font-medium drop-shadow">
                Fetching weather data...
              </span>
            </div>
          )}

          {/* Weather Content */}
          {weather && !isLoading && (
            <>
              {/* Hero Section - Current Weather */}
              <section className="mb-8">
                <CurrentWeather weather={weather} useImperial={useImperial} />
              </section>

              {/* Hourly Forecast */}
              <section className="mb-8">
                <HourlyForecast
                  hourly={weather.hourly}
                  timezone={weather.timezone}
                  useImperial={useImperial}
                />
              </section>

              {/* Daily Forecast */}
              <section className="mb-8">
                <DailyForecast
                  daily={weather.daily}
                  timezone={weather.timezone}
                  useImperial={useImperial}
                />
              </section>
            </>
          )}

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-white/20 text-center text-white/80 text-sm">
            <p className="mb-2">
              Weather data provided by{" "}
              <a
                href="https://open-meteo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/80 underline font-medium transition-colors"
              >
                Open-Meteo
              </a>
            </p>
            <p className="text-white/60 text-xs">
              {weather ? `Last updated: ${new Date().toLocaleTimeString()}` : ""}
            </p>
            <p className="mt-3 text-white/50 text-xs">
              Built with Next.js • Designed with care
            </p>
          </footer>
        </main>
      </div>

      {/* Decorative weather effects */}
      {weather && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          {weather.current.weather_code === 0 && (
            <>
              <div className="absolute top-20 left-10 w-2 h-2 bg-yellow-300 rounded-full blur-sm animate-pulse" />
              <div className="absolute top-40 right-20 w-3 h-3 bg-yellow-300 rounded-full blur-sm animate-pulse" />
              <div className="absolute bottom-40 left-20 w-2 h-2 bg-yellow-300 rounded-full blur-sm animate-pulse" />
            </>
          )}
          {weather.current.weather_code >= 51 && weather.current.weather_code <= 67 && (
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/5 to-transparent animate-pulse" />
          )}
        </div>
      )}
    </div>
  );
}
