export const LOCAL_STORAGE_KEY = "i18nextLng" as const;

export const LOCAL_STORAGE_SYNC_KEY = `${LOCAL_STORAGE_KEY}Sync`;

export const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English", nativeName: "English", countryCode: "us" },
  { code: "zh", name: "Chinese", nativeName: "中文", countryCode: "cn" },
] as const;

export const SUPPORTED_LOCALES = [
  { code: "en", locale: "en-US" },
  { code: "zh", locale: "zh-CN" },
] as const;

export const SUPPORTED_NAMESPACES = [
  "appearance",
  "blood-pressure",
  "default",
  "language",
  "todo",
] as const;

export const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES[0]?.code ?? "en";

export const DEFAULT_LOCALE = SUPPORTED_LOCALES[0]?.locale ?? "en-US";

export const SUPPORTED_LNGS = SUPPORTED_LANGUAGES.map((lang) => lang.code);

export type SupportedLanguages = (typeof SUPPORTED_LNGS)[number];

export type SupportedNamespaces = (typeof SUPPORTED_NAMESPACES)[number];
