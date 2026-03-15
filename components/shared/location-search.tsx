"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Navigation } from "lucide-react";
import { API } from "@/lib/config";

async function searchCityDirect(name: string, count: number = 5) {
  const url = new URL(API.GEOCODING_URL);
  url.searchParams.set("name", name);
  url.searchParams.set("count", count.toString());
  url.searchParams.set("language", "en");
  url.searchParams.set("format", "json");

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Failed to search city: ${response.status}`);
  }

  const data = await response.json();
  if (!data.results || data.results.length === 0) {
    return [];
  }

  return data.results.map((result: { name: string; country: string; latitude: number; longitude: number; admin1?: string }) => ({
    latitude: result.latitude,
    longitude: result.longitude,
    name: `${result.name}${result.admin1 ? `, ${result.admin1}` : ""}`,
    country: result.country,
  }));
}
import { useGeolocation } from "@/lib/hooks/use-geolocation";
import { LOCATION_SEARCH } from "@/lib/config";

interface LocationSearchProps {
  onLocationSelect: (latitude: number, longitude: number, name: string) => void;
  currentLocationName?: string;
  className?: string;
}

export function LocationSearch({ onLocationSelect, currentLocationName, className }: LocationSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Array<{ name: string; country: string; latitude: number; longitude: number }>>([]);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Use geolocation hook to get position
  const { position, error: geoError, refetch: requestGeolocation, loading: geoLoading } = useGeolocation({
    enabled: false, // Don't auto-request on mount
  });

  // Notify parent when position is obtained
  useEffect(() => {
    if (position) {
      onLocationSelect(position.latitude, position.longitude, "Current Location");
    }
  }, [position, onLocationSelect]);

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < LOCATION_SEARCH.MIN_QUERY_LENGTH) {
      setResults([]);
      return;
    }

    try {
      const data = await searchCityDirect(searchQuery);
      setResults(data);
    } catch (error) {
      console.error("Search failed:", error);
      setResults([]);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Clear results immediately if query is too short
    if (value.length < LOCATION_SEARCH.MIN_QUERY_LENGTH) {
      setResults([]);
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      return;
    }

    // Debounce search to avoid excessive API calls
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      handleSearch(value);
    }, 300);
  };

  const handleResultClick = (result: typeof results[0]) => {
    onLocationSelect(result.latitude, result.longitude, `${result.name}, ${result.country}`);
    setQuery("");
    setResults([]);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
  };

  const handleCurrentLocation = useCallback(() => {
    requestGeolocation();
  }, [requestGeolocation]);

  return (
    <div className={`relative ${className}`}>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search city..."
            value={query}
            onChange={handleInputChange}
            className="pl-10 pr-4"
            aria-label="Search for a city"
            disabled={geoLoading}
          />
          {geoLoading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
            </div>
          )}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={handleCurrentLocation}
          aria-label="Use current location"
          title="Use current location"
          disabled={geoLoading}
        >
          <Navigation className="h-4 w-4" />
        </Button>
      </div>

      {/* Geolocation error */}
      {geoError && (
        <div className="mt-2 text-sm font-medium bg-red-100 dark:bg-red-900/30 border-2 border-red-500 text-gray-900 dark:text-white px-4 py-3 rounded-md shadow-sm">
          <span className="font-bold">Location Error:</span> {geoError.message}
        </div>
      )}

      {results.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full rounded-md border bg-white shadow-lg dark:bg-slate-800 max-h-60 overflow-auto">
          {results.map((result, index) => (
            <li key={index}>
              <button
                type="button"
                className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                onClick={() => handleResultClick(result)}
              >
                <span className="font-medium">{result.name}</span>
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">{result.country}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {currentLocationName && (
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1">
          <Navigation className="h-3 w-3" />
          <span>{currentLocationName}</span>
        </div>
      )}
    </div>
  );
}
