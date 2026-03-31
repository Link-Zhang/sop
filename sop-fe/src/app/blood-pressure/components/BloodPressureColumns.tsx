"use client";

import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import ColumnHeader from "@/app/blood-pressure/components/ColumnHeader";
import RowOtherActions from "@/app/blood-pressure/components/RowOtherActions";
import type { BloodPressure } from "@/app/blood-pressure/lib/types";
import {
  getBloodPressureLevel,
  getHeartRateLevel,
  metricColumns,
} from "@/app/blood-pressure/lib/utils";
import { multiRangeFilterFn } from "@/app/data-table/lib/utils";
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
        onCheckedChange={(value) => row.toggleSelected(!!value)}
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
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    id: "select",
  }),
  columnHelper.accessor((row) => row.measuredAt, {
    cell: (info) => {
      const d = new Date(info.getValue());
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="cursor-default">{d.toLocaleDateString()}</span>
          </TooltipTrigger>
          <TooltipContent>{d.toLocaleString()}</TooltipContent>
        </Tooltip>
      );
    },
    enableColumnFilter: false,
    header: ({ column }) => (
      <ColumnHeader canSort={column.getCanSort()} id="measuredAt" />
    ),
    id: "measuredAt",
  }),
  ...metricColumns.map(({ fn, id }) =>
    columnHelper.accessor(id, {
      cell: (info) => {
        const value = info.getValue();
        const level = fn(value);
        const IconComponent = level.icon;
        return (
          <div className="flex items-center gap-2">
            <IconComponent className={cn("h-4 w-4", level.textColor)} />
            <span>{value}</span>
          </div>
        );
      },
      filterFn: multiRangeFilterFn,
      header: ({ column }) => (
        <ColumnHeader canSort={column.getCanSort()} id={id} />
      ),
      id,
    }),
  ),
  columnHelper.display({
    cell: ({ row }) => {
      const { t } = useTranslation("blood-pressure");
      const sbp = row.original.systolicBloodPressure;
      const dbp = row.original.diastolicBloodPressure;
      if (sbp <= dbp) {
        return <span className="text-red-500">{t("error")}</span>;
      }
      const hr = row.original.heartRate;
      const hrLevel = getHeartRateLevel(hr);
      const bpLevel = getBloodPressureLevel(sbp, dbp);
      return (
        <div className="flex items-center gap-2">
          <span>{t("impressionBloodPressure")}:</span>
          <Badge variant="outline" className={bpLevel.bgColor}>
            {t(bpLevel.text)}
          </Badge>
          <span>{t("impressionHeartRate")}:</span>
          <Badge variant="outline" className={hrLevel.bgColor}>
            {t(hrLevel.text)}
          </Badge>
        </div>
      );
    },
    enableHiding: false,
    header: ({ column }) => (
      <ColumnHeader canSort={column.getCanSort()} id="impression" />
    ),
    id: "impression",
  }),
  columnHelper.display({
    cell: ({ row }) => <RowOtherActions row={row} />,
    enableColumnFilter: false,
    enableHiding: false,
    enableSorting: false,
    id: "actions",
  }),
] as ColumnDef<BloodPressure>[];

export default columns;
