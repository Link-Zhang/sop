"use client";

import type { i18n as I18nInstance } from "i18next";
import { I18N_KEY } from "@/app/lib/configs";
import type { Language } from "@/app/lib/types";
import { LANGUAGE_CODES } from "@/app/lib/utils";

let boundInstance: I18nInstance | null = null;
let teardown: (() => void) | null = null;

export default function setup(instance: I18nInstance): () => void {
  if (teardown) {
    if (boundInstance !== instance) {
      throw new Error();
    }
    return teardown;
  }
  if (!instance.isInitialized) throw new Error();
  const syncHtmlLang = () => {
    document.documentElement.lang =
      instance.resolvedLanguage ?? instance.language;
  };
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key !== I18N_KEY || !event.newValue) return;
    const detectedLng = event.newValue as Language;
    const currentLng = instance.resolvedLanguage ?? instance.language;
    if (detectedLng !== currentLng && LANGUAGE_CODES.includes(detectedLng)) {
      void instance.changeLanguage(detectedLng);
    }
  };
  syncHtmlLang();
  instance.on("languageChanged", syncHtmlLang);
  window.addEventListener("storage", handleStorageChange);
  boundInstance = instance;
  teardown = () => {
    instance.off("languageChanged", syncHtmlLang);
    window.removeEventListener("storage", handleStorageChange);
    boundInstance = null;
    teardown = null;
  };
  return teardown;
}
