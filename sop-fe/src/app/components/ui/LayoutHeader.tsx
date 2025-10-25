import HoverPrefetchLink from "@/app/components/ui/HoverPrefetchLink";
import LanguageSwitcher from "@/app/components/ui/LanguageSwitcher";
import ModeSwitcher from "@/app/components/ui/ModeSwitcher";

export default function LayoutHeader() {
  return (
    <header className="bg-on-primary dark:bg-on-primary flex items-center justify-between px-4 py-3 sticky top-0">
      <nav className="space-x-4 text-xl">
        <HoverPrefetchLink href="/">home</HoverPrefetchLink>
        <HoverPrefetchLink href="/second">second</HoverPrefetchLink>
        <HoverPrefetchLink href="/test">test</HoverPrefetchLink>
        <HoverPrefetchLink href="/todo">todo</HoverPrefetchLink>
      </nav>
      <nav className="space-x-4 text-xl">
        <ModeSwitcher />
        <LanguageSwitcher />
      </nav>
    </header>
  );
}
