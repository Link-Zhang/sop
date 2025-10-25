"use client";

import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
import { useEffect, useState } from "react";
import { initReactI18next } from "react-i18next";
import {
  DEFAULT_LANGUAGE,
  LOCAL_STORAGE_KEY,
  SUPPORTED_LNGS,
  SUPPORTED_NAMESPACES,
  type SupportedLanguages,
  type SupportedNamespaces,
} from "@/app/lib/i18n/i18n";

const SYNC_KEY = `${LOCAL_STORAGE_KEY}Sync`;

export default function useLanguage() {
  const [currentLanguage, setCurrentLanguage] =
    useState<SupportedLanguages>(DEFAULT_LANGUAGE);
  const [isReady, setIsReady] = useState(false);

  const changeLanguage = async (lng: SupportedLanguages) => {
    await i18n.changeLanguage(lng);
    document.documentElement.lang = lng;
    setCurrentLanguage(lng);
    localStorage.setItem(SYNC_KEY, Date.now().toString());
  };

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
            supportedLngs: SUPPORTED_LNGS,
          });
      }
    };
    initializeLanguage().then(() => {
      document.documentElement.lang = i18n.language;
      setCurrentLanguage(i18n.language as SupportedLanguages);
      setIsReady(true);
    });
  }, []);

  useEffect(() => {
    const handleStorageChange = async (event: StorageEvent) => {
      if (event.key === SYNC_KEY && event.newValue) {
        const detectedLng = localStorage.getItem(
          LOCAL_STORAGE_KEY,
        ) as SupportedLanguages;
        if (
          detectedLng &&
          detectedLng !== currentLanguage &&
          SUPPORTED_LNGS.includes(detectedLng)
        ) {
          await i18n.changeLanguage(detectedLng);
          document.documentElement.lang = detectedLng;
          setCurrentLanguage(detectedLng);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [currentLanguage]);

  return {
    changeLanguage,
    currentLanguage,
    i18n,
    isReady,
  };
}
