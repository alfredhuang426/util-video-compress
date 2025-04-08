const withNextIntl = require('next-intl/plugin')();
const isDevelopment = process.env.NODE_ENV === 'development';

// 只在開發環境中加載 withHttps
const withHttps = isDevelopment ? require('next-https') : (config) => config;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
        ],
      },
    ];
  },
  experimental: {
    webpackBuildWorker: true,
  },
};

// 根據環境決定是否添加 HTTPS 配置
module.exports = withNextIntl(
  isDevelopment 
    ? withHttps({
        ...nextConfig,
        https: {
          key: './ee.com-key.pem',
          cert: './ee.com.pem',
        },
      })
    : nextConfig
); 