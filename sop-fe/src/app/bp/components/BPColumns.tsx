"use client";

import type { BP } from "@/app/bp/lib/types";
import { createAppColumnHelper } from "@/app/hooks/useTable";

const columnHelper = createAppColumnHelper<BP>();

//  todo: fix it
export const columns = columnHelper.columns([
  columnHelper.display({
    cell: ({ cell }) => <cell.CellSelect />,
    enableHiding: false,
    enableResizing: false,
    enableSorting: false,
    header: ({ header }) => <header.HeaderSelect />,
    id: "select",
    size: 36,
  }),
  columnHelper.accessor("date", {
    cell: ({ cell }) => <cell.CellDate />,
    header: ({ header }) => <header.HeaderContent />,
    size: 200,
  }),
  columnHelper.accessor("sbp", {
    cell: (info) => info.renderValue(),
    header: ({ header }) => <header.HeaderContent />,
    minSize: 116,
  }),
  columnHelper.accessor("dbp", {
    cell: (info) => info.renderValue(),
    header: ({ header }) => <header.HeaderContent />,
    minSize: 116,
  }),
  columnHelper.accessor("hr", {
    cell: (info) => info.renderValue(),
    header: ({ header }) => <header.HeaderContent />,
    minSize: 104,
  }),
  columnHelper.display({
    cell: ({ cell }) => <cell.CellActions />,
    enableHiding: false,
    enableResizing: false,
    enableSorting: false,
    header: ({ header }) => <header.HeaderSettings />,
    id: "actions",
    size: 36,
  }),
]);
