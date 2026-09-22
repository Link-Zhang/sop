import LanguageSwitcher from "@/app/components/app/LanguageSwitcher";
import Tabulator from "@/app/components/app/Tabulator";
import ThemeSwitcher from "@/app/components/app/ThemeSwitcher";

export default function LayoutHeader() {
  return (
    <header className="flex items-center justify-between px-4 py-3 shrink-0 z-50">
      <Tabulator />
      <div className="flex items-center gap-3">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
    </header>
  );
}
