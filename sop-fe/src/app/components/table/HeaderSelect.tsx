"use client";

import { useTableContext } from "@/app/hooks/useTable";
import { Checkbox } from "@/shadcn/components/ui/checkbox";

export default function HeaderSelect() {
  const table = useTableContext();

  return (
    <Checkbox
      checked={table.getIsAllPageRowsSelected()}
      onCheckedChange={(checked) => table.toggleAllPageRowsSelected(checked)}
    />
  );
}
