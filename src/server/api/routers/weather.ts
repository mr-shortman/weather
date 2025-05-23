import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const weatherRouter = createTRPCRouter({
  searchLocations: publicProcedure
    .input(
      z.object({
        location: z.string(),
      })
    )
    .query(async ({ input }) => {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${input.location}&language=de`
      );
      const geoData = await geoRes.json();
      if (!geoData.results?.length) return [];

      const seen = new Set<string>();

      const uniqueLocations = geoData.results
        .filter((result: any) => {
          const key = `${result.name}-${result.country}`;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        })
        .map((result: any) => ({
          id: result.id,
          name: result.name,
          country: result.country,
          countryCode: result.country_code,
          lat: result.latitude,
          lon: result.longitude,
        })) as Array<WeatherLocation>;

      return uniqueLocations;
    }),

  getTomorrowIoForecast: publicProcedure
    .input(
      z.object({
        lat: z.number(),
        lon: z.number(),
        lang: z.string(),
      })
    )
    .query(async ({ input }) => {
      const API_KEY = process.env.TOMORROWIO_KEY;
      const res = await fetch(
        `https://api.tomorrow.io/v4/weather/forecast?location=${input.lat},${input.lon}&timesteps=1h,1d&units=metric&apikey=${API_KEY}&language=${input.lang}`
      );
      const data = await res.json();
      console.log(data);
      if (!data.timelines) {
        return {
          code: data.code,
          type: data.type,
          message: data.message,
          error: true,
        };
      }
      const hourly = data.timelines.hourly.map((entry: any) => {
        return {
          time: entry.time,
          temperature: entry.values.temperature,
          weatherCode: entry.values.weatherCode,
          rainProbability: entry.values.precipitationProbability,
        };
      });

      const daily = data.timelines.daily.map((entry: any) => ({
        date: entry.time,
        minTemp: entry.values.temperatureMin,
        maxTemp: entry.values.temperatureMax,
        weatherCode: entry.values.weatherCode,
      }));

      return { hourly, daily };
    }),
});
