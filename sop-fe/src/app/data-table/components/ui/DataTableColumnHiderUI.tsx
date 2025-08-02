"use client";

import { Check, Settings2 } from "lucide-react";
import type { DataTableColumnHiderUIProps } from "@/app/data-table/lib/types";
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

export default function DataTableColumnHiderUI({
  columns,
  label,
  onToggle,
}: DataTableColumnHiderUIProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Settings2 />
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-0 w-fit">
        <Command>
          <CommandList>
            {columns.map(({ id, header, visible }) => (
              <CommandItem
                className={`flex items-center ${hideLastSvgClass}`}
                key={id}
                onSelect={() => onToggle(id)}
              >
                <div className="border size-4">{visible && <Check />}</div>
                {header}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
