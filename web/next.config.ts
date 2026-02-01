import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "1337",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "strapiapp.com",
                pathname: "/**",
            }
        ],
        dangerouslyAllowLocalIP: true,
    },
};

export default nextConfig;
