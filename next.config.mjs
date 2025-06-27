/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
    domains: ['images.unsplash.com'],
  },
  // Remove assetPrefix and basePath for Vercel deployment
  // These are only needed for GitHub Pages or subdirectory deployments
};

export default nextConfig;
