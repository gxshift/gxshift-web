/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tambahkan baris ini agar Cloudflare tidak bingung dengan environment Node.js
  experimental: {
    serverComponentsExternalPackages: ['@supabase/ssr'],
  }
};
module.exports = nextConfig;