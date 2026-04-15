import {BlocksContent} from "@strapi/blocks-react-renderer";

interface ILegalOut {
    id: string;
    content: BlocksContent
}

type TLegalOut = Promise<ILegalOut | null>

export async function getTermsAndConditions(): TLegalOut {
    const response = await fetch(`${process.env.STRAPI_URL}/api/terms-and-condition`, {
        next: {
            revalidate: 60 * 60 * 24, // Revalidate once a day
            tags: ['legal']
        }
    });


    if (!response.ok) {
        return null;
    }

    const data = await response.json();

    return data.data;
}

export async function getPrivacyPolicy(): TLegalOut {
    const response = await fetch(`${process.env.STRAPI_URL}/api/privacy-policy`, {
        next: {
            revalidate: 60 * 60 * 24, // Revalidate once a day
            tags: ['legal']
        }
    });

    if (!response.ok) {
        return null;
    }

    const data = await response.json();
    return data.data;
}

export async function getCookiePolicy(): TLegalOut {
    const response = await fetch(`${process.env.STRAPI_URL}/api/cookie-policy`, {
        next: {
            revalidate: 60 * 60 * 24, // Revalidate once a day,
            tags: ['legal']
        }
    });

    if (!response.ok) {
        return null;
    }

    const data = await response.json();
    return data.data;
}