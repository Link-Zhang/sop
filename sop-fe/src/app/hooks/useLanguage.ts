"use client";

import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
import { useEffect, useState } from "react";
import { initReactI18next } from "react-i18next";
import {
  DEFAULT_LANGUAGE,
  LOCAL_STORAGE_KEY,
  LOCAL_STORAGE_SYNC_KEY,
  SUPPORTED_LNGS,
  SUPPORTED_NAMESPACES,
  type SupportedLanguages,
  type SupportedNamespaces,
} from "@/app/lib/i18n/i18n";

export default function useLanguage() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initializeLanguage = async () => {
      if (!i18n.isInitialized) {
        await i18n
          .use(LanguageDetector)
          .use(initReactI18next)
          .use(
            resourcesToBackend(
              async (
                language: SupportedLanguages,
                namespace: SupportedNamespaces,
              ) => {
                return (
                  await import(
                    `@/app/lib/i18n/locales/${language}/${namespace}.json`
                  )
                ).default;
              },
            ),
          )
          .init({
            debug: false,
            detection: {
              caches: ["localStorage"],
              convertDetectedLanguage: (lng) => {
                return lng.split("-")[0];
              },
              excludeCacheFor: ["cimode"],
              lookupLocalStorage: LOCAL_STORAGE_KEY,
              order: ["localStorage", "navigator", "htmlTag"],
            },
            fallbackLng: DEFAULT_LANGUAGE,
            interpolation: {
              escapeValue: false,
            },
            load: "languageOnly",
            ns: SUPPORTED_NAMESPACES,
            react: {
              useSuspense: true,
            },
            showSupportNotice: false,
            supportedLngs: SUPPORTED_LNGS,
          });
      }
    };
    initializeLanguage().then(() => {
      document.documentElement.lang = i18n.language;
      setIsReady(true);
    });
  }, []);

  useEffect(() => {
    const handleStorageChange = async (event: StorageEvent) => {
      if (event.key === LOCAL_STORAGE_SYNC_KEY && event.newValue) {
        const detectedLng = localStorage.getItem(
          LOCAL_STORAGE_KEY,
        ) as SupportedLanguages;
        if (
          detectedLng &&
          detectedLng !== i18n.language &&
          SUPPORTED_LNGS.includes(detectedLng)
        ) {
          i18n.changeLanguage(detectedLng).then(() => {
            document.documentElement.lang = detectedLng;
          });
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return {
    i18n,
    isReady,
  };
}
