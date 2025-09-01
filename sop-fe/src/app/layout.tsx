import type { Metadata } from "next";
import "@/app/globals.css";
import type React from "react";
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
  return (
    <html lang="en">
      <body className={"antialiased min-h-screen flex flex-col"}>
        <header className="border-b border-gray-300 ">
          <div className="container mx-auto p-4 flex justify-between items-center">
            <div className="text-xl font-bold">SOP-FE</div>
            <nav className="flex items-center space-x-8">
              <HoverPrefetchLink href="/">Home</HoverPrefetchLink>
              <HoverPrefetchLink href="/todo">Todo</HoverPrefetchLink>
            </nav>
          </div>
        </header>
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
          {children}
        </main>
        <footer className="container mx-auto p-4 text-center text-gray-600">
          <div> Copyright © {new Date().getFullYear()} Link-Zhang</div>
        </footer>
      </body>
    </html>
  );
}
