"use client";

import { Check, Settings2 } from "lucide-react";
import type { TableHiderUIProps } from "@/app/data-table/lib/types";
import { hideLastSvgClass } from "@/app/data-table/lib/utils";
import { Button } from "@/shadcn/components/ui/button";
import {
  Command,
  CommandItem,
  CommandList,
} from "@/shadcn/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shadcn/components/ui/popover";

export default function DataTableHiderUI({
  getTitle,
  ids,
  isVisible,
  onToggle,
  text,
}: TableHiderUIProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Settings2 />
          {text}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-0 w-fit">
        <Command>
          <CommandList>
            {ids.map((id) => (
              <CommandItem
                className={`flex items-center ${hideLastSvgClass}`}
                key={id}
                onSelect={() => onToggle(id)}
              >
                <div className="border size-4">
                  {isVisible(id) && <Check />}
                </div>
                {getTitle(id)}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
