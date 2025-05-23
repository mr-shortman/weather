"use client";
import { useDebouncedValue } from "@/lib/hook/debounce-value";
import { useWeatherStore } from "@/lib/store/weather-store";
import { api } from "@/trpc/react";
import React from "react";

import getUnicodeFlagIcon from "country-flag-icons/unicode";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "../../components/ui/button";
import { useLocalTime } from "@/lib/hook/use-local-time";
import {
  Clock,
  Clock12Icon,
  Clock4,
  Globe,
  Globe2,
  MapPin,
  Repeat,
  Settings,
} from "lucide-react";
import { Icons } from "../../components/icons";
import Link from "next/link";

function Location({ timezone }: { timezone: string | undefined }) {
  const prevLocations = useWeatherStore((state) => state.locations);
  const selectedLocation = useWeatherStore((state) => state.selectedLocation);
  const addLocation = useWeatherStore((state) => state.addLocation);
  const setSelectedLocation = useWeatherStore(
    (state) => state.setSelectedLocation
  );
  const [value, setValue] = React.useState("");

  const debouncedValue = useDebouncedValue(value, 500);
  const { data: locations } = api.weather.searchLocations.useQuery(
    {
      location: debouncedValue,
    },
    {
      enabled: !!debouncedValue,
    }
  );
  const [open, setOpen] = React.useState(false);
  const handleSelect = (loc: WeatherLocation) => {
    setSelectedLocation(loc);
    addLocation(loc);
    setOpen(false);
    setValue("");
  };
  const localTime = useLocalTime(timezone);

  return (
    <div className="w-full flex justify-between items-center  gap-2 ">
      <div className="flex flex-col">
        {selectedLocation?.id ? (
          <>
            <div className="flex items-center gap-1">
              <span className="text-2xl font-semibold">
                {selectedLocation?.name}
              </span>
            </div>

            <div className="text-sm flex items-center gap-1">
              <span>
                {selectedLocation?.countryCode
                  ? getUnicodeFlagIcon(selectedLocation.countryCode)
                  : null}
              </span>
              <span className="ml-1">{selectedLocation?.country}</span>
            </div>
            {/* <p className="flex items-center">
              <Icons.clock />
              <span className="ml-1">{localTime}</span>
            </p> */}
          </>
        ) : (
          <div>
            <p className="text-muted-foreground">No location</p>
          </div>
        )}
      </div>
      <div className=" flex items-center justify-end">
        <Button
          asChild
          variant={"ghost"}
          className="ml-auto text-muted-foreground"
        >
          <Link href={"/settings"}>
            <Settings className="size-4" />
          </Link>
        </Button>
        <Button onClick={() => setOpen(true)}>
          <MapPin className="size-4 ml-auto" />
          <span>Location</span>
        </Button>
      </div>

      <CommandDialog shouldFilter={false} open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search a location..."
          onValueChange={setValue}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {locations?.length ? (
            <CommandGroup heading="Locations">
              {locations.map((loc) => (
                <CommandItem key={loc.id} onSelect={() => handleSelect(loc)}>
                  {getUnicodeFlagIcon(loc.countryCode)}
                  <span>{loc.name}</span>
                  <span>{loc.countryCode}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          ) : null}
          <CommandGroup heading="Previous Locations">
            {prevLocations?.length
              ? prevLocations.map((loc) => (
                  <CommandItem key={loc.id} onSelect={() => handleSelect(loc)}>
                    {getUnicodeFlagIcon(loc.countryCode)}
                    <span>{loc.name}</span>
                    <span>{loc.countryCode}</span>
                  </CommandItem>
                ))
              : null}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}

export default Location;
