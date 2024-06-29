/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
      domains: ['miro.medium.com'],
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'img.clerk.com',
            },
            {
              protocol: 'http',
              hostname: 'res.cloudinary.com',
            },
        ],
    }
};

export default nextConfig;
