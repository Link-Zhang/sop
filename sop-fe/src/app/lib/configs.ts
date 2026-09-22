import { Moon, Sun, SunMoon } from "lucide-react";
import { JetBrains_Mono } from "next/font/google";

// export const API_BLOOD_PRESSURE =
//   "https://linkzhang.duckdns.org:31540/blood-pressure-measurements" as const;
//
// export const API_TODO = "https://linkzhang.duckdns.org:31540/todos" as const;

export const JETBRAINS_MONO = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const THEMES = [
  { icon: SunMoon, label: "Auto", mode: "system" },
  { icon: Moon, label: "Dark", mode: "dark" },
  { icon: Sun, label: "Light", mode: "light" },
] as const;
