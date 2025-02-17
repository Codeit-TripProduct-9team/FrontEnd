/** @type {import('next').NextConfig} */
const nextConfig = {
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
