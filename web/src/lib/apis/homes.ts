
import qs from "qs";
import {IStrapiResponse} from "@/lib/apis/types";

const featuredHomesQuery = qs.stringify(
    {
        filters: {
            featured: {
                $eq: true,
            },
        },
        fields: ["name", "address", "slug"],
        populate: {
            thumbnails: {
                fields: ["url", "width", "height", "alternativeText"],
            }
        },
        pagination: {
            limit: 3,
        },
    },
    {
        encodeValuesOnly: true,
    }
);


export interface IFeaturedHomesResponse {
    id: number;
    documentId: string;
    name: string;
    address: string;
    slug: string;
    thumbnails: {
        id: number;
        documentId: string;
        alternativeText: string;
        url: string;
        width: number;
        height: number;
    }[];
}



export async function fetchFeaturedHomes(): Promise<IStrapiResponse<IFeaturedHomesResponse[]>> {
    const res = await fetch(`${process.env.STRAPI_URL}/api/homes?${featuredHomesQuery}`,
        {
            next: {
                revalidate: 100,
            }
        }
    );

    return res.json();
}


export async function fetchHomes() {
    const res = await fetch(`${process.env.STRAPI_URL}/api/homes?populate=*`,
        {
            next: {
                revalidate: 100,
            }
        }
    );

    return res.json();
}