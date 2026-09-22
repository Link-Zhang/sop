import "@/app/globals.css";

import { cn } from "cn";
import type { ReactNode } from "react";
import LanguageProvider from "@/app/components/LanguageProvider";
import LayoutFooter from "@/app/components/LayoutFooter";
import LayoutHeader from "@/app/components/LayoutHeader";
import ThemeProvider from "@/app/components/ThemeProvider";
import { JETBRAINS_MONO } from "@/app/lib/configs";
import { LANGUAGE_DEFAULT_CODE } from "@/app/lib/utils";
import { TooltipProvider } from "@/shadcn/components/ui/tooltip";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      className={cn("antialiased font-mono", JETBRAINS_MONO.variable)}
      lang={LANGUAGE_DEFAULT_CODE}
      suppressHydrationWarning
    >
      <body className="bg-background flex flex-col min-h-dvh text-foreground">
        <ThemeProvider>
          <LanguageProvider>
            <TooltipProvider>
              <LayoutHeader />
              <main className="flex flex-1 flex-col min-h-0 px-4 py-3 w-full">
                {children}
              </main>
              <LayoutFooter />
            </TooltipProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
