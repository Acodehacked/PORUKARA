import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */


export const  nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: "https", // or http
          hostname: "mykuttanadu.s3.us-west-1.amazonaws.com",
          port:'',
          pathname:'/**'
        },
      ],
    }
};

export default withNextVideo(nextConfig, { folder: 'public/videos' });
 