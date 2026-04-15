"use server";

import qs from "qs";


const galleryQuery = {
    filters: {
        caption: {
            $eq: 'gallery',
        }
    },
    fields: ['alternativeText', 'url', 'width', 'height'],
    pagination: {
        limit: 100,
    },
};

const galleryQueryStr = qs.stringify(galleryQuery, {
    encodeValuesOnly: true,
});

export async function getGalleryImages(): Promise<{
   width?: number,
   height?: number,
   url: string,
   alternativeText?: string | null,
}[]> {
    "use server";

    const res = await fetch(`${process.env.STRAPI_URL}/api/upload/files?${galleryQueryStr}`);
    return await res.json();
}
