"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import ClampedNumberInput from "@/app/data-table/ClampedNumberInput";
import type { DataTablePaginationUIProps } from "@/app/data-table/lib/types";
import { pageSizeOptions } from "@/app/data-table/lib/utils";
import { Button } from "@/shadcn/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/components/ui/select";

export default function DataTablePaginationUI({
  onPageIndexChange,
  onPageSizeChange,
  pageCount,
  pageIndex,
  pageSize,
  rowCount,
}: DataTablePaginationUIProps) {
  const start = rowCount ? pageIndex * pageSize + 1 : 0;
  const end = rowCount ? Math.min((pageIndex + 1) * pageSize, rowCount) : 0;

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-shrink-0 text-muted-foreground text-xs">
        {start === end ? `${end}/${rowCount}` : `${start}-${end}/${rowCount}`}
      </div>
      <div className="flex flex-grow gap-x-2 items-center justify-center">
        <Button
          className="hidden lg:flex size-8"
          disabled={pageIndex <= 0}
          onClick={() => onPageIndexChange(0)}
          size="icon"
          variant="ghost"
        >
          <ChevronsLeft />
        </Button>
        <Button
          className="size-8"
          disabled={pageIndex <= 0}
          onClick={() => onPageIndexChange(pageIndex - 1)}
          size="icon"
          variant="ghost"
        >
          <ChevronLeft />
        </Button>
        <ClampedNumberInput
          max={pageCount}
          onChange={(page) => onPageIndexChange(page - 1)}
          value={pageIndex + 1}
        />
        <div className="text-sm">/{pageCount}</div>
        <Button
          className="size-8"
          disabled={pageIndex >= pageCount - 1}
          onClick={() => onPageIndexChange(pageIndex + 1)}
          size="icon"
          variant="ghost"
        >
          <ChevronRight />
        </Button>
        <Button
          className="hidden size-8 lg:flex"
          disabled={pageIndex >= pageCount - 1}
          onClick={() => onPageIndexChange(pageCount - 1)}
          size="icon"
          variant="ghost"
        >
          <ChevronsRight />
        </Button>
      </div>
      <div className="flex-shrink-0">
        <Select
          onValueChange={(value) => onPageSizeChange(Number(value))}
          value={String(pageSize)}
        >
          <SelectTrigger className="text-xs">
            <SelectValue placeholder={pageSize} />
          </SelectTrigger>
          <SelectContent
            className="min-w-fit text-xs whitespace-nowrap"
            position="popper"
          >
            {pageSizeOptions.map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
