import type {NextConfig} from "next";


const csp = `
  default-src 'self';

  script-src
    'self'
    'unsafe-inline'
    https://www.googletagmanager.com
    https://static.cloudflareinsights.com;

  style-src
    'self'
    'unsafe-inline';

  img-src
    'self'
    data:
    blob:
    https://cms.senkoun.co.uk;

  font-src
    'self'
    data:;

  connect-src
    'self'
    https://cms.senkoun.co.uk
    https://www.google-analytics.com;


  frame-src
    https://www.google.com
    https://maps.google.com;

  frame-ancestors 'none';

  base-uri 'self';

  form-action 'self';

  object-src 'none';

  upgrade-insecure-requests;
`
    .replace(/\s{2,}/g, " ")
    .trim();

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
    experimental: {
        serverActions: {
            bodySizeLimit: "3mb"
        }
    },

    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "Content-Security-Policy",
                        value: csp,
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
