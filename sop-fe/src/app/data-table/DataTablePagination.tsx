"use client";

import { useTableStore } from "@/app/data-table/hooks/useTableStore";
import type { DataTablePaginationProps } from "@/app/data-table/lib/types";
import DataTablePaginationUI from "@/app/data-table/ui/DataTablePaginationUI";

export default function DataTablePagination({
  pageCount,
  rowCount,
}: DataTablePaginationProps) {
  const pageIndex = useTableStore((s) => s.pagination.pageIndex);
  const pageSize = useTableStore((s) => s.pagination.pageSize);
  const setPagination = useTableStore((s) => s.setPagination);

  const handlePageIndexChange = (newPageIndex: number) => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: newPageIndex,
    }));
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPagination({ pageIndex: 0, pageSize: newPageSize });
  };

  return (
    <DataTablePaginationUI
      onPageIndexChange={handlePageIndexChange}
      onPageSizeChange={handlePageSizeChange}
      pageCount={pageCount}
      pageIndex={pageIndex}
      pageSize={pageSize}
      rowCount={rowCount}
    />
  );
}
