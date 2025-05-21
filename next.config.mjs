/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASEPATH,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
        locale: false
      }
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**'
      },
      {
        protocol: 'https',
        hostname: 'probashi-bangla-backend.onrender.com'
      },
      {
        protocol: 'http',
        hostname: 'www.w3.org'
      }
    ]
  }
}

export default nextConfig
