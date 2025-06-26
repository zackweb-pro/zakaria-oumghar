/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/zakaria-oumghar/' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/zakaria-oumghar' : '',
};

export default nextConfig;
