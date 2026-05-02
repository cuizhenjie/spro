const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Suppress cross-origin warning in dev
  allowedDevOrigins: ['spro.3cool.cc', 'localhost'],
  outputFileTracingRoot: path.join(__dirname),
  devIndicators: false,
}

module.exports = nextConfig
