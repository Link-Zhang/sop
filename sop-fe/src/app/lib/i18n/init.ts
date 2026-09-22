"use client";

import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";
import { I18N_KEY, NAMESPACES } from "@/app/lib/configs";
import type { Language, Namespace } from "@/app/lib/types";
import { LANGUAGE_CODES, LANGUAGE_DEFAULT_CODE } from "@/app/lib/utils";

let i18nInitPromise: Promise<typeof i18n> | null = null;

export default async function init(): Promise<typeof i18n> {
  if (i18n.isInitialized) return i18n;
  if (i18nInitPromise) return i18nInitPromise;
  i18nInitPromise = (async () => {
    try {
      await i18n
        .use(
          resourcesToBackend(
            (language: Language, namespace: Namespace) =>
              import(`@/app/lib/i18n/locales/${language}/${namespace}.json`),
          ),
        )
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
          detection: {
            lookupLocalStorage: I18N_KEY,
            order: ["localStorage", "navigator", "htmlTag"],
          },
          fallbackLng: LANGUAGE_DEFAULT_CODE,
          interpolation: { escapeValue: false },
          load: "languageOnly",
          nonExplicitSupportedLngs: true,
          ns: NAMESPACES,
          supportedLngs: LANGUAGE_CODES,
        });
      return i18n;
    } catch (error) {
      i18nInitPromise = null;
      throw error;
    }
  })();
  return i18nInitPromise;
}
