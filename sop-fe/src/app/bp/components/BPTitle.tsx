"use client";

import { useTranslation } from "react-i18next";
import { BPTitleSkeleton } from "@/app/bp/components/BPSkeletons";
import useBP from "@/app/bp/hooks/useBP";
import Title from "@/app/components/Title";

export default function BPTitle() {
  const { readBP, isReading } = useBP();
  const { t } = useTranslation("bp");

  if (isReading) return <BPTitleSkeleton />;

  return <Title onClick={() => readBP()} title={t("title")} />;
}
