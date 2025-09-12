import type { Metadata } from "next";
import "@/app/globals.css";
import { NextIntlClientProvider, useTranslations } from "next-intl";
import type React from "react";
import { Toaster } from "react-hot-toast";
import { HoverPrefetchLink } from "@/app/_components/hover-prefetch-link";

export const metadata: Metadata = {
  title: "SOP",
  description: "Swift Omega Prototype Front End",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentYear = new Date().getFullYear();
  const t = useTranslations("layout");

  return (
    <html data-theme="light" lang="zh-CN">
      <body className="antialiased flex flex-col min-h-screen dark:bg-black">
        <NextIntlClientProvider>
          <Toaster position="bottom-right" reverseOrder={false} />
          <header className="border-b flex items-center justify-between px-4 py-3 sticky top-0">
            <div className="font-bold text-xl">{t("header-text")}</div>
            <nav className="space-x-4">
              <HoverPrefetchLink href="/todo">
                {t("nav-texts.todo")}
              </HoverPrefetchLink>
              <HoverPrefetchLink href="/todos">
                {t("nav-texts.todos")}
              </HoverPrefetchLink>
            </nav>
          </header>
          <main className="flex-grow px-4 py-3 ">{children}</main>
          <footer className="px-4 py-3 text-center text-sm">
            {t("footer-text")} © {currentYear} Link-Zhang
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
