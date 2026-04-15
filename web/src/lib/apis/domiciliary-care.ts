import qs from "qs";

export interface IDomiciliaryCare {
    tagline: string;
    description: string;
    what_we_offer: {
        title: string;
        description: string;
        accordions: {
            title: string;
            description: string;
        }[]
    };
    how_it_works: {
        description: string;
        cover_image: {
            url: string;
            alternativeText: string | null;
        }
    };
    reviews: {
        content: string;
        by: string;
        rating: number;
    }[];
    supports: {
        title: string;
        description: string;
        cards: {
            title: string;
            description: string;
        }[]
    };
    cover: {
        url: string;
        alternativeText: string | null;
    }
}

const filter = {
    populate: {
        what_we_offer: {
            populate: "*",
        },
        how_it_works: {
            populate: {
                cover_image: {
                    fields: ['url', 'alternativeText'],
                },
            }
        },
        reviews: '*',
        supports: {
            fields: ['title', 'description'],
            populate: "*",
        },
        cover: {
            fields: ['url', 'alternativeText'],
        }
    }
};

const query = qs.stringify(filter, {
    encodeValuesOnly: true,
});


export async function getDomiciliaryCare(): Promise<IDomiciliaryCare | null> {
    "use server";
    try {
        const res = await fetch(`${process.env.STRAPI_URL}/api/domiciliary-care?${query}`, {
            next: {
                tags: ["domiciliary-care"],
            }
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data.data ?? null;
    } catch {
        return null;
    }
}