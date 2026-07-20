"use client";

import { Check, FunnelPlus } from "lucide-react";
import SelectedBadgeUI from "@/app/data-table/components/ui/SelectedBadgeUI";
import type { FacetedRangeFilterUIProps } from "@/app/data-table/lib/types";
import { hideLastSvgClass } from "@/app/data-table/lib/utils";
import { Button } from "@/shadcn/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/shadcn/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shadcn/components/ui/popover";

export default function FacetedRangeFilterUI({
  commandFilter,
  labels,
  onClear,
  onToggle,
  options,
  selectedBadgeOptions,
}: FacetedRangeFilterUIProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="border-dashed gap-1" variant="outline">
          <FunnelPlus />
          <span className="text-xs">{labels.header}</span>
          <SelectedBadgeUI
            options={selectedBadgeOptions}
            summary={labels.summary}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="min-w-fit p-0 w-fit">
        <Command filter={commandFilter}>
          <CommandInput />
          <CommandList>
            <CommandEmpty>{labels.empty}</CommandEmpty>
            <CommandGroup>
              {options.map(
                ({
                  color,
                  count = 0,
                  icon: Icon,
                  key,
                  label,
                  range,
                  selected,
                }) => (
                  <CommandItem
                    className={`flex items-center ${hideLastSvgClass}`}
                    key={key}
                    onSelect={() => onToggle(range)}
                    value={key}
                  >
                    <div className="border size-4">{selected && <Check />}</div>
                    {Icon && (
                      <span className={`${color} [&_svg]:!text-current`}>
                        <Icon />
                      </span>
                    )}
                    <span className="grow">{label}</span>
                    <span className="tabular-nums text-muted-foreground">
                      {count}
                    </span>
                  </CommandItem>
                ),
              )}
            </CommandGroup>
            {selectedBadgeOptions.length > 0 && (
              <>
                <CommandSeparator />
                <CommandItem className={hideLastSvgClass} onSelect={onClear}>
                  <span className="flex-1 text-center">{labels.clear}</span>
                </CommandItem>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
