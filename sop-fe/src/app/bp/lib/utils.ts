// import {
//   ArrowUpWideNarrow,
//   ChevronDown,
//   ChevronsUp,
//   ChevronUp,
//   Equal,
//   Heart,
//   HeartMinus,
//   HeartPlus,
//   HeartPulse,
//   PanelBottomDashed,
//   PanelTopDashed,
//   WavesArrowUp,
// } from "lucide-react";
//
// export const bloodPressureLevels = [
//   {
//     bgColor: "bg-blue-500",
//     dbpLimit: 60,
//     icon: ChevronDown,
//     sbpLimit: 90,
//     text: "bloodPressureLevels.low",
//     textColor: "text-blue-500",
//   },
//   {
//     bgColor: "bg-green-500",
//     dbpLimit: 80,
//     icon: Equal,
//     sbpLimit: 120,
//     text: "bloodPressureLevels.normal",
//     textColor: "text-green-500",
//   },
//   {
//     bgColor: "bg-yellow-500",
//     dbpLimit: 90,
//     icon: WavesArrowUp,
//     sbpLimit: 140,
//     text: "bloodPressureLevels.elevated",
//     textColor: "text-yellow-500",
//   },
//   {
//     bgColor: "bg-orange-500",
//     dbpLimit: 100,
//     icon: ChevronUp,
//     sbpLimit: 160,
//     text: "bloodPressureLevels.high",
//     textColor: "text-orange-500",
//   },
//   {
//     bgColor: "bg-rose-500",
//     dbpLimit: 110,
//     icon: ChevronsUp,
//     sbpLimit: 180,
//     text: "bloodPressureLevels.veryHigh",
//     textColor: "text-rose-500",
//   },
//   {
//     bgColor: "bg-red-500",
//     dbpLimit: Infinity,
//     icon: ArrowUpWideNarrow,
//     sbpLimit: Infinity,
//     text: "bloodPressureLevels.severe",
//     textColor: "text-red-500",
//   },
// ];
//
// export const heartRateLevels = [
//   {
//     bgColor: "bg-blue-500",
//     icon: HeartMinus,
//     limit: 60,
//     text: "heartRateLevels.low",
//     textColor: "text-blue-500",
//   },
//   {
//     bgColor: "bg-green-500",
//     icon: Heart,
//     limit: 80,
//     text: "heartRateLevels.normal",
//     textColor: "text-green-500",
//   },
//   {
//     bgColor: "bg-yellow-500",
//     icon: HeartPulse,
//     limit: 100,
//     text: "heartRateLevels.elevated",
//     textColor: "text-yellow-500",
//   },
//   {
//     bgColor: "bg-red-500",
//     icon: HeartPlus,
//     limit: Infinity,
//     text: "heartRateLevels.high",
//     textColor: "text-red-500",
//   },
// ];
//
// const ishLevel = {
//   bgColor: "bg-gray-500",
//   dbpLimit: 90,
//   icon: PanelTopDashed,
//   sbpLimit: 140,
//   text: "bloodPressureLevels.ish",
//   textColor: "text-gray-500",
// };
//
// const idhLevel = {
//   bgColor: "bg-stone-500",
//   dbpLimit: 90,
//   icon: PanelBottomDashed,
//   sbpLimit: 140,
//   text: "bloodPressureLevels.idh",
//   textColor: "text-stone-500",
// };

import z from "zod";

export function isNumber(schema: z.ZodType) {
  return unwrap(schema) instanceof z.ZodNumber;
}

export function numberScope(schema: z.ZodType) {
  const checks =
    (unwrap(schema) as { _zod?: { def?: { checks?: unknown[] } } })._zod?.def
      ?.checks ?? [];
  const scope: { max?: number; min?: number } = {};
  for (const c of checks) {
    const d =
      (c as { _zod?: { def?: { check?: string; value?: number } } })._zod
        ?.def ?? (c as { check?: string; value?: number });
    if (d.check === "less_than") scope.max = d.value;
    if (d.check === "greater_than") scope.min = d.value;
  }
  return scope;
}

function unwrap(schema: z.ZodType) {
  let s: z.core.$ZodType = schema;
  while (s instanceof z.ZodOptional || s instanceof z.ZodNullable) {
    s = s.unwrap();
  }
  return s;
}
