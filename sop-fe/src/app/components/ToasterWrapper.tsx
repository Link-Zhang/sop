"use client";

import { Toaster, type ToasterProps } from "sonner";
import useTheme from "@/app/hooks/useTheme";

export default function ToasterWrapper() {
  const { theme } = useTheme();

  return (
    <Toaster
      closeButton
      position="top-center"
      richColors
      theme={theme as ToasterProps["theme"]}
    />
  );
}
