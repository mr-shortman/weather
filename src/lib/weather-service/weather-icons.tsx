"use client";
import {
  WiDaySunny,
  WiDayCloudy,
  WiCloudy,
  WiFog,
  WiSprinkle,
  WiRainMix,
  WiRain,
  WiRainWind,
  WiSnow,
  WiSnowflakeCold,
  WiShowers,
  WiSnowWind,
  WiThunderstorm,
  // WiNa,
  WiNightClear,
  WiNightAltCloudy,
  WiNightAltRain,
  WiNightAltSnow,
  WiNightAltSprinkle,
  /* @ts-ignore */
} from "weather-icons-react";

import { type ComponentType } from "react";
import { cn } from "../utils";
import { Icons, weatherIcons } from "@/components/icons";
import { Settings } from "lucide-react";

export function getWeatherIcon(
  code: number,
  isDaytime: boolean
): ComponentType<any> {
  const day = isDaytime;

  switch (code) {
    case 0:
      return day ? weatherIcons.clearDay : weatherIcons.clearNight;
    case 1:
    case 2:
      return day ? weatherIcons.dayCloudy : WiNightAltCloudy;
    case 3:
      return WiCloudy;
    case 45:
    case 48:
      return WiFog;

    case 51:
    case 53:
    case 55:
      return day ? weatherIcons.sprinkle : WiNightAltSprinkle;
    case 56:
    case 57:
      return weatherIcons.rainMix;

    case 61:
    case 63:
    case 65:
      return day ? weatherIcons.rain : weatherIcons.rainNight;
    case 66:
    case 67:
      return weatherIcons.rainwind;

    case 71:
    case 73:
    case 75:
      return day ? WiSnow : WiNightAltSnow;
    case 77:
      return WiSnowflakeCold;

    case 80:
    case 81:
    case 82:
      return weatherIcons.showers;

    case 85:
    case 86:
      return WiSnowWind;

    case 95:
    case 96:
    case 99:
      return weatherIcons.thunderstorm;

    default:
      return WiSnow;
    // return WiNa;
  }
}

export const getAllUniqueWeatherIcons = () => {
  const uniqueIcons = new Set<ComponentType<any>>();

  // Add all codes you handle in getWeatherIcon
  const codes = [
    0, 1, 2, 3, 45, 48, 51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 71, 73, 75, 77,
    80, 81, 82, 85, 86, 95, 96, 99,
  ];

  for (const code of codes) {
    const icon = getWeatherIcon(code, false); // Or false to test night variants too
    uniqueIcons.add(icon); // Set ensures uniqueness
  }

  return Array.from(uniqueIcons.values());
};
