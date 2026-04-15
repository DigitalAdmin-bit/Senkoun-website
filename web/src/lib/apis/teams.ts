import qs from "qs";
import {IStrapiResponse} from "@/types/types";


export interface ITeamsBySlugResponse {
    documentId: string,
    description: string,
    home: {
        name: string,
    },
    teams: {
        name: string,
        role: string,
        description: string,
        image: {
            url: string,
            alternativeText: string,
        }
    }[]
}

export async function getTeamsForHomeBySlug(slug: string): Promise<IStrapiResponse<ITeamsBySlugResponse>> {
    const teamsFilter = {
        filters: {
            home: {
                slug: {
                    $eq: slug,
                }
            }
        },
        populate: {
            home: {
                fields: ["name"],
            },
            teams: {
                fields: ["name", "role", "description"],
                populate: {
                    image: {
                        fields: ["url", "alternativeText"],
                    },
                },
            },
        },
        fields: ["documentId", "description"],
    }

    const teamsQuery = qs.stringify(teamsFilter, {
        encodeValuesOnly: true,
    });

    const res = await fetch(`${process.env.STRAPI_URL}/api/teams?${teamsQuery}`, {
        next: {
            tags: ['teams']
        }
    });
    const data = await res.json();

    if (data.data) {
        return {
            data: data.data[0],
            meta: data.meta,
        }
    }

    return data
}