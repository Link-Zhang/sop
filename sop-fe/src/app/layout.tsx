import type { Metadata } from "next";
import "@/app/globals.css";
import { Toaster } from "react-hot-toast";
import { HoverPrefetchLink } from "@/app/_components/hover-prefetch-link";

export const metadata: Metadata = {
  title: "SOP - Swift Omega Prototype",
  description: "Swift Omega Prototype Front End",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="zh-CN">
      <body className="antialiased min-h-screen flex flex-col">
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            className: "font-medium",
          }}
        />

        <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="text-xl font-bold text-gray-800">SOP-FE</div>
            <nav className="flex items-center space-x-6">
              <HoverPrefetchLink href="/">首页</HoverPrefetchLink>
              <HoverPrefetchLink href="/todo">待办事项</HoverPrefetchLink>
            </nav>
          </div>
        </header>

        <main className="flex-grow">{children}</main>

        <footer className="border-t border-gray-200 bg-gray-50 py-4">
          <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
            Copyright © {currentYear} Link-Zhang
          </div>
        </footer>
      </body>
    </html>
  );
}
