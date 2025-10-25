"use client";

import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import type { TodoErrorProps } from "@/app/lib/types";

export default function TodoError({ error }: TodoErrorProps) {
  const { t } = useTranslation("todo");
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (error && !hasShownToast.current) {
      toast.error(error.message || t("error"));
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
