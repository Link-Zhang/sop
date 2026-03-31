"use client";

import columns from "@/app/blood-pressure/components/BloodPressureColumns";
import DataTable from "@/app/blood-pressure/components/DataTable";
import useBloodPressure from "@/app/blood-pressure/hooks/useBloodPressure";

export default function BloodPressure() {
  const { data, isLoading, error } = useBloodPressure();

  // todo
  if (isLoading || error || !data?.length) return;

  return <DataTable columns={columns} data={data} />;
}
