import type { Metadata } from "next";
import "@/app/globals.css";
import { NextIntlClientProvider, useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { HoverPrefetchLink } from "@/app/_components/HoverPrefetchLink";
import { getCurrentYear } from "@/app/_libs/date.utils";
import { Jetbrains_Mono } from "@/app/fonts";

export const metadata: Metadata = {
  title: "SOP",
  description: "Swift Omega Prototype Front End",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const t = useTranslations("layout");

  return (
    <html lang="zh-CN" className={Jetbrains_Mono.variable}>
      <body className="antialiased flex flex-col min-h-screen">
        <NextIntlClientProvider>
          <Toaster position="bottom-right" reverseOrder={false} />
          <header className="bg-on-primary dark:bg-on-primary flex items-center justify-between px-4 py-3 sticky top-0">
            <nav className="space-x-4 text-xl">
              <HoverPrefetchLink href="/">
                {t("nav-texts.home")}
              </HoverPrefetchLink>
              <HoverPrefetchLink href="/todo">
                {t("nav-texts.todo")}
              </HoverPrefetchLink>
            </nav>
          </header>
          <main className="flex-grow px-4 py-3 ">{children}</main>
          <footer className="px-4 py-3 text-center text-sm">
            {t("footer-text")} © {getCurrentYear()} Link-Zhang
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
