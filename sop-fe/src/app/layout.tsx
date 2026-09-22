import "@/app/globals.css";

import { cn } from "cn";
import type { ReactNode } from "react";
import ThemeProvider from "@/app/components/ThemeProvider";
import { JETBRAINS_MONO } from "@/app/lib/configs";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      className={cn("antialiased", "font-mono", JETBRAINS_MONO.variable)}
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
