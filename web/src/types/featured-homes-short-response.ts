export interface FeaturedHomesShortResponse {
    id: number;
    documentId: string;
    name: string;
    address: string;
    slug: string;
    description?: string;
    phone?: string;
    cqc_rating?: {
        id: number;
        rating: string;
        report_link: string;
    };
    thumbnails: {
        id: number;
        documentId: string;
        alternativeText: string;
        url: string;
        width: number;
        height: number;
    }[];


    gallery?: {
        id: number;
        documentId: string;
        alternativeText: string;
        url: string;
        width: number;
        height: number;
    }[];
}