import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["17521270049.kmdns.net", "*"],
  images: {
    unoptimized: true,
  },
  output: "export",
  trailingSlash: true,
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
