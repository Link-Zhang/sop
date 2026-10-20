"use client";

import { Trash } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { columns } from "@/app/bp/components/BPColumns";
import { BPTableSkeleton } from "@/app/bp/components/BPSkeletons";
import BPUpsert from "@/app/bp/components/BPUpsert";
import useBP from "@/app/bp/hooks/useBP";
import type { BP, BPRecord } from "@/app/bp/lib/types";
import JsonDialog from "@/app/components/JsonDialog";
import useConfirmDelete from "@/app/hooks/useConfirmDelete";
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
  const { createBP, updateBP, deleteBP } = useBP();
  const confirmDelete = useConfirmDelete();
  const { data = [], isPending } = useReadQuery<BP[]>(API_BP);

  const [createOpen, setCreateOpen] = useState(false);
  const [copyOpen, setCopyOpen] = useState(false);
  const [copyData, setCopyData] = useState<BPRecord>();
  const [updateOpen, setUpdateOpen] = useState(false);
  const [updateData, setUpdateData] = useState<BPRecord>();
  const [jsonOpen, setJsonOpen] = useState(false);
  const [jsonData, setJsonData] = useState<unknown>();

  const table = useAppTable({
    columns,
    data,
    initialState: {
      columnPinning: { start: ["select"], end: [] },
      pagination: { pageIndex: 0, pageSize: PAGE_SIZE_DEFAULT },
    },
    meta: {
      onCreate: (rowDataWithoutId: unknown) => {
        setCopyData(rowDataWithoutId as BPRecord);
        setCopyOpen(true);
      },
      onRead: (data: unknown) => {
        setJsonData(data);
        setJsonOpen(true);
      },
      onUpdate: (rowData: unknown) => {
        setUpdateData(rowData as BPRecord);
        setUpdateOpen(true);
      },
      onDelete: (id) =>
        void confirmDelete({ icon: <Trash /> }).then(
          (ok) => ok && deleteBP(id),
        ),
    },
  });
  const { t } = useTranslation("bp");

  if (isPending) return <BPTableSkeleton columns={columns.length} />;

  return (
    <table.AppTable>
      <div className="flex flex-col gap-3 md:flex-row md:justify-between">
        <div className="flex gap-3">
          <table.TableSearch />
        </div>
        <div className="flex gap-3">
          <BPUpsert
            onOpenChange={setCreateOpen}
            open={createOpen}
            onSave={(v) => createBP(v.sbp, v.dbp, v.hr)}
          />
          <table.TableBatchDelete />
        </div>
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
      {/*<pre>{JSON.stringify(table.state, null, 2)}</pre>*/}
      <JsonDialog data={jsonData} onOpenChange={setJsonOpen} open={jsonOpen} />
      <BPUpsert
        data={copyData}
        open={copyOpen}
        onOpenChange={setCopyOpen}
        onSave={(v) => createBP(v.sbp, v.dbp, v.hr)}
        trigger={null}
      />
      <BPUpsert
        data={updateData}
        open={updateOpen}
        onOpenChange={setUpdateOpen}
        onSave={(v) => {
          if (updateData?.id) updateBP(updateData.id, v);
        }}
        trigger={null}
      />
    </table.AppTable>
  );
}
