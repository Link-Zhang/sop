"use client";

import { Subscribe } from "@tanstack/react-table";
import { useCellContext } from "@/app/hooks/useTable";
import { Checkbox } from "@/shadcn/components/ui/checkbox";

export default function CellSelect() {
  const { row } = useCellContext();

  return (
    <Subscribe source={row.table.atoms.rowSelection}>
      {() => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(checked: boolean) => row.toggleSelected(checked)}
        />
      )}
    </Subscribe>
  );
}
