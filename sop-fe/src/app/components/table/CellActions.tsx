"use client";

import {
  ClipboardPenLine,
  Copy,
  Ellipsis,
  FileBraces,
  Trash,
} from "lucide-react";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { useCellContext } from "@/app/hooks/useTable";
import { Button } from "@/shadcn/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcn/components/ui/dropdown-menu";

export default function CellActions() {
  const { row, table } = useCellContext();
  const { t } = useTranslation();

  const rowData = row.original;
  const { id, ...rowDataWithoutId } = rowData;

  const actions = [
    {
      icon: <FileBraces />,
      label: t("json.trigger"),
      onClick: () => table.options.meta?.onRead?.(rowData),
    },
    {
      icon: <ClipboardPenLine />,
      label: t("update.trigger"),
      onClick: () => table.options.meta?.onUpdate?.(rowData),
      separator: true,
    },
    {
      icon: <Copy />,
      label: t("copy.trigger"),
      onClick: () => table.options.meta?.onCreate?.(rowDataWithoutId),
    },
    {
      icon: <Trash />,
      label: t("delete.trigger"),
      onClick: () => id && table.options.meta?.onDelete?.(id),
      separator: true,
      variant: "destructive" as const,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button className="px-0 py-0 w-full" variant="ghost">
            <Ellipsis />
          </Button>
        }
      />
      <DropdownMenuContent className="w-fit">
        {actions.map(({ icon, label, onClick, separator, variant }) => (
          <Fragment key={label}>
            {separator && <DropdownMenuSeparator />}
            <DropdownMenuItem onClick={onClick} variant={variant}>
              {icon} {label}
            </DropdownMenuItem>
          </Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
