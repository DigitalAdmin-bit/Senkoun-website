import type { MetadataRoute } from "next";

function getBaseUrl(): string {
    const raw =
        process.env.NEXT_PUBLIC_SITE_URL ||
        process.env.SITE_URL ||
        "http://localhost:3000";

    return raw.endsWith("/") ? raw.slice(0, -1) : raw;
}

export default function robots(): MetadataRoute.Robots {
    const baseUrl = getBaseUrl();

    return {
        rules: [
            {
                userAgent: "*",
                allow: [
                    "/",
                    "/care-home",
                    "/care-home/*",
                    "/supported-living",
                    "/supported-living/*",
                    "/care-home/joseph-lodge-care-home",
                    "/care-home/joseph-nursing-and-care-home",
                    "/care-home/all",
                    "/supported-living/all",
                    "/careers",
                    "/news/*"
                ],
                disallow: ["/api/", "/enquire/success", "/careers/success", "/careers/openings/success"],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    };
}