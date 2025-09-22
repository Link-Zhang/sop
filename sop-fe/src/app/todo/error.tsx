"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import type { TodoErrorProps } from "@/app/lib/types";

export default function TodoError({ error }: TodoErrorProps) {
  const { t } = useTranslation("todo");

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
