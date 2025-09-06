import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
        port: "",
      },
    ],
  },
  eslint: {
    // Позволяет завершать сборку при ошибках линтера (например, no-unused-vars)
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
