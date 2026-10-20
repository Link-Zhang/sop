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

export default function ColumnSettings() {
  const table = useTableContext();
  const { t } = useTranslation();

  return (
    <Subscribe source={table.atoms.columnVisibility}>
      {(columnVisibility) => (
        <Subscribe source={table.atoms.columnOrder}>
          {(columnOrder) => {
            const fullOrder = columnOrder.length
              ? columnOrder
              : table.getAllColumns().map((c) => c.id);
            const hideableColumns = fullOrder.flatMap((id) => {
              const column = table.getColumn(id);
              return column?.getCanHide() ? [column] : [];
            });

            return (
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="outline">
                      <Settings2 />
                      {t("column.settings")}
                    </Button>
                  }
                />
                <DropdownMenuContent className="w-fit">
                  <DragDropProvider
                    onDragEnd={(event) => {
                      if (event.canceled) return;
                      const ids = hideableColumns.map((c) => c.id);
                      const queue = [...move(ids, event)];
                      const hideable = new Set(ids);
                      table.setColumnOrder(
                        fullOrder.map((id) =>
                          hideable.has(id) ? (queue.shift() ?? id) : id,
                        ),
                      );
                    }}
                  >
                    {hideableColumns.map((column, index) => (
                      <SortableItem
                        checked={columnVisibility[column.id] ?? true}
                        id={column.id}
                        index={index}
                        key={column.id}
                        label={t(`column.field.${column.id}`)}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(value)
                        }
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
