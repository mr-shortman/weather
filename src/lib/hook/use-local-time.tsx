import { useEffect, useState } from "react";

export function useLocalTime(timezone: string | undefined) {
  const [time, setTime] = useState("");

  useEffect(() => {
    if (!timezone) return;

    const update = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat(undefined, {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(now);
      setTime(formatted);
    };

    update(); // initial
    const interval = setInterval(update, 1000); // update every second

    return () => clearInterval(interval);
  }, [timezone]);

  return time;
}
