/** @type {import('next').NextConfig} */
const nextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       source: '/:path*',
  //       destination: `${process.env.NEXT_PUBLIC_UTRIP_API_BASE_URL}/:path*`,
  //     },
  //   ];
  // },
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
