"use client";

import { useTranslation } from "react-i18next";
import columns from "@/app/blood-pressure/components/BloodPressureColumns";
import BloodPressureError from "@/app/blood-pressure/error";
import type { BloodPressure } from "@/app/blood-pressure/lib/types";
import { getRangeFilterOptionsMap } from "@/app/blood-pressure/lib/utils";
import DataTable from "@/app/data-table/components/DataTable";
import useGetQuery from "@/app/hooks/useGetQuery";
import { BLOOD_PRESSURE_API_URL } from "@/app/lib/apis";

export default function BloodPressureTable() {
  const {
    data = [],
    error,
    isPending,
  } = useGetQuery<BloodPressure[]>(BLOOD_PRESSURE_API_URL);
  const { t } = useTranslation("blood-pressure");

  if (error) return <BloodPressureError error={error} />;

  // todo
  if (isPending) return;

  // todo
  if (!data?.length) return;

  return (
    <DataTable
      columns={columns}
      data={data}
      rangeFilterMap={getRangeFilterOptionsMap()}
      t={t}
    />
  );
}
