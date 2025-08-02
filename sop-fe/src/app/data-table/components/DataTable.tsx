"use client";

import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import RowCreate from "@/app/blood-pressure/components/RowCreate";
import DataTableColumnHider from "@/app/data-table/components/DataTableColumnHider";
import DataTablePagination from "@/app/data-table/components/DataTablePagination";
import DataTableRangeFilter from "@/app/data-table/components/DataTableRangeFilter";
import { useTableStore } from "@/app/data-table/hooks/useTableStore";
import type { DataTableProps } from "@/app/data-table/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/components/ui/table";

export default function DataTable<TData, TValue>({
  columns,
  data,
  rangeFilterMap,
  t,
}: DataTableProps<TData, TValue>) {
  const {
    columnFilters,
    columnVisibility,
    pagination,
    sorting,
    setColumnFilters,
    setColumnVisibility,
    setPagination,
    setSorting,
  } = useTableStore();
  const table = useReactTable({
    autoResetPageIndex: false,
    columns: columns,
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    state: { columnFilters, columnVisibility, pagination, sorting },
  });

  const hideableColumnIds = table
    .getAllColumns()
    .filter((column) => column.getCanHide())
    .map((column) => column.id);
  const filterableColumnIds = table
    .getAllColumns()
    .filter((column) => column.getCanFilter())
    .map((column) => column.id);
  const filteredRowCount = table.getFilteredRowModel().rows.length;
  const pageCount = table.getPageCount();
  const rows = table.getRowModel().rows;
  const rangeFilterIds = filterableColumnIds.filter((id) =>
    Object.hasOwn(rangeFilterMap, id),
  );

  const coreRows = table.getCoreRowModel().rows;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-2">
        <DataTableRangeFilter
          ids={rangeFilterIds}
          rows={coreRows}
          map={rangeFilterMap}
          t={t}
        />
        <div className="flex md:flex items-center gap-2">
          <DataTableColumnHider ids={hideableColumnIds} t={t} />
          <RowCreate t={t} />
        </div>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {!header.isPlaceholder &&
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                data-state={row.getIsSelected() && "selected"}
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination pageCount={pageCount} rowCount={filteredRowCount} />
    </div>
  );
}
