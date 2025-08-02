import localFont from "next/font/local";

export const Jetbrains_Mono = localFont({
  display: "swap",
  src: [
    {
      // can't use @
      path: "./lib/fonts/JetBrainsMonoNLNerdFontMono-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      // can't use @
      path: "./lib/fonts/JetBrainsMonoNLNerdFontMono-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      // can't use @
      path: "./lib/fonts/JetBrainsMonoNLNerdFontMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      // can't use @
      path: "./lib/fonts/JetBrainsMonoNLNerdFontMono-Italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-jetbrains-mono",
});
