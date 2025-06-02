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
import { weatherIcons } from "@/components/icons";

const withCn = <P extends object>(
  Component: React.ComponentType<P>,
  defaultClassName?: string
) => {
  return (props: P & { className?: string }) => {
    return (
      <Component {...props} className={cn(defaultClassName, props.className)} />
    );
  };
};
export function getWeatherIcon(
  code: number,
  isDaytime: boolean
): ComponentType<any> {
  const day = isDaytime;

  switch (code) {
    case 0:
      return day
        ? withCn(weatherIcons.clearDay, "text-yellow-400")
        : WiNightClear;
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
      return day ? WiSprinkle : WiNightAltSprinkle;
    case 56:
    case 57:
      return WiRainMix;

    case 61:
    case 63:
    case 65:
      return day ? WiRain : WiNightAltRain;
    case 66:
    case 67:
      return WiRainWind;

    case 71:
    case 73:
    case 75:
      return day ? WiSnow : WiNightAltSnow;
    case 77:
      return WiSnowflakeCold;

    case 80:
    case 81:
    case 82:
      return WiShowers;

    case 85:
    case 86:
      return WiSnowWind;

    case 95:
    case 96:
    case 99:
      return WiThunderstorm;

    default:
      return WiSnow;
    // return WiNa;
  }
}
