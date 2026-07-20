"use client";

import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import RowActions from "@/app/blood-pressure/components/RowActions";
import type { BloodPressure } from "@/app/blood-pressure/lib/types";
import {
  getBPLevel,
  getHRLevel,
  metricColumns,
} from "@/app/blood-pressure/lib/utils";
import ColumnHeader from "@/app/data-table/components/ColumnHeader";
import { formatDate, isInAnyRange } from "@/app/lib/utils";
import { Badge } from "@/shadcn/components/ui/badge";
import { Checkbox } from "@/shadcn/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shadcn/components/ui/tooltip";
import { cn } from "@/shadcn/lib/utils";

const columnHelper = createColumnHelper<BloodPressure>();

const columns = [
  columnHelper.display({
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(value)}
      />
    ),
    enableColumnFilter: false,
    enableHiding: false,
    enableSorting: false,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: boolean) =>
          table.toggleAllPageRowsSelected(value)
        }
      />
    ),
    id: "select",
  }),
  columnHelper.accessor((row) => row.date, {
    cell: ({ getValue }) => {
      const { i18n } = useTranslation("blood-pressure");
      const date = getValue();
      const localDate = formatDate(date, i18n.language);
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="cursor-default">{localDate}</span>
          </TooltipTrigger>
          <TooltipContent>{date}</TooltipContent>
        </Tooltip>
      );
    },
    enableColumnFilter: false,
    header: ({ column }) => {
      const { t } = useTranslation("blood-pressure");
      return (
        <ColumnHeader
          canSort={column.getCanSort()}
          id={column.id}
          label={t(`headers.${column.id}`)}
        />
      );
    },
    id: "date",
  }),
  ...metricColumns.map(({ fn, id }) =>
    columnHelper.accessor(id, {
      cell: ({ getValue }) => {
        const { t } = useTranslation("blood-pressure");
        const value = getValue();
        const level = fn(value);
        const IconComponent = level.icon;
        return (
          <div className="flex items-center gap-2">
            <IconComponent className={cn("h-4 w-4", level.textColor)} />
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="cursor-default">{value}</span>
              </TooltipTrigger>
              <TooltipContent>{t(level.text)}</TooltipContent>
            </Tooltip>
          </div>
        );
      },
      filterFn: isInAnyRange,
      header: ({ column }) => {
        const { t } = useTranslation("blood-pressure");
        return (
          <ColumnHeader
            canSort={column.getCanSort()}
            id={column.id}
            label={t(`headers.${column.id}`)}
          />
        );
      },
      id,
    }),
  ),
  columnHelper.display({
    cell: ({ row }) => {
      const { t } = useTranslation("blood-pressure");
      const sbp = row.original.systolicBloodPressure;
      const dbp = row.original.diastolicBloodPressure;
      if (sbp <= dbp) {
        return (
          <span className="text-red-500">
            {t("validation.diastolicMustBeLessThanSystolic")}
          </span>
        );
      }
      const hr = row.original.heartRate;
      const hrLevel = getHRLevel(hr);
      const bpLevel = getBPLevel(sbp, dbp);
      return (
        <div className="flex items-center gap-2">
          <span>{t("impressions.bloodPressure")}:</span>
          <Badge variant="outline" className={bpLevel.bgColor}>
            {t(bpLevel.text)}
          </Badge>
          <span>{t("impressions.heartRate")}:</span>
          <Badge variant="outline" className={hrLevel.bgColor}>
            {t(hrLevel.text)}
          </Badge>
        </div>
      );
    },
    enableHiding: false,
    header: ({ column }) => {
      const { t } = useTranslation("blood-pressure");
      return (
        <ColumnHeader
          canSort={column.getCanSort()}
          id={column.id}
          label={t(`headers.${column.id}`)}
        />
      );
    },
    id: "impression",
  }),
  columnHelper.display({
    cell: ({ row }) => {
      const { t } = useTranslation("blood-pressure");
      return <RowActions row={row} t={t} />;
    },
    enableColumnFilter: false,
    enableHiding: false,
    enableSorting: false,
    id: "actions",
  }),
] as ColumnDef<BloodPressure>[];

export default columns;
