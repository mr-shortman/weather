import { MoonStar, SunDim, Sunrise, Sunset } from "lucide-react";

import React from "react";
import { fromZonedTime } from "date-fns-tz";
import { weatherIcons } from "@/components/icons";
import { addHours } from "date-fns";
import { cn } from "@/lib/utils";
import { useFormatter } from "next-intl";
function getProgressBetweenDates(
  sunrise: Date,
  sunset: Date,
  now: Date = new Date()
): {
  phase: "day" | "night";
  progress: number;
  hoursLeft: number;
} {
  const sunriseTime = sunrise.getTime();
  const sunsetTime = sunset.getTime();
  const nowTime = now.getTime();

  const MS_PER_HOUR = 1000 * 60 * 60;

  if (nowTime >= sunriseTime && nowTime < sunsetTime) {
    // Daytime
    const progress = (nowTime - sunriseTime) / (sunsetTime - sunriseTime);
    const hoursLeft = (sunsetTime - nowTime) / MS_PER_HOUR;
    return { phase: "day", progress, hoursLeft };
  } else {
    // Nighttime
    const nextSunrise =
      sunriseTime < nowTime ? sunriseTime + 24 * 60 * 60 * 1000 : sunriseTime;
    const adjustedSunset =
      sunsetTime > nowTime ? sunsetTime - 24 * 60 * 60 * 1000 : sunsetTime;

    const totalNightDuration = nextSunrise - adjustedSunset;
    const currentNightProgress =
      (nowTime -
        adjustedSunset +
        (nowTime < adjustedSunset ? 24 * 60 * 60 * 1000 : 0)) /
      totalNightDuration;
    const hoursLeft =
      (nextSunrise -
        nowTime +
        (nowTime > nextSunrise ? 24 * 60 * 60 * 1000 : 0)) /
      MS_PER_HOUR;

    return { phase: "night", progress: currentNightProgress, hoursLeft };
  }
}

export default function SunSetRise({
  sunset,
  sunrise,
  timezone,
}: {
  sunset: Date;
  sunrise: Date;
  timezone: string;
}) {
  const now = fromZonedTime(new Date(), timezone);
  const { phase, progress, hoursLeft } = getProgressBetweenDates(
    sunrise,
    sunset,
    now
  );

  const flexDirection = phase === "day" ? "flex-row" : "flex-row-reverse";
  const format = useFormatter();
  return (
    <div>
      <div className={cn("flex items-center gap-2 w-full", flexDirection)}>
        <Sunrise className="size-6" />
        <div className="relative w-full h-2 bg-muted rounded-full ">
          <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="w-full h-2 origin-left absolute rounded-full bg-primary left-0"
              style={{
                transform: `scaleX(${progress * 100}%)`,
              }}
            />
          </div>

          <div
            className="absolute bg-background rounded-full p-1 flex items-center justify-center   left-1/2 -translate-x-1/2  top-1/2 -translate-y-1/2 transform"
            style={{
              left: `${progress * 100}%`,
            }}
          >
            {phase === "day" ? (
              <SunDim className="size-4 text-yellow-500" />
            ) : (
              <MoonStar className="size-4 text-yellow-500" />
            )}
          </div>
        </div>
        <Sunset className="size-6" />
      </div>
      <div
        className={cn(
          "w-full flex items-center justify-between text-xs",
          flexDirection
        )}
      >
        <span>
          {format.dateTime(sunrise, {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
        <span>
          {format.dateTime(sunset, {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}
