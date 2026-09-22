"use client";

import { type ReactNode, useState } from "react";
import { Button } from "@/shadcn/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/shadcn/components/ui/dropdown-menu";

type SwitcherItem = {
  icon: ReactNode;
  label: string;
  value: string;
};

type SwitcherProps = {
  items: SwitcherItem[];
  onValueChange: (value: string) => void;
  triggerIcon: ReactNode;
  value: string;
};

export default function Switcher({
  items,
  onValueChange,
  triggerIcon,
  value,
}: SwitcherProps) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu onOpenChange={setOpen} open={open}>
      <DropdownMenuTrigger render={<Button size="icon" variant="outline" />}>
        {triggerIcon}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        <DropdownMenuRadioGroup
          onValueChange={(next) => {
            onValueChange(next);
            setOpen(false);
          }}
          value={value}
        >
          {items.map(({ icon, label, value }) => (
            <DropdownMenuRadioItem key={value} value={value}>
              {icon}
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
