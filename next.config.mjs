import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */


export const  nextConfig = {
    reactStrictMode: true,
    remotePatterns: [
        {
          protocol: "https", // or http
          hostname: "mykuttanadu.s3.us-west-1.amazonaws.com", // if your website has no www, drop it
        },
      ],
};

export default withNextVideo(nextConfig, { folder: 'public/videos' });
 