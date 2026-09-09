import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 시설 사진은 각 조리원 공식 홈페이지에서 직접 불러온다 (호스트가 수백 곳이라 목록화가 불가능).
    // 백엔드가 내려주는 URL 만 렌더링하며, 그 URL 은 수집 스크립트에서 공식 도메인·이미지 형식으로 검증한다.
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
};

export default nextConfig;
