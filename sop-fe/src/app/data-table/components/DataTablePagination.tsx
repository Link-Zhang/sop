"use client";

import { useCallback, useMemo } from "react";
import DataTablePaginationUI from "@/app/data-table/components/ui/DataTablePaginationUI";
import { useTableStore } from "@/app/data-table/hooks/useTableStore";
import type { DataTablePaginationProps } from "@/app/data-table/lib/types";
import { pageSizeOptions } from "@/app/data-table/lib/utils";

export default function DataTablePagination({
  pageCount,
  rowCount,
}: DataTablePaginationProps) {
  const pageIndex = useTableStore((s) => s.pagination.pageIndex);
  const pageSize = useTableStore((s) => s.pagination.pageSize);
  const setPagination = useTableStore((s) => s.setPagination);

  const rowRangeText = useMemo(() => {
    if (!rowCount) return "0/0";
    const start = pageIndex * pageSize + 1;
    const end = Math.min((pageIndex + 1) * pageSize, rowCount);
    return start === end ? `${end}/${rowCount}` : `${start}-${end}/${rowCount}`;
  }, [pageIndex, pageSize, rowCount]);

  const handlePageChange = useCallback(
    (page: number) => {
      setPagination((prev) => ({
        ...prev,
        pageIndex: page - 1,
      }));
    },
    [setPagination],
  );

  const handlePageSizeChange = useCallback(
    (newPageSize: number) => {
      setPagination({ pageIndex: 0, pageSize: newPageSize });
    },
    [setPagination],
  );

  if (
    rowCount > pageCount * pageSize ||
    rowCount <= (pageCount - 1) * pageSize ||
    pageCount < 1
  )
    return;

  return (
    <DataTablePaginationUI
      currentPage={pageIndex + 1}
      pageCount={pageCount}
      pageSize={pageSize}
      pageSizeOptions={pageSizeOptions}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
      rowRangeText={rowRangeText}
    />
  );
}
