import { LANGUAGES, THEMES } from "@/app/lib/configs";

export const isActive = (pathname: string, value: string) =>
  value === "/" ? pathname === "/" : `${pathname}/`.startsWith(value);

export const LANGUAGE_CODES = LANGUAGES.map((lang) => lang.code);

export const LANGUAGE_DEFAULT_CODE = LANGUAGES[0].code;

export const THEME_DEFAULT_ICON = THEMES[0].icon;

export const THEME_DEFAULT_MODE = THEMES[0].mode;

export const THEME_MODES = THEMES.map((t) => t.mode);
