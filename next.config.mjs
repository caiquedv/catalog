// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/catalog",
  output: "export",
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
  reactStrictMode: true,
  images: {
    domains: ['store.storeimages.cdn-apple.com'],
  }
};

export default nextConfig;
