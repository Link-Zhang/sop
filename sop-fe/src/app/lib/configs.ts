import { Moon, Sun, SunMoon } from "lucide-react";
import { JetBrains_Mono } from "next/font/google";

// export const API_BLOOD_PRESSURE =
//   "https://linkzhang.duckdns.org:31540/blood-pressure-measurements" as const;
//
// export const API_TODO = "https://linkzhang.duckdns.org:31540/todos" as const;

export const I18N_KEY = "i18nextLng";

export const JETBRAINS_MONO = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const LANGUAGES = [
  { code: "en", nation: "us", native: "English" },
  { code: "zh", nation: "cn", native: "中文" },
] as const;

export const NAMESPACES = ["blood-pressure", "todo", "translation"] as const;

export const TABS = [
  { label: "app.tab.home", path: "/" },
  { label: "app.tab.bp", path: "/bp/" },
  { label: "app.tab.todo", path: "/todo/" },
] as const;

export const THEMES = [
  { icon: SunMoon, label: "app.theme.auto", mode: "system" },
  { icon: Moon, label: "app.theme.dark", mode: "dark" },
  { icon: Sun, label: "app.theme.light", mode: "light" },
] as const;
