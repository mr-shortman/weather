import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const weatherRouter = createTRPCRouter({
  searchLocation: publicProcedure
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
});
