"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import RowCreate from "@/app/blood-pressure/components/RowCreate";
import DataTableFilter from "@/app/data-table/DataTableFilter";
import DataTableHider from "@/app/data-table/DataTableHider";
import DataTablePagination from "@/app/data-table/DataTablePagination";
import { useTableStore } from "@/app/data-table/hooks/useTableStore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function DataTable<TData, TValue>({
  columns,
  data,
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

  const pageCount = table.getPageCount();

  const rows = table.getRowModel().rows;

  const rowCount = table.getFilteredRowModel().rows.length;

  const hideableColumnIds = table
    .getAllColumns()
    .filter((col) => col.getCanHide())
    .map((col) => col.id);

  const filterableColumnIds = table
    .getAllColumns()
    .filter((col) => col.getCanFilter())
    .map((col) => col.id);

  const coreRows = table.getCoreRowModel().rows;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-2">
        <DataTableFilter
          ids={filterableColumnIds}
          onReset={table.resetColumnFilters}
          rows={coreRows}
        />
        <div className="flex md:flex items-center gap-2">
          <DataTableHider ids={hideableColumnIds} />
          <RowCreate />
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
      <DataTablePagination pageCount={pageCount} rowCount={rowCount} />
    </div>
  );
}
