"use client";

import { Subscribe } from "@tanstack/react-table";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTableContext } from "@/app/hooks/useTable";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shadcn/components/ui/input-group";

export default function TableSearch() {
  const table = useTableContext();
  const { t } = useTranslation();

  return (
    <Subscribe source={table.atoms.globalFilter}>
      {(globalFilter) => {
        const count = table.getFilteredRowModel().rows.length;
        const filter = typeof globalFilter === "string" ? globalFilter : "";

        return (
          <InputGroup>
            <InputGroupInput
              onChange={(e) => {
                table.setGlobalFilter(e.target.value);
                table.firstPage();
              }}
              placeholder={t("table.search.placeholder")}
              value={filter}
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            {filter && (
              <InputGroupAddon align="inline-end">
                <span className="text-muted-foreground">
                  {count}
                  {t("table.search.result")}
                </span>
              </InputGroupAddon>
            )}
          </InputGroup>
        );
      }}
    </Subscribe>
  );
}
