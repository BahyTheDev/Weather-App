"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { GEOLOCATION } from "@/lib/config";

interface Position {
  latitude: number;
  longitude: number;
}

interface UseGeolocationOptions {
  latitude?: number;
  longitude?: number;
  enabled?: boolean;
}

interface GeolocationError extends Error {
  code: number;
}

function createGeolocationError(code: number, message: string): GeolocationError {
  return {
    code,
    message,
    name: "GeolocationError",
  } as GeolocationError;
}

export function useGeolocation(options: UseGeolocationOptions = {}) {
  const { enabled = true, latitude: initialLat, longitude: initialLng } = options;

  // Lazy initial state from initial coords if provided
  const [position, setPosition] = useState<Position | null>(() => {
    if (initialLat && initialLng) {
      return { latitude: initialLat, longitude: initialLng };
    }
    return null;
  });
  const [error, setError] = useState<GeolocationError | null>(null);
  const [loading, setLoading] = useState(false);
  const initializedRef = useRef(false);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError(createGeolocationError(2, "Geolocation is not supported by this browser"));
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        setError(null);
        setLoading(false);
      },
      (err) => {
        setError(createGeolocationError(err.code, err.message));
        setPosition(null);
        setLoading(false);
      },
      {
        enableHighAccuracy: GEOLOCATION.ENABLE_HIGH_ACCURACY,
        timeout: GEOLOCATION.TIMEOUT,
        maximumAge: GEOLOCATION.MAXIMUM_AGE,
      }
    );
  }, []);

  // Effect to handle option changes
  useEffect(() => {
    // If disabled, clear position
    if (!enabled) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Safe initialization based on props
      setPosition(null);
      initializedRef.current = false;
      return;
    }

    // If initial coords provided, use them
    if (initialLat && initialLng) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Safe initialization based on props
      setPosition({ latitude: initialLat, longitude: initialLng });
      initializedRef.current = true;
    } else if (!initializedRef.current) {
      // Only auto-request once on mount if no initial coords
      initializedRef.current = true;
      requestLocation();
    }
  }, [enabled, initialLat, initialLng, requestLocation]);

  return {
    position,
    error,
    loading,
    refetch: requestLocation,
  };
}
