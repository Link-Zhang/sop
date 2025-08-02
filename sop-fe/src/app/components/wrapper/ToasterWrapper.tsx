"use client";

import { useTheme } from "next-themes";
import { Toaster, type ToasterProps } from "sonner";

export default function ToasterWrapper() {
  const { resolvedTheme } = useTheme();

  return (
    <Toaster
      closeButton={true}
      duration={3000}
      position={"top-center"}
      richColors={true}
      theme={resolvedTheme as ToasterProps["theme"]}
    />
  );
}
