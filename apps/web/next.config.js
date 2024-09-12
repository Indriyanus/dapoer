/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['localhost'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'w6fiv6w6vqb3bfam.public.blob.vercel-storage.com',
          port: '',
        },
      ],
    }
  }
  
  module.exports = nextConfig