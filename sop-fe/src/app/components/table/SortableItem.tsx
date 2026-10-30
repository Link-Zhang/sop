"use client";

import { useSortable } from "@dnd-kit/react/sortable";
import { Grip } from "lucide-react";
import { useRef, useState } from "react";
import type { ColumnSortableItemProps } from "@/app/lib/types";
import { Button } from "@/shadcn/components/ui/button";
import { DropdownMenuCheckboxItem } from "@/shadcn/components/ui/dropdown-menu";
import { Separator } from "@/shadcn/components/ui/separator";

export default function SortableItem({
  checked,
  id,
  index,
  label,
  onCheckedChange,
}: ColumnSortableItemProps) {
  const handleRef = useRef<HTMLButtonElement | null>(null);
  const [element, setElement] = useState<Element | null>(null);
  const { isDragging } = useSortable({ element, handle: handleRef, id, index });

  return (
    <DropdownMenuCheckboxItem
      checked={checked}
      closeOnClick={true}
      data-shadow={isDragging || undefined}
      onCheckedChange={onCheckedChange}
      ref={setElement}
    >
      <Button
        className="cursor-move h-4 w-4"
        ref={handleRef}
        tabIndex={-1}
        variant="ghost"
      >
        <Grip />
      </Button>
      <Separator orientation="vertical" />
      {label}
    </DropdownMenuCheckboxItem>
  );
}
