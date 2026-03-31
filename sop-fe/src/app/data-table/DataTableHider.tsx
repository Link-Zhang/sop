"use client";

import { useTranslation } from "react-i18next";
import { useTableStore } from "@/app/data-table/hooks/useTableStore";
import DataTableHiderUI from "@/app/data-table/ui/DataTableHiderUI";

export default function DataTableHider({ ids }: { ids: string[] }) {
  const columnVisibility = useTableStore((s) => s.columnVisibility);
  const setColumnVisibility = useTableStore((s) => s.setColumnVisibility);
  const { t } = useTranslation("blood-pressure");

  const handleToggle = (id: string) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [id]: !(prev[id] ?? true),
    }));
  };

  return (
    <DataTableHiderUI
      getTitle={(id) => t(`titles.${id}`)}
      ids={ids}
      isVisible={(id) => columnVisibility[id] ?? true}
      onToggle={handleToggle}
      text={t("hider")}
    />
  );
}
