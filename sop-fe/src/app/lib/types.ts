import type { NAMESPACES } from "@/app/lib/configs";
import type { LANGUAGE_CODES, THEME_MODES } from "@/app/lib/utils";

export type Language = (typeof LANGUAGE_CODES)[number];

export type Namespace = (typeof NAMESPACES)[number];

export type ThemeMode = (typeof THEME_MODES)[number];
