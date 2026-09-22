import "@/app/globals.css";

import { cn } from "cn";
import type { ReactNode } from "react";
import ConfirmProvider from "@/app/components/ConfirmProvider";
import LanguageProvider from "@/app/components/LanguageProvider";
import LayoutFooter from "@/app/components/LayoutFooter";
import LayoutHeader from "@/app/components/LayoutHeader";
import QueryProvider from "@/app/components/QueryProvider";
import ThemeProvider from "@/app/components/ThemeProvider";
import ToasterWrapper from "@/app/components/ToasterWrapper";
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
      <body className="bg-background flex flex-col h-dvh overflow-hidden text-foreground">
        <ThemeProvider>
          <LanguageProvider>
            <QueryProvider>
              <TooltipProvider>
                <ConfirmProvider>
                  <LayoutHeader />
                  <main className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 py-3 w-full">
                    {children}
                  </main>
                  <LayoutFooter />
                  <ToasterWrapper />
                </ConfirmProvider>
              </TooltipProvider>
            </QueryProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
