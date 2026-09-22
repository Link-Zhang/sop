import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import Tabulator from "@/app/components/Tabulator";
import ThemeSwitcher from "@/app/components/ThemeSwitcher";

export default function LayoutHeader() {
  return (
    <header className="flex items-center justify-between px-4 py-3 sticky top-0 z-50">
      <Tabulator />
      <div className="flex items-center gap-2">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
    </header>
  );
}
