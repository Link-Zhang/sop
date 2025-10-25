import "@/app/globals.css";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import I18nextProviderWrapper from "@/app/components/ui/I18nextProviderWrapper";
import LayoutHeader from "@/app/components/ui/LayoutHeader";
import { Jetbrains_Mono } from "@/app/fonts";
import { DEFAULT_LANGUAGE } from "@/app/lib/i18n/i18n";
import { getCurrentYear } from "@/app/lib/utils";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang={DEFAULT_LANGUAGE} suppressHydrationWarning>
      <body
        className={`antialiased flex flex-col min-h-screen ${Jetbrains_Mono.variable}`}
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
            <Toaster position="bottom-right" reverseOrder={false} />
          </I18nextProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
