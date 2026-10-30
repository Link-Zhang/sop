"use client";

import { move } from "@dnd-kit/helpers";
import { DragDropProvider } from "@dnd-kit/react";
import { Subscribe } from "@tanstack/react-table";
import { Settings2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import SortableItem from "@/app/components/table/SortableItem";
import { useTableContext } from "@/app/hooks/useTable";
import { Button } from "@/shadcn/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shadcn/components/ui/dropdown-menu";

export default function HeaderSettings() {
  const table = useTableContext();
  const { t } = useTranslation();

  return (
    <Subscribe source={table.atoms.columnVisibility}>
      {(columnVisibility) => (
        <Subscribe source={table.atoms.columnOrder}>
          {(columnOrder) => {
            const effectiveColumnOrder = columnOrder.length
              ? columnOrder
              : table.getAllColumns().map(({ id }) => id);
            const manageableColumns = effectiveColumnOrder.flatMap((id) => {
              const column = table.getColumn(id);
              if (!column) return [];
              const canHide = column.getCanHide();
              const isPinned = column.getIsPinned() !== false;
              return canHide && !isPinned ? [column] : [];
            });

            return (
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button className="px-0 py-0 w-full" variant="ghost">
                      <Settings2 />
                    </Button>
                  }
                />
                <DropdownMenuContent align="end" className="w-fit">
                  <DragDropProvider
                    onDragEnd={(event) => {
                      if (event.canceled) return;
                      const ids = manageableColumns.map(({ id }) => id);
                      const reordered = [...move(ids, event)];
                      const idSet = new Set(ids);
                      table.setColumnOrder(
                        effectiveColumnOrder.map((id) =>
                          idSet.has(id) ? (reordered.shift() ?? id) : id,
                        ),
                      );
                    }}
                  >
                    {manageableColumns.map((column, index) => (
                      <SortableItem
                        checked={columnVisibility[column.id] ?? true}
                        id={column.id}
                        index={index}
                        key={column.id}
                        label={t(`header.field.${column.id}`)}
                        onCheckedChange={(visible) => {
                          if (!visible) column.clearSorting();
                          column.toggleVisibility(visible);
                        }}
                      />
                    ))}
                  </DragDropProvider>
                </DropdownMenuContent>
              </DropdownMenu>
            );
          }}
        </Subscribe>
      )}
    </Subscribe>
  );
}
