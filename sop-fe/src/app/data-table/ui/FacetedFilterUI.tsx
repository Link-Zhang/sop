"use client";

import { Check, FunnelPlus } from "lucide-react";
import type { FacetedFilterUIProps } from "@/app/data-table/lib/types";
import { hideLastSvgClass } from "@/app/data-table/lib/utils";
import SelectedBadgeUI from "@/app/data-table/ui/SelectedBadgeUI";
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

export default function FacetedFilterUI({
  onClear,
  onFilter,
  onToggle,
  options,
  ranges,
  texts,
}: FacetedFilterUIProps) {
  const isSelected = (range: [number, number]) =>
    ranges.some(([a, b]) => a === range[0] && b === range[1]);

  const selectedBadgeOptions = options
    .filter((opt) => isSelected(opt.range))
    .map(({ count, label, range, ...rest }) => rest);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="border-dashed gap-1" variant="outline">
          <FunnelPlus />
          <span className="text-xs">{texts.title}</span>
          <SelectedBadgeUI
            options={selectedBadgeOptions}
            summary={texts.summary}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="min-w-fit p-0 w-fit">
        <Command filter={onFilter}>
          <CommandInput />
          <CommandList>
            <CommandEmpty>{texts.empty}</CommandEmpty>
            <CommandGroup>
              {options.map(
                ({ color, count = 0, key, label, range, icon: Icon }) => {
                  const selected = isSelected(range);
                  return (
                    <CommandItem
                      className={`flex items-center ${hideLastSvgClass}`}
                      key={key}
                      onSelect={() => onToggle(range)}
                      value={key}
                    >
                      <div className="border size-4">
                        {selected && <Check />}
                      </div>
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
                  );
                },
              )}
            </CommandGroup>
            {selectedBadgeOptions.length > 0 && (
              <>
                <CommandSeparator />
                <CommandItem className={hideLastSvgClass} onSelect={onClear}>
                  <span className="flex-1 text-center">{texts.clear}</span>
                </CommandItem>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
