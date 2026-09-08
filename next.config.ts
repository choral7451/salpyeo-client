import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // 예시 이미지 (picsum.photos). 실제 CDN 도입 시 여기에 호스트를 추가하세요.
      { protocol: "https", hostname: "picsum.photos", pathname: "/seed/**" },
    ],
  },
};

export default nextConfig;
