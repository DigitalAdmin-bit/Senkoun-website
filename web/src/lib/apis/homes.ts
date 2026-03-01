import qs from "qs";
import {IStrapiResponse} from "@/types/types";
import {HomeSlugResponse} from "@/types/home-slug-response";
import {FeaturedHomesShortResponse} from "@/types/featured-homes-short-response";

/**
 * Fetch homes from cms (but doesn't include all details)
 */
export async function fetchHomes_SHORT(data: {
    featuredOnly?: boolean;
    type?: string;
    description?: boolean;
    limit?: number;
}): Promise<IStrapiResponse<FeaturedHomesShortResponse[]>> {
    const filters: any = {
        filters: {},
        fields: ["name", "address", "slug", "phone"],
        populate: {
            thumbnails: {
                fields: ["url", "width", "height", "alternativeText"],
            },
        },
        pagination: {
            limit: data?.limit || 3,
        },
    };


    if (data.type) {
        const normalizedType = data.type === "supported-living"
            ? "supported-home"
            : data.type;

        filters.filters.type = {$eq: normalizedType};
    }

    if (data.type === "care-home") {
        filters.populate.cqc_rating = "*";
    }

    if (data?.description) {
        filters.fields.push("description");
    }

    if (data?.featuredOnly) {
        // @ts-ignore
        filters.filters.featured = {$eq: true};
    }

    const featuredHomesQuery = qs.stringify(filters, {
        encodeValuesOnly: true,
    });

    const res = await fetch(
        `${process.env.STRAPI_URL}/api/homes?${featuredHomesQuery}`,
        {
            next: {
                revalidate: 100,
                tags: ['homes']
            },

        },
    );

    return res.json();
}

export async function fetchHomeBySlug(
    slug: string,
): Promise<IStrapiResponse<HomeSlugResponse[]>> {
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
                tags: ['homes']
            },
        },
    );

    return res.json();
}

const homeNamesFilters = {
    fields: ["name", "slug", "documentId", "type"],
    pagination: {
        limit: 100,
    },
};

const homesQuery = qs.stringify(homeNamesFilters, {
    encodeValuesOnly: true,
});

export async function getHomesWithOnlyName(): Promise<
    IStrapiResponse<{
        id: number;
        name: string;
        slug: string;
        documentId: string;
        type: 'care-home' | 'supported-home'
    }[]>
> {

    const res = await fetch(`${process.env.STRAPI_URL}/api/homes?${homesQuery}`, {
        next: {
            revalidate: 600,
            tags: ['homes']
        },
    });

    return res.json();
}
