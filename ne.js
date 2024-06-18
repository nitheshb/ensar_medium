// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
  
    // Define environment variables that need to be exposed to the client-side
    env: {
      API_URL: process.env.API_URL,
      NEXT_PUBLIC_ANALYTICS_ID: process.env.NEXT_PUBLIC_ANALYTICS_ID,
    },
  
    // Headers configuration for security and performance optimizations
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Frame-Options',
              value: 'SAMEORIGIN',
            },
            {
              key: 'Content-Security-Policy',
              value: 'default-src https:',
            },
          ],
        },
      ];
    },
  
    // Image optimization configuration
    images: {
      domains: ['example.com'], // Specify domains for optimized image loading
      deviceSizes: [320, 640, 768, 1024, 1280], // Specify device sizes for responsive images
    },
  
    // Rewrites and redirects configuration
    async redirects() {
      return [
        {
          source: '/old-route',
          destination: '/new-route',
          permanent: true,
        },
      ];
    },
  
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://api.example.com/:path*', // Proxy API requests
        },
      ];
    },
  
    // Optimize webpack configuration if needed
    webpack: (config, { isServer }) => {
      // Example: Add a custom alias for paths
      // config.resolve.alias = {
      //   ...config.resolve.alias,
      //   '@components': path.resolve(__dirname, 'src/components'),
      // };
  
      // Example: Use additional loaders or plugins
      // config.module.rules.push({
      //   test: /\.svg$/,
      //   use: ['@svgr/webpack'],
      // });
  
      return config;
    },
  };
  
  module.exports = nextConfig;
  