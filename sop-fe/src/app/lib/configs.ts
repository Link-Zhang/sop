import { Moon, Sun, SunMoon } from "lucide-react";
import { JetBrains_Mono } from "next/font/google";

export const API_BP = "https://linkzhang.duckdns.org:31540/bp" as const;
// export const API_BP = "https://linkzhang.duckdns.org:31540/todos" as const;

export const API_TODO = "https://linkzhang.duckdns.org:31540/todo" as const;

export const COLUMN_VARIANTS = ["date", "range", "select", "text"] as const;

export const DATE_OPTIONS = {
  year: "2-digit",
  month: "2-digit",
  day: "2-digit",
} as const satisfies Intl.DateTimeFormatOptions;

export const I18N_KEY = "i18nextLng";

export const JETBRAINS_MONO = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const LANGUAGES = [
  { code: "en", locale: "en-US", nation: "us", native: "English" },
  { code: "zh", locale: "zh-CN", nation: "cn", native: "中文" },
] as const;

export const NS = ["crud", "table", "translation"] as const;

export const NAMESPACES = [...NS, "bp", "todo"] as const;

export const PAGE_SIZES = [3, 7, 14, 28];

export const SKELETON_NUMBER = 5;

export const TABS = [
  // { label: "app.tab.home", path: "/" },
  { label: "app.tab.bp", path: "/bp/" },
  { label: "app.tab.todo", path: "/todo/" },
] as const;

export const THEMES = [
  { icon: SunMoon, label: "app.theme.auto", mode: "system" },
  { icon: Moon, label: "app.theme.dark", mode: "dark" },
  { icon: Sun, label: "app.theme.light", mode: "light" },
] as const;
