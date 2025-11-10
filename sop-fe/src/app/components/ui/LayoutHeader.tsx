"use client";

import AppearanceSwitcher from "@/app/components/ui/AppearanceSwitcher";
import LanguageSwitcher from "@/app/components/ui/LanguageSwitcher";
import NavLink from "@/app/components/ui/NavLink";

export default function LayoutHeader() {
  return (
    <header className="bg-on-primary dark:bg-on-primary flex items-center justify-between px-4 py-3 sticky top-0 z-50">
      <nav className="space-x-4 text-xl">
        <NavLink href="/">home</NavLink>
        <NavLink href="/todo">todo</NavLink>
      </nav>
      <nav className="space-x-4 text-xl">
        <AppearanceSwitcher />
        <LanguageSwitcher />
      </nav>
    </header>
  );
}
