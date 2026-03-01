import qs from "qs";
import {IStrapiResponse} from "@/types/types";
import type {BlocksContent} from "@strapi/blocks-react-renderer";


export interface IEventsResponse {
    id: number;
    documentId: string;
    title: string;
    body: BlocksContent;
    phone?: string;
    email?: string;
    date: {
        start_date: string;
        end_date?: string;

        start_time?: string;
        end_time?: string;
    };
    address?: string;
    expires_at?: string;
    cover?: {
        url: string;
        width: number;
        height: number;
        alternativeText: string;
    };
    home?: {
        name: string;
        slug: string;
        type: 'care-home' | 'supported-home';
    }
}

const eventsFilters = {
    fields: ['id', 'documentId', 'title', 'body', 'phone', 'email', 'address', 'expires_at'],
    pagination: {
        limit: 100,
    },
    populate: {
        date: {
            populate: '*'
        },
        home: {
            fields: ['name', 'slug', 'type'],
        },
        cover: {
            fields: ["url", "width", "height", "alternativeText"],
        }
    },
    sort: ["expires_at:asc"],
}

const eventsQuery = qs.stringify(eventsFilters, {
    encodeValuesOnly: true,
});

export async function getLatestEvents(): Promise<IStrapiResponse<IEventsResponse[]>> {
    const res = await fetch(`${process.env.STRAPI_URL}/api/events?${eventsQuery}`, {
        next: {
            revalidate: 600,
            tags: ['events']
        }
    });

    return res.json();
}