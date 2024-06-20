/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/:path*/',
        destination: `http://13.125.37.5:8080/api/:path*/`,
      },
    ];
  },
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    domains: [
      'i.ytimg.com',
      'mud-kage.kakao.com',
      'yesan.theborn.co.kr',
      'tong.visitkorea.or.kr',
      'search.pstatic.net',
    ],
  },
};

export default nextConfig;
