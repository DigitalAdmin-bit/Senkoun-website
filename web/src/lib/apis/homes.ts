import qs from "qs";
import {IStrapiResponse} from "@/lib/apis/types";

export interface IFeaturedHomesShortResponse {
    id: number;
    documentId: string;
    name: string;
    address: string;
    slug: string;
    description?: string;
    thumbnails: {
        id: number;
        documentId: string;
        alternativeText: string;
        url: string;
        width: number;
        height: number;
    }[];
}

/**
 * Fetch homes from cms (but doesn't include all details)
 */
export async function fetchHomes_SHORT(data: {
    featuredOnly?: boolean;
    type?: string;
    description?: boolean;
    limit?: number;
}): Promise<IStrapiResponse<IFeaturedHomesShortResponse[]>> {
    const filters: any = {
        filters: {
            featured: {
                $eq: true,
            },
        },
        fields: ["name", "address", "slug"],
        populate: {
            thumbnails: {
                fields: ["url", "width", "height", "alternativeText"],
            },
        },
        pagination: {
            limit: data?.limit || 3,
        },
    };

    if(data.type) {
        if (data.type === "supported-living") {
            data.type = "supported-home"
        }
        filters.filters.type = {$eq: data.type};
    }

    if (data?.description) {
        filters.fields.push("description");
    }

    if (!data?.featuredOnly) {
        // @ts-ignore
        filters.filters = undefined;
    }

    const featuredHomesQuery = qs.stringify(filters, {
        encodeValuesOnly: true,
    });

    const res = await fetch(
        `${process.env.STRAPI_URL}/api/homes?${featuredHomesQuery}`,
        {
            next: {
                revalidate: 100,
            },
        },
    );

    return res.json();
}

export interface IHomeBySlugResponse {
    id: number;
    documentId: string;
    name: string;
    phone: string;
    email: string;
    address: string;
    facebook?: string;
    tagline: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    slug: string;
    featured: boolean;
    type: "supported-home" | "care-home";
    carehome_review?: {
        id: number;
        rating: number;
        review_link: string;
    };
    cqc_rating?: {
        id: number;
        rating: string;
        report_link: string;
    };
    video?: {
        id: number;
        documentId: string;
        url: string;
        width: number | null;
        height: number | null;
        alternativeText: string | null;
    };
    location: {
        lat: number;
        log: number;
        description: string;
    };
    why_choose_us: {
        title: string;
        description: string;
    }[];
    what_we_offer: {
        id: number;
        title: string;
        description: string;
        accordions: {
            id: number;
            title: string;
            description: string;
        }[];
    };
    facilities: {
        id: number;
        wheelchair_access: boolean;
        close_to_local_shops: boolean;
        near_public_transport: boolean;
        lift: boolean;
        residents_kitchenette: boolean;
        pet_friendly: boolean;
        gardens: boolean;
        private_hair_salon: boolean;
        on_site_parking: boolean;
        cafe: boolean;
        television_point_in_own_room: boolean;
        wifi: boolean;
        description: string;
    };
    reviews: {
        id: number;
        content: string;
        by: string;
        rating: number;
    }[];
    teams: {
        id: number;
        name: string;
        role: string;
        description: string;
        image?: {
            id: number;
            documentId: string;
            url: string;
            width: number | null;
            height: number | null;
            alternativeText: string | null;
        };
    }[];
    spaces: {
        id: number;
        name: string;
        description: string;
        images: {
            id: number;
            documentId: string;
            url: string;
            width: number;
            height: number;
            alternativeText: string;
        }[];
    }[];
    cover: {
        id: number;
        documentId: string;
        url: string;
        width: number;
        height: number;
        alternativeText: string | null;
    };
    brochure: {
        id: number;
        documentId: string;
        url: string;
    };
}

export async function fetchHomeBySlug(
    slug: string,
): Promise<IStrapiResponse<IHomeBySlugResponse[]>> {
    const filters = {
        filters: {
            slug: {
                $eq: slug,
            },
        },
        populate: {
            carehome_review: "*",
            cqc_rating: "*",
            video: {
                fields: ["url", "width", "height", "alternativeText"],
            },
            location: "*",
            why_choose_us: "*",
            what_we_offer: {
                populate: "*",
            },
            facilities: "*",
            reviews: "*",
            teams: {
                populate: {
                    image: {
                        fields: ["url", "width", "height", "alternativeText"],
                    },
                },
            },
            spaces: {
                populate: {
                    images: {
                        fields: ["url", "width", "height", "alternativeText"],
                    },
                },
            },

            cover: {
                fields: ["url", "width", "height", "alternativeText"],
            },
            brochure: {
                fields: ["url"],
            },
        },
    };

    const homeBySlugQuery = qs.stringify(filters, {
        encodeValuesOnly: true,
    });

    const res = await fetch(
        `${process.env.STRAPI_URL}/api/homes?${homeBySlugQuery}`,
        {
            next: {
                revalidate: 100,
            },
        },
    );

    return res.json();
}

export async function getHomesWithOnlyName(): Promise<
    IStrapiResponse<{ id: number; name: string; slug: string; documentId: string }[]>
> {
    const filters = {
        fields: ["name", "slug", "documentId"],
        pagination: {
            limit: 100,
        },
    };

    const homesQuery = qs.stringify(filters, {
        encodeValuesOnly: true,
    });

    const res = await fetch(`${process.env.STRAPI_URL}/api/homes?${homesQuery}`, {
        next: {
            revalidate: 600,
        },
    });

    return res.json();
}
