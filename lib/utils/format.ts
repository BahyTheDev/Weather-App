import { format, parseISO } from "date-fns";

/**
 * Converts a date string to a Date object, handling optional timezone
 */
function getDateFromString(dateString: string, timezone?: string): Date {
  // If timezone is provided, the date string is treated as being in that timezone
  // We append 'Z' to treat it as UTC, which effectively shifts it by the timezone offset
  return timezone ? new Date(dateString + "Z") : parseISO(dateString);
}

export function formatTime(dateString: string, timezone?: string): string {
  const date = getDateFromString(dateString, timezone);
  return format(date, "h:mm a");
}

export function formatDay(dateString: string, timezone?: string): string {
  const date = getDateFromString(dateString, timezone);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow";
  }

  return format(date, "EEE");
}

export function formatTemperature(celsius: number, toFahrenheit: boolean): string {
  if (toFahrenheit) {
    return `${Math.round(celsius * 9/5 + 32)}°F`;
  }
  return `${Math.round(celsius)}°C`;
}

export function formatSpeed(mps: number, toMph: boolean): string {
  if (toMph) {
    const mph = mps * 2.23694;
    return `${Math.round(mph)} mph`;
  }
  return `${Math.round(mps)} km/h`;
}

export function directionToCardinal(degrees: number): string {
  const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}

export function formatTimeRange(start: string, end: string, timezone?: string): string {
  const startDate = timezone ? new Date(start + "Z") : parseISO(start);
  const endDate = timezone ? new Date(end + "Z") : parseISO(end);
  return `${format(startDate, "h:mm a")} - ${format(endDate, "h:mm a")}`;
}
