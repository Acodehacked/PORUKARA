import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */


export const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https", // or http
        hostname: "mykuttanadu.s3.us-west-1.amazonaws.com",
        port: '',
        pathname: '/**'
      },
    ],
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,DELETE" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },

        ]
      }
    ]
  }
};

export default withNextVideo(nextConfig, { folder: 'public/videos' });
