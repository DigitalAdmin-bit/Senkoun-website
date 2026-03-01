import {IStrapiResponse} from "@/types/types";
import qs from "qs";
import type {BlocksContent} from "@strapi/blocks-react-renderer";

export interface INewsResponse {
    id: number;
    documentId: string;
    title: string;
    date: string;
    body: BlocksContent;
    slug: string;
    author?: {
        name: string;
        title: string;
    };
}


/**
 * Fetch the latest news articles from Strapi, with an optional (by default 3) limit on the number of articles returned.
 * @param data
 */
export async function getLatestNews(data?: {
    limit?: number;
}): Promise<IStrapiResponse<INewsResponse[]>> {
    const filters = {
        pagination: {
            limit: data?.limit || 3,
        },
    };

    const query = qs.stringify(filters, {
        encodeValuesOnly: true,
    });

    const res = await fetch(`${process.env.STRAPI_URL}/api/news-articles?${query}`, {
        next: {
            revalidate: 600,
            tags: ['news']
        }
    });

    return res.json();
}

const newsFilters = {
    pagination: {
        limit: 100,
    },
    sort: ["date:desc"],
}

const newsQuery = qs.stringify(newsFilters, {
    encodeValuesOnly: true,
});

export async function getNews(): Promise<IStrapiResponse<INewsResponse[]>> {
    const res = await fetch(`${process.env.STRAPI_URL}/api/news-articles?${newsQuery}`, {
        next: {
            revalidate: 600,
            tags: ['news']
        }
    });

    return res.json();
}

export async function getNewsBySlug(slug: string): Promise<IStrapiResponse<INewsResponse[]>> {
    const filters = {
        populate: ["author"],
        filters: {
            slug: slug,
        },
    };

    const query = qs.stringify(filters, {
        encodeValuesOnly: true,
    });

    const res = await fetch(`${process.env.STRAPI_URL}/api/news-articles?${query}`, {
        next: {
            revalidate: 600,
            tags: ['news']
        }
    });

    return res.json();
}