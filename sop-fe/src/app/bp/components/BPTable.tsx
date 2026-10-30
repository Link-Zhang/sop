"use client";

import { useTranslation } from "react-i18next";
import { columns } from "@/app/bp/components/BPColumns";
import { BPTableSkeleton } from "@/app/bp/components/BPSkeletons";
import type { BP } from "@/app/bp/lib/types";
import useReadQuery from "@/app/hooks/useReadQuery";
import { getPinStyles, useAppTable } from "@/app/hooks/useTable";
import { API_BP } from "@/app/lib/configs";
import { PAGE_SIZE_DEFAULT } from "@/app/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/components/ui/table";

export default function BPTable() {
  const { data = [], isPending } = useReadQuery<BP[]>(API_BP);
  const table = useAppTable({
    columns,
    data,
    initialState: {
      columnPinning: { start: ["select"], end: [] },
      pagination: { pageIndex: 0, pageSize: PAGE_SIZE_DEFAULT },
    },
  });
  const { t } = useTranslation("bp");

  if (isPending) return <BPTableSkeleton columns={columns.length} />;

  return (
    <table.AppTable>
      <div className="flex items-center">
        <table.TableSearch />
      </div>
      <div className="border overflow-hidden rounded-md">
        <Table className="mb-2 table-fixed w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="border-b" key={headerGroup.id}>
                {headerGroup.headers
                  .filter((header) => header.column.getIsVisible())
                  .map((header) => (
                    <table.AppHeader header={header} key={header.id}>
                      {(h) => (
                        <TableHead
                          className="px-0 py-0 relative text-center [&>[role=checkbox]]:mx-auto"
                          colSpan={h.colSpan}
                          style={getPinStyles(h.column)}
                        >
                          <h.FlexRender />
                          <h.HeaderResize />
                        </TableHead>
                      )}
                    </table.AppHeader>
                  ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length === 0 ? (
              <TableRow className="border-b">
                <TableCell
                  className="text-center"
                  colSpan={table.getVisibleLeafColumns().length}
                >
                  {t("empty")}
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="border-b"
                  data-state={row.getIsSelected() ? "selected" : undefined}
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => (
                    <table.AppCell cell={cell} key={cell.id}>
                      {(c) => (
                        <TableCell
                          className="px-0 py-0 text-center [&>[role=checkbox]]:mx-auto"
                          style={getPinStyles(c.column)}
                        >
                          <c.FlexRender />
                        </TableCell>
                      )}
                    </table.AppCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <table.TablePagination />
      <pre>{JSON.stringify(table.state, null, 2)}</pre>
    </table.AppTable>
  );
}
