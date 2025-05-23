import { create } from "zustand";
import type { WeatherProviderKey } from "../weather-service/providers";
import { persist } from "zustand/middleware";

interface WeatherState {
  locations: WeatherLocation[];
  selectedLocation?: WeatherLocation;
  selectedDate?: string;
  provider: WeatherProviderKey;
  language: string;
  setSelectedLocation: (location: WeatherLocation) => void;
  addLocation: (location: WeatherLocation) => void;
  setSelectedDate: (date?: string) => void;
  setProvider: (provider: WeatherProviderKey) => void;
  setLanguage: (language: string) => void;
}

export const useWeatherStore = create<WeatherState>()(
  persist(
    (set) => ({
      selectedLocation: {} as WeatherLocation,
      locations: [],
      selectedDate: undefined,
      provider: "open-meteo",
      language: "en",
      addLocation: (location) =>
        set((state) => {
          // Check if location already exists
          if (state.locations.find((l) => l.id === location.id)) {
            return { locations: state.locations };
          }

          // Add to the beginning and keep only the 4 newest
          const updated = [location, ...state.locations].slice(0, 4);
          return { locations: updated };
        }),
      setSelectedLocation: (selectedLocation) => set({ selectedLocation }),
      setSelectedDate: (selectedDate) => set({ selectedDate }),
      setProvider: (provider) => set({ provider }),
      setLanguage: (language) => set({ language }),
    }),
    {
      name: "weather-storage", // key in localStorage
    }
  )
);
