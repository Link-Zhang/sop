import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useCallback } from "react";
import ColumnHeaderUI from "@/app/data-table/components/ui/ColumnHeaderUI";
import { useTableStore } from "@/app/data-table/hooks/useTableStore";
import type { ColumnHeaderProps } from "@/app/data-table/lib/types";

export default function ColumnHeader({
  canSort = true,
  id,
  label,
}: ColumnHeaderProps) {
  const sorting = useTableStore((s) => s.sorting);
  const setSorting = useTableStore((s) => s.setSorting);

  const sortIndex = sorting.findIndex((item) => item.id === id);
  const sortItem = sortIndex !== -1 ? sorting[sortIndex] : undefined;
  const isSorted = sortItem ? (sortItem.desc ? "desc" : "asc") : false;
  const SortIcon =
    isSorted === "desc"
      ? ArrowDown
      : isSorted === "asc"
        ? ArrowUp
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

  return (
    <ColumnHeaderUI
      canSort={canSort}
      label={label}
      onClick={handleToggle}
      priority={priority}
      sortIcon={SortIcon}
    />
  );
}
