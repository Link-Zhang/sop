export const LOCAL_STORAGE_KEY = "i18nextLng" as const;

// todo: update json
export const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English", nativeName: "English", countryCode: "us" },
  { code: "es", name: "Spanish", nativeName: "Español", countryCode: "es" },
  { code: "fr", name: "French", nativeName: "Français", countryCode: "fr" },
  { code: "ru", name: "Russian", nativeName: "Русский", countryCode: "ru" },
  { code: "zh", name: "Chinese", nativeName: "中文", countryCode: "cn" },
] as const;

export const SUPPORTED_NAMESPACES = [
  "default",
  "home",
  "mode",
  "second",
  "todo",
] as const;

export const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES[0].code;

export const SUPPORTED_LNGS = SUPPORTED_LANGUAGES.map((lang) => lang.code);

export type SupportedLanguages = (typeof SUPPORTED_LNGS)[number];

export type SupportedNamespaces = (typeof SUPPORTED_NAMESPACES)[number];
