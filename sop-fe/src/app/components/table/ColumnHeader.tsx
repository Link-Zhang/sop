"use client";

import { Subscribe } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, EyeOff, Pin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useHeaderContext, useTableContext } from "@/app/hooks/useTable";
import { Button } from "@/shadcn/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcn/components/ui/dropdown-menu";

export default function ColumnHeader() {
  const header = useHeaderContext();
  const table = useTableContext();
  const { t } = useTranslation();

  const column = header.column;
  const canHide = column.getCanHide();
  const canPin = column.getCanPin();
  const canSort = column.getCanSort();

  return (
    <Subscribe source={table.atoms.sorting}>
      {(sorting) => (
        <Subscribe source={table.atoms.columnPinning}>
          {(pinning) => {
            const idx = sorting.findIndex((s) => s.id === column.id);
            const cur = sorting[idx];
            const pinned = !!pinning.start?.includes(column.id);
            const toggle = (desc: boolean) =>
              cur?.desc === desc
                ? column.clearSorting()
                : column.toggleSorting(desc, true);

            return (
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="ghost">
                      {t(`column.field.${column.id}`)}
                      {cur && (cur.desc ? <ArrowDown /> : <ArrowUp />)}
                      {sorting.length > 1 && cur && (
                        <sup className="text-[10px]">{idx + 1}</sup>
                      )}
                      {pinned && <Pin />}
                    </Button>
                  }
                />
                <DropdownMenuContent className="w-fit">
                  {canSort && (
                    <>
                      <DropdownMenuCheckboxItem
                        checked={cur?.desc === false}
                        closeOnClick
                        onCheckedChange={() => toggle(false)}
                      >
                        <ArrowUp /> {t("column.asc")}
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={!!cur?.desc}
                        closeOnClick
                        onCheckedChange={() => toggle(true)}
                      >
                        <ArrowDown /> {t("column.desc")}
                      </DropdownMenuCheckboxItem>
                    </>
                  )}

                  {canSort && (canPin || canHide) && <DropdownMenuSeparator />}

                  {canPin && (
                    <DropdownMenuCheckboxItem
                      checked={pinned}
                      closeOnClick
                      onCheckedChange={(checked) =>
                        column.pin(checked ? "start" : false)
                      }
                    >
                      <Pin /> {t("column.pin")}
                    </DropdownMenuCheckboxItem>
                  )}

                  {canPin && canHide && <DropdownMenuSeparator />}

                  {canHide && (
                    <DropdownMenuItem
                      onClick={() => {
                        column.clearSorting();
                        column.toggleVisibility();
                      }}
                    >
                      <EyeOff /> {t("column.hide")}
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            );
          }}
        </Subscribe>
      )}
    </Subscribe>
  );
}
