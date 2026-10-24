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

export default function Pagination() {
  const table = useTableContext();
  const [pageInput, setPageInput] = useState("");

  return (
    <Subscribe source={table.atoms.pagination}>
      {() => {
        const { pageIndex, pageSize } = table.atoms.pagination.get();
        const pageCount = table.getPageCount();
        const goToPage = (page: number) =>
          table.setPageIndex(
            Math.min(Math.max(0, page), Math.max(0, pageCount - 1)),
          );
        const total = table.getFilteredRowModel().rows.length;
        const from = total === 0 ? 0 : pageIndex * pageSize + 1;
        const to = Math.min((pageIndex + 1) * pageSize, total);

        return (
          <div className="flex items-center justify-between">
            <Select
              onValueChange={(v) => {
                table.setPageSize(Number(v));
                table.setPageIndex(0);
              }}
              value={pageSize}
            >
              <SelectTrigger className="min-w-fit text-muted-foreground text-xs w-fit">
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

            <div className="flex items-center gap-2">
              <Button
                className="hidden lg:flex size-8"
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
                className="field-sizing-content min-w-8 text-base text-center w-auto"
                inputMode="numeric"
                onBlur={() => {
                  const n = Number(pageInput);
                  if (n) goToPage(n - 1);
                  setPageInput("");
                }}
                onChange={(e) =>
                  setPageInput(e.target.value.replace(/\D/g, ""))
                }
                onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
                pattern="[0-9]*"
                type="text"
                value={pageInput || String(pageIndex + 1)}
              />

              <span className="text-muted-foreground text-xs">
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
                className="hidden size-8 lg:flex"
                disabled={!table.getCanNextPage()}
                onClick={() => table.lastPage()}
                size="icon"
                variant="ghost"
              >
                <ChevronsRight />
              </Button>
            </div>
            <span className="text-muted-foreground text-xs">
              {from}-{to}/{total}
            </span>
          </div>
        );
      }}
    </Subscribe>
  );
}
