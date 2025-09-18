"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import type { TodoErrorProps } from "@/app/_libs/todo.types";

export default function TodoError({ error }: TodoErrorProps) {
  const t = useTranslations("todo-error");
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (error && !hasShownToast.current) {
      toast.error(error.message || t("text"));
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
