import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Google Ads sitelink used civil-service-fast-stream; actual slug is civil-service
      {
        source: "/packs/civil-service-fast-stream",
        destination: "/packs/civil-service",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
