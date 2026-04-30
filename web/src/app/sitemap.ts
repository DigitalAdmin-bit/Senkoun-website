import type { MetadataRoute } from "next";
import { getHomesWithOnlyName } from "@/lib/apis/homes";
import { getNews } from "@/lib/apis/news";

function getBaseUrl(): string {
    const raw =
        process.env.NEXT_PUBLIC_SITE_URL ||
        process.env.SITE_URL ||
        "http://localhost:3000";

    return raw.endsWith("/") ? raw.slice(0, -1) : raw;
}

function normalizePath(path: string): string {
    return path.startsWith("/") ? path : `/${path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = getBaseUrl();
    const now = new Date();

    const staticPaths = [
        "/",
        "/coming-soon",
        "/healthcare-agency",
        "/news",
        "/privacy-policy",
        "/cookies-policy",
        "/careers",
        "/careers/openings",
        "/business-consultation",
        "/enquire",
        "/terms-and-conditions",
        "/gallery",
        "/help",
        "/domiciliary-care",
        "/care-home",
        "/care-home/all",
        "/supported-living",
        "/supported-living/all",
    ];

    const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
        url: `${baseUrl}${normalizePath(path)}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: path === "/" ? 1 : 0.7,
    }));

    const [homesRes, newsRes] = await Promise.all([getHomesWithOnlyName(), getNews()]);

    const homeEntries: MetadataRoute.Sitemap = (homesRes.data || []).flatMap((home) => {
        const type = home.type === "supported-home" ? "supported-living" : home.type;
        const detailPath = `/${type}/${home.slug}`;

        return [
            {
                url: `${baseUrl}${detailPath}`,
                lastModified: now,
                changeFrequency: "weekly",
                priority: 0.8,
            },
            {
                url: `${baseUrl}${detailPath}/team`,
                lastModified: now,
                changeFrequency: "monthly",
                priority: 0.6,
            },
        ];
    });

    const newsEntries: MetadataRoute.Sitemap = (newsRes.data || []).map((article) => ({
        url: `${baseUrl}/news/${article.slug}`,
        lastModified: article.date ? new Date(article.date) : now,
        changeFrequency: "monthly",
        priority: 0.7,
    }));

    return [...staticEntries, ...homeEntries, ...newsEntries];
}