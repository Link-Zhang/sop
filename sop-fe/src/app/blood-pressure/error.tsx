"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export default function BloodPressureError({ error }: { error?: Error }) {
  const { t } = useTranslation("blood-pressure");

  // todo: fix it
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (error && !hasShownToast.current) {
      toast.error(t("error"));
      hasShownToast.current = true;
    }
    return () => {
      if (!error) {
        hasShownToast.current = false;
      }
    };
  }, [error, t]);

  return null;
}
