"use client";

import { Subscribe } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, Pin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useHeaderContext, useTableContext } from "@/app/hooks/useTable";
import { Button } from "@/shadcn/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcn/components/ui/dropdown-menu";

export default function HeaderContent() {
  const { column } = useHeaderContext();
  const table = useTableContext();
  const { t } = useTranslation();

  return (
    <Subscribe source={table.atoms.sorting}>
      {(sorting) => (
        <Subscribe source={table.atoms.columnPinning}>
          {(pinning) => {
            const idx = sorting.findIndex((s) => s.id === column.id);
            const cur = sorting[idx];
            const pinned = pinning.start?.includes(column.id) ?? false;
            const asc = cur?.desc === false;
            const desc = cur?.desc === true;
            const canPin = column.getCanPin();
            const toggle = (d: boolean) =>
              cur?.desc === d
                ? column.clearSorting()
                : column.toggleSorting(d, true);

            return (
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button className="px-0 py-0 w-full" variant="ghost">
                      {pinned && <Pin />}
                      {t(`header.field.${column.id}`)}
                      {asc && <ArrowUp />}
                      {desc && <ArrowDown />}
                      {cur && sorting.length > 1 && (
                        <sup className="text-[10px]">{idx + 1}</sup>
                      )}
                    </Button>
                  }
                />
                <DropdownMenuContent align="center" className="w-fit">
                  {column.getCanSort() && (
                    <>
                      <DropdownMenuCheckboxItem
                        checked={asc}
                        closeOnClick
                        onCheckedChange={() => toggle(false)}
                      >
                        <ArrowUp /> {t("header.sort.asc")}
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={desc}
                        closeOnClick
                        onCheckedChange={() => toggle(true)}
                      >
                        <ArrowDown /> {t("header.sort.desc")}
                      </DropdownMenuCheckboxItem>
                      {canPin && <DropdownMenuSeparator />}
                    </>
                  )}
                  {canPin && (
                    <DropdownMenuCheckboxItem
                      checked={pinned}
                      closeOnClick
                      onCheckedChange={(checked) =>
                        column.pin(checked ? "start" : false)
                      }
                    >
                      <Pin /> {t("header.pin")}
                    </DropdownMenuCheckboxItem>
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
