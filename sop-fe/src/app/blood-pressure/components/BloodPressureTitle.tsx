"use client";

import { useTranslation } from "react-i18next";
import useBloodPressure from "@/app/blood-pressure/hooks/useBloodPressure";
import TitleUI from "@/app/components/ui/TitleUI";

export default function BloodPressureTitle() {
  const { readBloodPressure } = useBloodPressure();
  const { t } = useTranslation("blood-pressure");

  return <TitleUI onClick={() => readBloodPressure()} title={t("title")} />;
}
