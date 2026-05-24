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

    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "Content-Security-Policy",
                        value: `
              default-src 'self';

              script-src 'self' 'unsafe-inline' 'unsafe-eval';

              style-src 'self' 'unsafe-inline';

              img-src 'self' data: blob: https://cms.senkoun.co.uk;

              font-src 'self' data:;

              connect-src 'self' https://cms.senkoun.co.uk;

              frame-ancestors 'none';

              base-uri 'self';

              form-action 'self';

              object-src 'none';

              upgrade-insecure-requests;
            `
                            .replace(/\s{2,}/g, " ")
                            .trim(),
                    },

                    {
                        key: "Referrer-Policy",
                        value: "strict-origin-when-cross-origin",
                    },

                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },

                    {
                        key: "Strict-Transport-Security",
                        value:
                            "max-age=31536000; includeSubDomains; preload",
                    },

                    {
                        key: "Cross-Origin-Resource-Policy",
                        value: "same-origin",
                    },
                ],
            },
        ];
    },
};


export default nextConfig;
