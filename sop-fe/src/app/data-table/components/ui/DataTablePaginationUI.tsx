"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import ClampedNumberInput from "@/app/data-table/components/ClampedNumberInput";
import type { DataTablePaginationUIProps } from "@/app/data-table/lib/types";
import { Button } from "@/shadcn/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/components/ui/select";

export default function DataTablePaginationUI({
  currentPage,
  pageCount,
  pageSize,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
  rowRangeText,
}: DataTablePaginationUIProps) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-shrink-0 text-muted-foreground text-xs">
        {rowRangeText}
      </div>
      <div className="flex flex-grow gap-x-2 items-center justify-center">
        <Button
          className="hidden lg:flex size-8"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(1)}
          size="icon"
          variant="ghost"
        >
          <ChevronsLeft />
        </Button>
        <Button
          className="size-8"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          size="icon"
          variant="ghost"
        >
          <ChevronLeft />
        </Button>
        <ClampedNumberInput
          max={pageCount}
          min={1}
          onChange={onPageChange}
          value={currentPage}
        />
        <div className="text-sm">/{pageCount}</div>
        <Button
          className="size-8"
          disabled={currentPage >= pageCount}
          onClick={() => onPageChange(currentPage + 1)}
          size="icon"
          variant="ghost"
        >
          <ChevronRight />
        </Button>
        <Button
          className="hidden size-8 lg:flex"
          disabled={currentPage >= pageCount}
          onClick={() => onPageChange(pageCount)}
          size="icon"
          variant="ghost"
        >
          <ChevronsRight />
        </Button>
      </div>
      <div className="flex-shrink-0">
        <Select
          onValueChange={(value: string) => onPageSizeChange(Number(value))}
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
