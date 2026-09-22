"use client";

import { useTranslation } from "react-i18next";
import { SKELETON_NUMBER } from "@/app/lib/configs";
import { Skeleton } from "@/shadcn/components/ui/skeleton";

export function BPTitleSkeleton() {
  const { t } = useTranslation("bp");

  return (
    <Skeleton className="mx-auto text-4xl text-transparent w-fit">
      {t("title")}
    </Skeleton>
  );
}

function BPTableToolbarSkeleton() {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:justify-between">
      <Skeleton className="h-9 md:w-64 w-full" />
      <div className="flex gap-3">
        <Skeleton className="h-9 w-18" />
        <Skeleton className="h-9 w-24" />
      </div>
    </div>
  );
}

function BPTablePaginationSkeleton() {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center">
      <Skeleton className="h-8 w-12" />
      <Skeleton className="h-8 w-28" />
      <div className="flex justify-end">
        <Skeleton className="h-8 w-10" />
      </div>
    </div>
  );
}

export function BPTableBodySkeleton({
  columns,
  rows = SKELETON_NUMBER,
}: {
  columns: number;
  rows?: number;
}) {
  const colKeys = Array.from({ length: columns }, (_, i) => `col-${i}`);
  const rowKeys = Array.from({ length: rows }, (_, i) => `row-${i}`);

  return (
    <div className="border overflow-hidden rounded-md">
      <div className="overflow-x-auto relative w-full">
        <table className="caption-bottom table-fixed text-sm w-full">
          <thead>
            <tr className="border-b">
              {colKeys.map((key, i) => (
                <th
                  key={key}
                  className={`h-10 text-center ${i === 0 ? "w-10" : "w-40"}`}
                >
                  <Skeleton
                    className={`mx-auto ${i === 0 ? "size-5" : "h-6 w-30"}`}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rowKeys.map((rowKey) => (
              <tr key={rowKey} className="border-b last:border-0">
                {colKeys.map((colKey, c) => (
                  <td key={colKey} className="p-2 text-center">
                    <Skeleton
                      className={`mx-auto ${c === 0 ? "size-5" : "h-6 w-30"}`}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function BPTableSkeleton({
  columns,
  rows = SKELETON_NUMBER,
}: {
  columns: number;
  rows?: number;
}) {
  return (
    <div className="flex flex-col gap-3">
      <BPTableToolbarSkeleton />
      <BPTableBodySkeleton columns={columns} rows={rows} />
      <BPTablePaginationSkeleton />
    </div>
  );
}
