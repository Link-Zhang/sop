"use client";

import { Subscribe } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useState } from "react";
import { useTableContext } from "@/app/hooks/useTable";
import { PAGE_SIZES } from "@/app/lib/configs";
import { Button } from "@/shadcn/components/ui/button";
import { Input } from "@/shadcn/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/components/ui/select";

export default function TablePagination() {
  const [pageInput, setPageInput] = useState<string | null>(null);
  const table = useTableContext();

  return (
    <Subscribe source={table.atoms.pagination}>
      {(pagination) => {
        const { pageIndex, pageSize } = pagination;
        const pageCount = table.getPageCount();
        if (pageCount === 0) return null;
        const goToPage = (page: number) =>
          table.setPageIndex(
            Math.min(Math.max(0, page), Math.max(0, pageCount - 1)),
          );
        const total = table.getFilteredRowModel().rows.length;
        const from = total === 0 ? 0 : pageIndex * pageSize + 1;
        const to = Math.min((pageIndex + 1) * pageSize, total);

        return (
          <div className="grid grid-cols-[1fr_auto_1fr] items-center">
            <Select
              onValueChange={(v) => {
                table.setPageSize(Number(v));
                table.setPageIndex(0);
              }}
              value={pageSize}
            >
              <SelectTrigger className="min-w-fit tabular-nums text-muted-foreground text-xs w-fit">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="min-w-fit text-muted-foreground text-xs w-fit">
                {PAGE_SIZES.map((n) => (
                  <SelectItem key={n} value={n}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center justify-center tabular-nums">
              <Button
                className="max-lg:hidden size-8"
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.firstPage()}
                size="icon"
                variant="ghost"
              >
                <ChevronsLeft />
              </Button>
              <Button
                className="size-8"
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
                size="icon"
                variant="ghost"
              >
                <ChevronLeft />
              </Button>
              <Input
                autoComplete="off"
                className="tabular-nums text-base text-center w-12"
                inputMode="numeric"
                onBlur={() => {
                  const n = Number(pageInput);
                  if (pageInput && n > 0) goToPage(n - 1);
                  setPageInput(null);
                }}
                onChange={(e) =>
                  setPageInput(e.target.value.replace(/\D/g, ""))
                }
                onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
                pattern="[0-9]*"
                type="text"
                value={pageInput ?? String(pageIndex + 1)}
              />
              <span className="inline-block min-w-[3.5ch] tabular-nums text-center text-muted-foreground text-xs">
                /{pageCount}
              </span>
              <Button
                className="size-8"
                disabled={!table.getCanNextPage()}
                onClick={() => table.nextPage()}
                size="icon"
                variant="ghost"
              >
                <ChevronRight />
              </Button>
              <Button
                className="max-lg:hidden size-8"
                disabled={!table.getCanNextPage()}
                onClick={() => table.lastPage()}
                size="icon"
                variant="ghost"
              >
                <ChevronsRight />
              </Button>
            </div>
            <span className="flex items-center justify-end min-w-0 tabular-nums text-muted-foreground text-xs whitespace-nowrap">
              {from}-{to}/{total}
            </span>
          </div>
        );
      }}
    </Subscribe>
  );
}
