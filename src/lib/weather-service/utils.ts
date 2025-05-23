import { weatherCodeMap } from "./constants";

export const toFixedTemp = (temp: number) => `${temp.toFixed(0)}°C`;

/**
 * Get weather description and icon for a given Open-Meteo weather code
 * @param code number - Open-Meteo weather code
 * @returns { description: string, icon: string }
 */
export function getWeatherInfo(code: number): WeatherInfo {
  return (
    weatherCodeMap[code] ?? {
      description: "Unknown weather",
      icon: "❔",
    }
  );
}
