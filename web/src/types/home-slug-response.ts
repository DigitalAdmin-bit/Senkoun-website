export interface HomeSlugResponse {
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
    // video?: {
    //     id: number;
    //     documentId: string;
    //     url: string;
    //     width: number | null;
    //     height: number | null;
    //     alternativeText: string | null;
    // };
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
    gallery: {
        url: string
        width: number;
        height: number;
        alternativeText: string;
    }[],
    meet_our_team: {
        id: number;
        description: string;
        image: {
            id: number;
            documentId: string;
            url: string;
            width: number | null;
            height: number | null;
            alternativeText: string | null;
        }
    }
}