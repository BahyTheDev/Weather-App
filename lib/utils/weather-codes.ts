// WMO Weather interpretation codes (WW)
// Source: https://open-meteo.com/en/docs
export const weatherCodes = new Map<number, { description: string; icon: string; day: boolean }>([
  [0, { description: "Clear sky", icon: "sun", day: true }],
  [1, { description: "Mainly clear", icon: "sunny", day: true }],
  [2, { description: "Partly cloudy", icon: "cloudy-sun", day: true }],
  [3, { description: "Overcast", icon: "cloudy", day: true }],
  [45, { description: "Fog", icon: "cloudy-fog", day: true }],
  [48, { description: "Depositing rime fog", icon: "fog", day: true }],
  [51, { description: "Light drizzle", icon: "rain-light", day: true }],
  [53, { description: "Moderate drizzle", icon: "rain-light", day: true }],
  [55, { description: "Dense drizzle", icon: "rain-strong", day: true }],
  [56, { description: "Light freezing drizzle", icon: "rain-sleet", day: true }],
  [57, { description: "Dense freezing drizzle", icon: "rain-sleet", day: true }],
  [61, { description: "Slight rain", icon: "rain-strong", day: true }],
  [63, { description: "Moderate rain", icon: "rain-strong", day: true }],
  [65, { description: "Heavy rain", icon: "rain-strong", day: true }],
  [66, { description: "Light freezing rain", icon: "rain-sleet", day: true }],
  [67, { description: "Heavy freezing rain", icon: "rain-sleet", day: true }],
  [71, { description: "Slight snow", icon: "snow", day: true }],
  [73, { description: "Moderate snow", icon: "snow", day: true }],
  [75, { description: "Heavy snow", icon: "snow", day: true }],
  [77, { description: "Snow grains", icon: "snow", day: true }],
  [80, { description: "Slight rain showers", icon: "rain-strong", day: true }],
  [81, { description: "Moderate rain showers", icon: "rain-strong", day: true }],
  [82, { description: "Violent rain showers", icon: "rain-strong", day: true }],
  [85, { description: "Slight snow showers", icon: "snow", day: true }],
  [86, { description: "Heavy snow showers", icon: "snow", day: true }],
  [95, { description: "Thunderstorm", icon: "storm", day: true }],
  [96, { description: "Thunderstorm with slight hail", icon: "storm", day: true }],
  [99, { description: "Thunderstorm with heavy hail", icon: "storm", day: true }],
]);

export function getWeatherInfo(
  code: number
): { description: string; icon: string; day: boolean } {
  return weatherCodes.get(code) ?? {
    description: "Unknown",
    icon: "cloudy",
    day: true,
  };
}

export function getFeeling(
  temp: number,
  humidity: number,
  windSpeed: number,
  code: number
): string {
  const isCold = temp < 10;
  const isWarm = temp > 25;
  const isHot = temp > 30;
  const isHumid = humidity > 70;
  const isWindy = windSpeed > 20;

  if (isHot && isHumid) return "Oppressive heat";
  if (isHot) return "Sweltering";
  if (isWarm && isHumid) return "Muggy";
  if (isWarm) return "Pleasantly warm";
  if (isCold && isWindy) return "Bitterly cold and windy";
  if (isCold) return "Brisk";
  if (code >= 61 && code <= 67) return "Dreary and wet";
  if (code >= 95) return "Stormy";
  if (code >= 51 && code <= 57) return "Damp and chilly";
  if (isHumid && code <= 3) return "Muggy and stagnant";

  return "Comfortable";
}

export function getRecommendation(
  temp: number,
  humidity: number,
  windSpeed: number,
  code: number
): string {
  const feels = getFeeling(temp, humidity, windSpeed, code);

  if (feels.includes("Cold") || feels.includes("Brisk")) {
    return "Bring a warm jacket";
  }
  if (feels.includes("Sweltering") || feels.includes("Oppressive")) {
    return "Stay hydrated, seek shade";
  }
  if (code >= 51 && code <= 57) {
    return "Carry an umbrella";
  }
  if (code >= 71 && code <= 77) {
    return "Bundle up, expect snow";
  }
  if (code >= 61 && code <= 67) {
    return "Rain expected, bring umbrella";
  }
  if (code >= 95) {
    return "Severe weather, stay indoors if possible";
  }
  if (feels.includes("Pleasant") || feels.includes("Comfortable")) {
    return "Great for outdoor activities";
  }
  if (temp > 20 && windSpeed < 15) {
    return "Perfect for a walk or run";
  }

  return "Check conditions before heading out";
}
