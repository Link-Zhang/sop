"use client";

import { useTranslation } from "react-i18next";
import columns from "@/app/bp/components/BPColumns";
import { BPTableSkeleton } from "@/app/bp/components/BPSkeletons";
import { useAppTable } from "@/app/bp/hooks/useTable";
import type { BP } from "@/app/bp/lib/types";
import useReadQuery from "@/app/hooks/useReadQuery";
import { API_BP } from "@/app/lib/configs";
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
  const { t } = useTranslation("bp");
  const table = useAppTable(
    {
      columns,
      data,
    },
    (state) => state,
  );

  if (isPending) return <BPTableSkeleton columns={columns.length} />;

  return (
    <table.AppTable>
      <div className="border rounded-md">
        <Table className="table-fixed w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="border-b" key={headerGroup.id}>
                {headerGroup.headers
                  .filter((header) => header.column.getIsVisible())
                  .map((header) => (
                    <table.AppHeader header={header} key={header.id}>
                      {(h) => (
                        <TableHead
                          className="border-r relative"
                          colSpan={header.colSpan}
                          key={header.id}
                          style={{
                            width: h.getSize(),
                          }}
                        >
                          <h.FlexRender />
                          <h.ResizeHandle />
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
                <TableCell className="text-center" colSpan={columns.length}>
                  {t("empty")}
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow className="border-b" key={row.id}>
                  {row.getAllCells().map((cell) => (
                    <TableCell
                      className="border-r"
                      key={cell.id}
                      style={{
                        width: cell.column.getSize(),
                      }}
                    >
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <pre data-testid="table-state">
        {JSON.stringify(table.state, null, 2)}
      </pre>
    </table.AppTable>
  );
}
