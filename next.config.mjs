/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'https://utriptest.shop/:path*',
      },
    ];
  },
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
