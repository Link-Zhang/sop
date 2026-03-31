import type { TFunction } from "i18next";
import {
  ArrowUpWideNarrow,
  ChevronDown,
  ChevronsUp,
  ChevronUp,
  Equal,
  Heart,
  HeartMinus,
  HeartPlus,
  HeartPulse,
  WavesArrowUp,
} from "lucide-react";
import z from "zod";
import type { FacetedFilterOption } from "@/app/data-table/lib/types";

// todo
export const getBloodPressureLevel = (sbp: number, dbp: number) => {
  const [sLevel, dLevel] = [
    getSystolicBloodPressureLevel(sbp),
    getDiastolicBloodPressureLevel(dbp),
  ];
  return bloodPressureLevels.indexOf(sLevel) >=
    bloodPressureLevels.indexOf(dLevel)
    ? sLevel
    : dLevel;
};

export const getDiastolicBloodPressureLevel = (dbp: number) => {
  return (
    bloodPressureLevels.find((level) => dbp < level.dbpLimit) ||
    bloodPressureLevels[bloodPressureLevels.length - 1]
  );
};

export const getHeartRateLevel = (hr: number) => {
  return (
    heartRateLevels.find((level) => hr < level.limit) ||
    heartRateLevels[heartRateLevels.length - 1]
  );
};

export const getLevelOptions = (id: string): FacetedFilterOption[] => {
  if (id === "heartRate") {
    return heartRateLevels.map((level, index, arr) => {
      const lower = index === 0 ? 0 : arr[index - 1].limit;
      const upper = level.limit;
      const rangeText =
        upper === Infinity ? `≥ ${lower}` : `[${lower}, ${upper})`;
      return {
        color: level.textColor,
        icon: level.icon,
        label: `${rangeText}`,
        range: [lower, upper] as [number, number],
        text: level.text,
      };
    });
  }

  const isSBP = id === "systolicBloodPressure";
  return bloodPressureLevels.map((level, index, arr) => {
    const lower = isSBP
      ? index === 0
        ? 0
        : arr[index - 1].sbpLimit
      : index === 0
        ? 0
        : arr[index - 1].dbpLimit;
    const upper = isSBP ? level.sbpLimit : level.dbpLimit;
    const rangeText =
      upper === Infinity ? `≥ ${lower}` : `[${lower}, ${upper})`;
    return {
      color: level.textColor,
      icon: level.icon,
      label: `${rangeText}`,
      range: [lower, upper] as [number, number],
      text: level.text,
    };
  });
};

export const getSystolicBloodPressureLevel = (sbp: number) => {
  return (
    bloodPressureLevels.find((level) => sbp < level.sbpLimit) ||
    bloodPressureLevels[bloodPressureLevels.length - 1]
  );
};

export const numberField = (
  t: TFunction,
  key: string,
  min: number,
  max: number,
) => {
  const field = t(`fields.${key}`);

  return z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z
      .number(t("validation.required", { field }))
      .min(min, t("validation.min", { field, min }))
      .max(max, t("validation.max", { field, max })),
  );
};

const bloodPressureLevels = [
  {
    bgColor: "bg-blue-500",
    dbpLimit: 60,
    icon: ChevronDown,
    sbpLimit: 90,
    text: "bloodPressureLevels.low",
    textColor: "text-blue-500",
  },
  {
    bgColor: "bg-green-500",
    dbpLimit: 80,
    icon: Equal,
    sbpLimit: 120,
    text: "bloodPressureLevels.normal",
    textColor: "text-green-500",
  },
  {
    bgColor: "bg-yellow-500",
    dbpLimit: 90,
    icon: WavesArrowUp,
    sbpLimit: 140,
    text: "bloodPressureLevels.elevated",
    textColor: "text-yellow-500",
  },
  {
    bgColor: "bg-orange-500",
    dbpLimit: 100,
    icon: ChevronUp,
    sbpLimit: 160,
    text: "bloodPressureLevels.high",
    textColor: "text-orange-500",
  },
  {
    bgColor: "bg-rose-500",
    dbpLimit: 110,
    icon: ChevronsUp,
    sbpLimit: 180,
    text: "bloodPressureLevels.veryHigh",
    textColor: "text-rose-500",
  },
  {
    bgColor: "bg-red-500",
    dbpLimit: Infinity,
    icon: ArrowUpWideNarrow,
    sbpLimit: Infinity,
    text: "bloodPressureLevels.severe",
    textColor: "text-red-500",
  },
];

const heartRateLevels = [
  {
    bgColor: "bg-blue-500",
    icon: HeartMinus,
    limit: 60,
    text: "heartRateLevels.low",
    textColor: "text-blue-500",
  },
  {
    bgColor: "bg-green-500",
    icon: Heart,
    limit: 80,
    text: "heartRateLevels.normal",
    textColor: "text-green-500",
  },
  {
    bgColor: "bg-yellow-500",
    icon: HeartPulse,
    limit: 100,
    text: "heartRateLevels.elevated",
    textColor: "text-yellow-500",
  },
  {
    bgColor: "bg-red-500",
    icon: HeartPlus,
    limit: Infinity,
    text: "heartRateLevels.high",
    textColor: "text-red-500",
  },
];

export const metricColumns = [
  {
    fn: getSystolicBloodPressureLevel,
    id: "systolicBloodPressure",
  },
  {
    fn: getDiastolicBloodPressureLevel,
    id: "diastolicBloodPressure",
  },
  {
    fn: getHeartRateLevel,
    id: "heartRate",
  },
] as const;
