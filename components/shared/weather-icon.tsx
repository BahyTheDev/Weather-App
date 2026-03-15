"use client";

import { cn } from "@/lib/utils";

interface WeatherIconProps {
  code: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "h-5 w-5",
  md: "h-8 w-8",
  lg: "h-12 w-12",
  xl: "h-16 w-16",
};

export function WeatherIcon({ code, className, size = "md" }: WeatherIconProps) {
  const iconProps = {
    className: cn(sizeClasses[size], className),
    "data-weather-icon": code,
  };

  const icons: Record<string, React.ReactNode> = {
    sun: (
      <svg viewBox="0 0 24 24" fill="currentColor" {...iconProps}>
        <circle cx="12" cy="12" r="4" className="text-amber-400" />
        <path
          d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M18.36 5.64l1.42-1.42"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-amber-300"
        />
      </svg>
    ),
    sunny: (
      <svg viewBox="0 0 24 24" fill="currentColor" {...iconProps}>
        <circle cx="12" cy="12" r="5" className="text-amber-400" />
        <path
          d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-amber-300"
        />
      </svg>
    ),
    "cloudy-sun": (
      <svg viewBox="0 0 24 24" fill="currentColor" {...iconProps}>
        <path
          d="M14 10a4 4 0 0 1-8 0c0-2.21 3.58-4 8-4s8 1.79 8 4"
          className="text-gray-300"
        />
        <path
          d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M18.36 5.64l1.42-1.42"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-amber-400"
        />
      </svg>
    ),
    cloudy: (
      <svg viewBox="0 0 24 24" fill="currentColor" {...iconProps}>
        <path d="M14 10a4 4 0 0 1-8 0c0-2.21 3.58-4 8-4s8 1.79 8 4" className="text-gray-400" />
        <path d="M10 14c0-1.1.9-2 2-2s2 .9 2 2" className="text-gray-500" />
      </svg>
    ),
    "cloudy-fog": (
      <svg viewBox="0 0 24 24" fill="currentColor" {...iconProps}>
        <path d="M14 10a4 4 0 0 1-8 0c0-2.21 3.58-4 8-4s8 1.79 8 4" className="text-gray-400" />
        <path d="M8 14c0-2.21 1.79-4 4-4s4 1.79 4 4" className="text-gray-500" />
      </svg>
    ),
    fog: (
      <svg viewBox="0 0 24 24" fill="currentColor" {...iconProps}>
        <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4" className="text-gray-400" />
        <path d="M4 14c0-2.21 1.79-4 4-4s4 1.79 4 4" className="text-gray-500" />
      </svg>
    ),
    "rain-light": (
      <svg viewBox="0 0 24 24" fill="currentColor" {...iconProps}>
        <path d="M8 10a4 4 0 0 1-8 0c0-2.21 3.58-4 8-4s8 1.79 8 4" className="text-blue-400" />
        <path
          d="M10 18l-2 3M14 18l2 3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          className="text-blue-500"
        />
      </svg>
    ),
    "rain-strong": (
      <svg viewBox="0 0 24 24" fill="currentColor" {...iconProps}>
        <path d="M8 10a4 4 0 0 1-8 0c0-2.21 3.58-4 8-4s8 1.79 8 4" className="text-blue-500" />
        <path
          d="M8 18l-2 4M12 18l0 4M16 18l2 4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          className="text-blue-600"
        />
      </svg>
    ),
    "rain-sleet": (
      <svg viewBox="0 0 24 24" fill="currentColor" {...iconProps}>
        <path d="M8 10a4 4 0 0 1-8 0c0-2.21 3.58-4 8-4s8 1.79 8 4" className="text-blue-500" />
        <path
          d="M8 18l-2 4M12 18l0 4M16 18l2 4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          className="text-blue-600"
        />
        <path
          d="M10 16l1 2M14 16l1 2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          className="text-gray-400"
        />
      </svg>
    ),
    snow: (
      <svg viewBox="0 0 24 24" fill="currentColor" {...iconProps}>
        <path d="M8 10a4 4 0 0 1-8 0c0-2.21 3.58-4 8-4s8 1.79 8 4" className="text-sky-300" />
        <path
          d="M8 18l-2 4M12 18l0 4M16 18l2 4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          className="text-sky-200"
        />
      </svg>
    ),
    storm: (
      <svg viewBox="0 0 24 24" fill="currentColor" {...iconProps}>
        <path d="M8 10a4 4 0 0 1-8 0c0-2.21 3.58-4 8-4s8 1.79 8 4" className="text-purple-500" />
        <path
          d="M13 2L11 9h2l-1 4 2-2 1 3-2-1 2 2-1-3 2 2-2 4 2-3 1 4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          className="text-yellow-400"
        />
      </svg>
    ),
  };

  return icons[code] || icons.cloudy;
}
