import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 静的サイトとして出力する設定
  output: "export",

  // Next.jsの画像最適化はサーバーが必要なため、静的エクスポートでは無効にする
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
