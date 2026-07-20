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
  PanelBottomDashed,
  PanelTopDashed,
  WavesArrowUp,
} from "lucide-react";
import z from "zod";
import {
  type Level,
  updateBloodPressureSchema,
} from "@/app/blood-pressure/lib/types";

export const bloodPressureLevels = [
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

export const heartRateLevels = [
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

const ishLevel = {
  bgColor: "bg-gray-500",
  dbpLimit: 90,
  icon: PanelTopDashed,
  sbpLimit: 140,
  text: "bloodPressureLevels.ish",
  textColor: "text-gray-500",
};

const idhLevel = {
  bgColor: "bg-stone-500",
  dbpLimit: 90,
  icon: PanelBottomDashed,
  sbpLimit: 140,
  text: "bloodPressureLevels.idh",
  textColor: "text-stone-500",
};

const buildRangeFilterOptions = (
  levels: Level[],
  key: (typeof metricColumns)[number]["key"],
) =>
  levels.map((level, index, array) => ({
    color: level.textColor,
    icon: level.icon,
    label: `[${index ? array[index - 1][key] : 0}, ${index === array.length - 1 ? "∞" : level[key]})`,
    range: [
      index ? array[index - 1][key] : 0,
      index === array.length - 1 ? Infinity : level[key],
    ] as [number, number],
    text: level.text,
  }));

const getLevel = <T>(
  levels: T[],
  value: number,
  getLimit: (item: T) => number,
): T =>
  levels.find((level) => value < getLimit(level)) ?? levels[levels.length - 1];

const getSBPLevel = (sbp: number) =>
  getLevel(bloodPressureLevels, sbp, (level) => level.sbpLimit);

const getDBPLevel = (dbp: number) =>
  getLevel(bloodPressureLevels, dbp, (level) => level.dbpLimit);

export const getBPLevel = (sbp: number, dbp: number) => {
  const s = getSBPLevel(sbp);
  const d = getDBPLevel(dbp);
  if (sbp >= ishLevel.sbpLimit && dbp < ishLevel.dbpLimit) return ishLevel;
  if (sbp < idhLevel.sbpLimit && dbp >= idhLevel.dbpLimit) return idhLevel;
  return bloodPressureLevels.indexOf(s) >= bloodPressureLevels.indexOf(d)
    ? s
    : d;
};

export const getHRLevel = (hr: number) =>
  getLevel(heartRateLevels, hr, (level) => level.limit);

// todo: fix it
export const metricColumns = [
  {
    fn: getSBPLevel,
    id: "systolicBloodPressure",
    key: "sbpLimit",
    levels: bloodPressureLevels,
  },
  {
    fn: getDBPLevel,
    id: "diastolicBloodPressure",
    key: "dbpLimit",
    levels: bloodPressureLevels,
  },
  {
    fn: getHRLevel,
    id: "heartRate",
    key: "limit",
    levels: heartRateLevels,
  },
] as const;

export const getRangeFilterOptionsMap = () => {
  const [sbp, dbp, hr] = metricColumns;
  return {
    systolicBloodPressure: buildRangeFilterOptions(sbp.levels, sbp.key),
    diastolicBloodPressure: buildRangeFilterOptions(dbp.levels, dbp.key),
    heartRate: buildRangeFilterOptions(hr.levels, hr.key),
  };
};

export const bloodPressureFields = [
  {
    key: "systolicBloodPressure" as const,
    unit: "(mmHg)",
    placeholder: "120",
  },
  {
    key: "diastolicBloodPressure" as const,
    unit: "(mmHg)",
    placeholder: "80",
  },
  {
    key: "heartRate" as const,
    unit: "(bpm)",
    placeholder: "80",
  },
];

const i18nNumberField = (
  baseSchema: z.ZodNumber,
  fieldKey: string,
  t: TFunction,
) => {
  const fieldLabel = t(`fields.${fieldKey}`);
  let schema = z.number(t("validation.required", { field: fieldLabel }));
  const { maxValue: max, minValue: min } = baseSchema;
  if (max !== null)
    schema = schema.max(max, t("validation.max", { field: fieldLabel, max }));
  if (min !== null)
    schema = schema.min(min, t("validation.min", { field: fieldLabel, min }));
  return schema;
};

export const getRowSchema = (t: TFunction) => {
  const baseShape = updateBloodPressureSchema.shape;
  const i18nShape = Object.fromEntries(
    Object.entries(baseShape).map(([key, schema]) => {
      if (schema instanceof z.ZodNumber) {
        return [key, i18nNumberField(schema, key, t)];
      }
      return [key, schema];
    }),
  ) as typeof baseShape;
  return z
    .object(i18nShape)
    .refine(
      (data) => data.diastolicBloodPressure < data.systolicBloodPressure,
      {
        message: t("validation.diastolicMustBeLessThanSystolic"),
        path: ["diastolicBloodPressure"],
      },
    );
};
