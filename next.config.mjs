/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**'
      }
    ],
    minimumCacheTTL: 60,

    // 👇 Important for static export
    unoptimized: true
  },

  reactStrictMode: true,

  // ✅ Enable static export
  output: 'export'
}

export default nextConfig
