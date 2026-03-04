import qs from "qs";
import {IStrapiResponse} from "@/types/types";


const temp = {
    "data": [{
        "id": 2,
        "documentId": "c2dpa6pl8bx8fndqbagmdvcl",
        "description": "At Joseph Lodge, care comes from the heart and we never compromise our high standards. When selecting colleagues to join our dedicated, multi-disciplinary team, the requisite expertise, sincerity, and empathy are a must.",
        "createdAt": "2026-03-04T15:09:38.063Z",
        "updatedAt": "2026-03-04T15:09:38.063Z",
        "publishedAt": "2026-03-04T15:09:38.074Z",
        "home": {
            "id": 14,
            "documentId": "rrxl8t7rdwds0dp9wtv72bhl",
            "name": "Joseph Nursing and Care Home",
            "phone": "6282948354",
            "email": "joseph@senkun.com",
            "address": "Panacakal Purackal, Punnapra PO Alappuzha",
            "facebook": "https://facebook.com",
            "tagline": "EXPERIENCE EXCEPTIONAL CARE, EVERY DAY",
            "description": "Joseph Lodge is a warm and welcoming care home for older adults, offering high-quality personal care to people with age-related needs, including those living with dementia. Set in a beautiful rural location just beyond the outskirts of Southend, the home benefits from excellent transport links. It is only a short taxi ride from Shoeburyness train station, and a local bus route stops directly outside the building.\n\nThe home features 39 bedrooms spread across the ground and first floors, including several larger rooms, two of which are ideal for couples. A lift provides easy access to the first floor, and every bedroom includes its own ensuite facilities for comfort and privacy. ",
            "createdAt": "2026-01-29T06:10:11.832Z",
            "updatedAt": "2026-02-01T08:13:31.622Z",
            "publishedAt": "2026-02-01T08:13:31.666Z",
            "slug": "joseph-nursing-and-care-home",
            "featured": true,
            "type": "care-home"
        },
        "teams": [{
            "id": 3,
            "name": "Mujgan Van Litsenborg",
            "role": "HOME MANAGER",
            "description": "At Joseph Lodge, care comes from the heart and we never compromise our high standards. When selecting colleagues to join our dedicated, multi-disciplinary team, the requisite expertise, sincerity, and empathy are a must."
        }, {
            "id": 4,
            "name": "Donna Newhouse",
            "role": "DEPUTY MANAGER",
            "description": "At Joseph Lodge, care comes from the heart and we never compromise our high standards. When selecting colleagues to join our dedicated, multi-disciplinary team, the requisite expertise, sincerity, and empathy are a must."
        }]
    }], "meta": {"pagination": {"page": 1, "pageSize": 25, "pageCount": 1, "total": 1}}
}

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


    console.log("Query: ", teamsQuery);

    const res = await fetch(`${process.env.STRAPI_URL}/api/teams?${teamsQuery}`);
    const data = await res.json();

    if (data.data) {
        return {
            data: data.data[0],
            meta: data.meta,
        }
    }

    return data
}