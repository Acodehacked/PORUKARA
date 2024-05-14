import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */


export const  nextConfig = {
    reactStrictMode: false,
    images: {
        unoptimized: true,
        domains: ['https://porukaracollege.in']
    },
};

export default withNextVideo(nextConfig, { folder: 'public/videos' });
 