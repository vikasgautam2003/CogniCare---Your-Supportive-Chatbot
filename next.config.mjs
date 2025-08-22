/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add any Next.js configuration options you need here.
  // For example:
  // reactStrictMode: true,
  images: {
    domains: ["placehold.co"], // ✅ allow external placeholder images
  },
};

export default nextConfig;