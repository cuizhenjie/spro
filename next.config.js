/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Disable problematic RSC devtools bundler
    unstable_experimental_layoutFragments: false,
  },
  // Suppress cross-origin warning in dev
  allowedDevOrigins: ['spro.3cool.cc', 'localhost'],
}

module.exports = nextConfig
