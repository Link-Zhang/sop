import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import type { ColumnHeaderProps } from "@/app/blood-pressure/lib/types";
import { useTableStore } from "@/app/data-table/hooks/useTableStore";
import { Button } from "@/shadcn/components/ui/button";

export default function ColumnHeader({
  canSort = true,
  id,
}: ColumnHeaderProps) {
  const { t } = useTranslation("blood-pressure");
  const sorting = useTableStore((s) => s.sorting);
  const setSorting = useTableStore((s) => s.setSorting);
  const sortIndex = sorting.findIndex((item) => item.id === id);
  const sortItem = sortIndex !== -1 ? sorting[sortIndex] : undefined;
  const isSorted = sortItem ? (sortItem.desc ? "desc" : "asc") : false;
  const SortIcon =
    isSorted === "asc"
      ? ArrowUp
      : isSorted === "desc"
        ? ArrowDown
        : ArrowUpDown;
  const priority =
    sortIndex !== -1 && sorting.length > 1 ? sortIndex + 1 : undefined;

  const handleToggle = useCallback(() => {
    if (sortIndex === -1) {
      setSorting([...sorting, { id, desc: false }]);
      return;
    }
    const next = [...sorting];
    if (next[sortIndex].desc) {
      next.splice(sortIndex, 1);
    } else {
      next[sortIndex] = { id, desc: true };
    }
    setSorting(next);
  }, [sorting, sortIndex, id, setSorting]);

  if (!canSort) {
    return <span>{t(`titles.${id}`)}</span>;
  }

  return (
    <Button className="px-0" onClick={handleToggle} variant="ghost">
      {t(`titles.${id}`)}
      <SortIcon />
      {priority && <sup className="text-[10px]">{priority}</sup>}
    </Button>
  );
}
