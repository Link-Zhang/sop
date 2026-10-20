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

export default function GlobalSearch() {
  const table = useTableContext();
  const { t } = useTranslation();

  return (
    <Subscribe source={table.atoms.globalFilter}>
      {() => {
        const filter = table.atoms.globalFilter.get() ?? "";
        return (
          <InputGroup className="max-w-3xs">
            <InputGroupInput
              onChange={(e) => table.setGlobalFilter(e.target.value)}
              placeholder={t("search.placeholder")}
              value={filter}
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            {filter && (
              <InputGroupAddon align="inline-end">
                <span className="text-muted-foreground">
                  {table.getFilteredRowModel().rows.length} {t("search.result")}
                </span>
              </InputGroupAddon>
            )}
          </InputGroup>
        );
      }}
    </Subscribe>
  );
}
