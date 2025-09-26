import localFont from "next/font/local";

export const Jetbrains_Mono = localFont({
  src: [
    {
      path: "../assets/fonts/JetBrainsMonoNLNerdFontMono-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../assets/fonts/JetBrainsMonoNLNerdFontMono-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/JetBrainsMonoNLNerdFontMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/JetBrainsMonoNLNerdFontMono-Italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-jetbrains-mono",
  display: "swap",
});
