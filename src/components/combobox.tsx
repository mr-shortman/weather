"use client";

import * as React from "react";
import { Check, ChevronsUpDown, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type ComboboxProps = {
  data: {
    label: string;
    value: string;
    Icon?: LucideIcon;
  }[];
  onSelect: (value?: string) => void;
  messageUi?: {
    select?: string;
    selectIcon?: LucideIcon;
    empty?: string;
    placeholder?: string;
  };
  initialValue?: string;
  className?: string;
  hideSearch?: boolean;
  buttonProps?: ButtonProps;
};

export function Combobox({
  data,
  initialValue,
  messageUi,
  className,
  hideSearch,
  buttonProps,
  onSelect,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(initialValue ?? "");
  const selectedItem = data.find((item) => item.value === initialValue)!;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-[200px] justify-between shadow-none hover:bg-background",
            className
          )}
          {...buttonProps}
        >
          <div
            className={cn(
              "flex items-center gap-2 text-muted-foreground",
              selectedItem && "text-foreground"
            )}
          >
            {selectedItem?.Icon ? (
              <selectedItem.Icon className="size-4" />
            ) : messageUi?.selectIcon ? (
              <messageUi.selectIcon className="size-4" />
            ) : null}

            <span>
              {selectedItem?.label
                ? selectedItem.label
                : messageUi?.select ?? "Select..."}
            </span>
          </div>

          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="popover-content-width-same-as-its-trigger w-full p-0">
        <Command
          filter={(value, search) => {
            if (!search.trim()) return 1; // Show all when no search input

            const entry = data.find((item) => item.value === value); // Assuming dataset is an array of objects with id and name
            if (!entry) return 0; // If no matching entry is found, exclude it

            return entry.label.toLowerCase().includes(search.toLowerCase())
              ? 1
              : 0;
          }}
        >
          {!hideSearch && (
            <CommandInput
              placeholder={messageUi?.placeholder ?? "Search..."}
              className="h-9"
            />
          )}
          <CommandList>
            <CommandEmpty>{messageUi?.empty ?? "Nothing found."}</CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    const newValue = currentValue === value ? "" : currentValue;
                    setValue(newValue);
                    onSelect(newValue);
                    setOpen(false);
                  }}
                >
                  <div className="flex items-center gap-2">
                    {item?.Icon && <item.Icon className="ml-auto opacity-50" />}
                    <span>{item.label}</span>
                  </div>
                  <Check
                    className={cn(
                      "ml-auto",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
