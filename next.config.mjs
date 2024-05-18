import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */


export const  nextConfig = {
    reactStrictMode: true,
    images: {
        // unoptimized: true,
        domains: ['https://mykuttanadu.s3.us-west-1.amazonaws.com/']
    },
};

export default withNextVideo(nextConfig, { folder: 'public/videos' });
 