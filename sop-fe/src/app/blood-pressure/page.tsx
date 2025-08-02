"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import BloodPressureTable from "@/app/blood-pressure/components/BloodPressureTable";
import BloodPressureTitle from "@/app/blood-pressure/components/BloodPressureTitle";

export default function BloodPressurePage() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <BloodPressureTitle />
      <BloodPressureTable />
    </QueryClientProvider>
  );
}
