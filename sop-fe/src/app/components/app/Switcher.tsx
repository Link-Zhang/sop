"use client";

import { useState } from "react";
import type { SwitcherProps } from "@/app/lib/types";
import { Button } from "@/shadcn/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/shadcn/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shadcn/components/ui/tooltip";

export default function Switcher({
  items,
  onValueChange,
  tip,
  triggerIcon,
  value,
}: SwitcherProps) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu onOpenChange={setOpen} open={open}>
      <Tooltip>
        <DropdownMenuTrigger
          render={
            <TooltipTrigger render={<Button size="icon" variant="outline" />} />
          }
        >
          {triggerIcon}
        </DropdownMenuTrigger>
        <TooltipContent side="bottom">
          <p>{tip}</p>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent className="w-fit">
        <DropdownMenuRadioGroup
          onValueChange={(next) => {
            onValueChange(next);
            setOpen(false);
          }}
          value={value}
        >
          {items.map((item) => (
            <DropdownMenuRadioItem key={item.value} value={item.value}>
              {item.icon}
              {item.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
