import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "localhost",
    "17521270049.kmdns.net",
    "54dada.com",
    "*.54dada.com",
    "linkzhang.com",
    "*.linkzhang.com",
    "10.0.0.254",
    "127.0.0.1",
    "192.168.0.254 ",
    "*",
  ],
  crossOrigin: "anonymous",
  images: {
    unoptimized: true,
  },
  output: "export",
  reactCompiler: true,
  trailingSlash: true,
};

export default nextConfig;
