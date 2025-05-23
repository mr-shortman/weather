export const openMeteoProvider: WeatherProvider = {
  name: "Open-Meteo",
  link: "",
  logo: "",
  async query(lat, lon, lang) {
    const url = new URL("https://api.open-meteo.com/v1/forecast");
    url.searchParams.append("latitude", lat.toString());
    url.searchParams.append("longitude", lon.toString());
    url.searchParams.append(
      "hourly",
      "temperature_2m,weathercode,precipitation_probability,is_day"
    );
    url.searchParams.append(
      "daily",
      "temperature_2m_max,temperature_2m_min,weathercode,sunrise,sunset"
    );

    url.searchParams.append("timezone", "auto");
    url.searchParams.append("language", lang);
    url.searchParams.append("current", "temperature_2m,is_day,weather_code");

    const res = await fetch(url);
    const data = await res.json();

    return {
      timezone: data.timezone,
      hourly: data.hourly.time.map((time: string, i: number) => ({
        time,
        temperature: data.hourly.temperature_2m[i],
        weatherCode: data.hourly.weathercode[i],
        rainProbability: data.hourly.precipitation_probability[i],
        isDay: Boolean(data.hourly.is_day[i]),
      })),
      daily: data.daily.time.map((date: string, i: number) => ({
        date,
        minTemp: data.daily.temperature_2m_min[i],
        maxTemp: data.daily.temperature_2m_max[i],
        weatherCode: data.daily.weathercode[i],
        sunrise: data.daily.sunrise[i],
        sunset: data.daily.sunset[i],
      })),
      current: {
        temp: data?.current?.temperature_2m,
        isDay: Boolean(data?.current?.is_day),
        weatherCode: data?.current?.weather_code,
      },
    } as WeatherData;
  },
};
