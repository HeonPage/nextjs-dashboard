/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    forceSwcTransforms: true,
  },
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'avatar.vercel.sh',
      'post-phinf.pstatic.net',
      'postfiles.pstatic.net',
      'imgnews.pstatic.net',
      'mblogthumb-phinf.pstatic.net',
      'ssl.pstatic.net',
      's.pstatic.net',
      'pstatic.net',
      's3.ap-northeast-2.amazonaws.com',
      'www.seiyon.net',
      'image.seiyon.net',
      'static.seiyon.net',
      'www.gravatar.com',
      'd1fdloi71mui9q.cloudfront.net',
      'i.imgur.com',
      'i.ytimg.com',
    ],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    minimumCacheTTL: 60,
  },
  // env: {
  //   BACKEND_BASE_URL: process.env.BACKEND_BASE_URL,
  //   FRONTEND_BASE_URL: process.env.FRONTEND_BASE_URL,
  // },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: process.env.BACKEND_API_URL + '/api/:path*',
  //     },
  //   ]
  // },
}

module.exports = nextConfig
