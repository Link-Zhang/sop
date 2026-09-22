"use client";

import { Toaster, type ToasterProps } from "sonner";
import useTheme from "@/app/hooks/useTheme";

export default function ToasterWrapper() {
  const { theme } = useTheme();

  return (
    <Toaster
      closeButton
      position="bottom-right"
      richColors
      theme={theme as ToasterProps["theme"]}
    />
  );
}
