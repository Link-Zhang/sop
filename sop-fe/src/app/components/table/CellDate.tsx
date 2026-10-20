"use client";

import { useTranslation } from "react-i18next";
import { useCellContext } from "@/app/hooks/useTable";
import { DATE_OPTIONS } from "@/app/lib/configs";
import { formatDate } from "@/app/lib/utils";

export default function CellDate() {
  const cell = useCellContext<string | Date>();
  const { i18n } = useTranslation();

  return (
    <span>
      {formatDate(cell.getValue(), i18n.language, {
        ...DATE_OPTIONS,
        year: "numeric",
      })}
    </span>
  );
}
