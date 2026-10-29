"use client";

import type { BP } from "@/app/bp/lib/types";
import { createAppColumnHelper } from "@/app/hooks/useTable";
import { Checkbox } from "@/shadcn/components/ui/checkbox";

const columnHelper = createAppColumnHelper<BP>();

//  todo: fix it
export const columns = columnHelper.columns([
  columnHelper.display({
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(checked: boolean) => row.toggleSelected(checked)}
      />
    ),
    enableHiding: false,
    enableResizing: false,
    enableSorting: false,
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(checked: boolean) =>
          table.toggleAllPageRowsSelected(checked)
        }
      />
    ),
    id: "select",
    // size: 32,
  }),
  columnHelper.accessor("date", {
    cell: (info) => info.renderValue(),
    header: ({ header }) => <header.ColumnHeader />,
    // size: 64,
  }),
  columnHelper.accessor("sbp", {
    cell: (info) => info.renderValue(),
    header: ({ header }) => <header.ColumnHeader />,
    // size: 64,
  }),
  columnHelper.accessor("dbp", {
    cell: (info) => info.renderValue(),
    header: ({ header }) => <header.ColumnHeader />,
    // size: 64,
  }),
  columnHelper.accessor("hr", {
    cell: (info) => info.renderValue(),
    header: ({ header }) => <header.ColumnHeader />,
    // size: 48,
  }),
  columnHelper.display({
    cell: () => <Checkbox />,
    enableHiding: false,
    enableResizing: false,
    enableSorting: false,
    header: "Actions",
    id: "actions",
  }),
]);
