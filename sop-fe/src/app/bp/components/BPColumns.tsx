"use client";

import { useTranslation } from "react-i18next";
import { createAppColumnHelper } from "@/app/bp/hooks/useTable";
import type { BP } from "@/app/bp/lib/types";
import { Checkbox } from "@/shadcn/components/ui/checkbox";

const columnHelper = createAppColumnHelper<BP>();

//  todo: fix it
const columns = columnHelper.columns([
  columnHelper.display({
    cell: () => <Checkbox />,
    enableHiding: false,
    enableResizing: false,
    enableSorting: false,
    header: "Select",
    id: "select",
  }),
  columnHelper.accessor("sbp", {
    cell: (info) => info.renderValue(),
    header: () => {
      const { t } = useTranslation("bp");
      return t("header.sbp");
    },
  }),
  columnHelper.accessor("dbp", {
    cell: (info) => info.renderValue(),
    header: () => {
      const { t } = useTranslation("bp");
      return t("header.dbp");
    },
  }),
  columnHelper.accessor("hr", {
    cell: (info) => info.renderValue(),
    header: () => {
      const { t } = useTranslation("bp");
      return t("header.hr");
    },
  }),
  columnHelper.display({
    cell: () => <Checkbox />,
    enableHiding: false,
    enableResizing: false,
    enableSorting: false,
    header: "Actions",
    id: "actions",
  }),
]);

export default columns;
