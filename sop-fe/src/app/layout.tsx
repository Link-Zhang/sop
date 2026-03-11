import "@/app/globals.css";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import LayoutFooter from "@/app/components/LayoutFooter";
import LayoutHeader from "@/app/components/LayoutHeader";
import I18nextProviderWrapper from "@/app/components/wrapper/I18nextProviderWrapper";
import ToasterWrapper from "@/app/components/wrapper/ToasterWrapper";
import { Jetbrains_Mono } from "@/app/fonts";
import { DEFAULT_LANGUAGE } from "@/app/lib/i18n/i18n";
import { TooltipProvider } from "@/shadcn/components/ui/tooltip";
import { cn } from "@/shadcn/lib/utils";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang={DEFAULT_LANGUAGE} suppressHydrationWarning>
      <body
        className={cn(
          "antialiased flex flex-col min-h-screen",
          Jetbrains_Mono.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <I18nextProviderWrapper>
            <TooltipProvider>
              <LayoutHeader />
              <main className="flex-grow px-4 py-3">{children}</main>
              <LayoutFooter />
              <ToasterWrapper />
            </TooltipProvider>
          </I18nextProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
