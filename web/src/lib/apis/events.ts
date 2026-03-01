import qs from "qs";
import {IStrapiResponse} from "@/types/types";


export interface INewsResponse {
    id: number;
    documentId: string;
}

export async function getLatestEvents(data?: {
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

    const res = await fetch(`${process.env.STRAPI_URL}/api/events?${query}`, {
        next: {
            revalidate: 600,
            tags: ['events']
        }
    });

    console.log("Fetched events with query:", res, "Response status:", res.status);

    return res.json();
}