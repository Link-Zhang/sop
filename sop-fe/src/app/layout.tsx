import "@/app/globals.css";
import { clsx } from "clsx";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import I18nextProviderWrapper from "@/app/components/ui/I18nextProviderWrapper";
import LayoutHeader from "@/app/components/ui/LayoutHeader";
import ToasterWrapper from "@/app/components/ui/ToasterWrapper";
import { Jetbrains_Mono } from "@/app/fonts";
import { DEFAULT_LANGUAGE } from "@/app/lib/i18n/i18n";
import { getCurrentYear } from "@/app/lib/utils";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang={DEFAULT_LANGUAGE} suppressHydrationWarning>
      <body
        className={clsx(
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
            <LayoutHeader />
            <main className="flex-grow px-4 py-3">{children}</main>
            <footer className="px-4 py-3 text-center text-sm">
              CopyRight © {getCurrentYear()} Link-Zhang
            </footer>
            <ToasterWrapper />
          </I18nextProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
