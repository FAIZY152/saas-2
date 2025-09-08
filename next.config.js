/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@/components', '@/lib'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
}

module.exports = nextConfig