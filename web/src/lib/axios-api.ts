import axios, {type AxiosInstance} from "axios";

const STRAPI_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

// Create axios instance with base configuration
const axiosApi: AxiosInstance = axios.create({
    baseURL: `${STRAPI_URL}/api`,
    headers: {
        "Content-Type": "application/json",
    },
});

// Types for Strapi API responses
export interface StrapiMeta {
    pagination?: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
    };
}

export interface StrapiResponse<T> {
    data: T;
    meta: StrapiMeta;
}

export interface StrapiImage {
    id: number;
    documentId: string;
    url: string;
    alternativeText: string | null;
    width: number;
    height: number;
    formats?: {
        thumbnail?: { url: string; width: number; height: number };
        small?: { url: string; width: number; height: number };
        medium?: { url: string; width: number; height: number };
        large?: { url: string; width: number; height: number };
    };
}

// Helper to get full image URL
export function getStrapiImageUrl(image: StrapiImage | null): string {
    if (!image) return "";
    const url = image.url;
    if (url.startsWith("http")) return url;
    return `${STRAPI_URL}${url}`;
}

// Generic fetch function for collection types
export async function fetchCollection<T>(
    endpoint: string,
    params?: {
        populate?: string | string[] | Record<string, unknown>;
        filters?: Record<string, unknown>;
        sort?: string | string[];
        pagination?: { page?: number; pageSize?: number };
        fields?: string[];
    },
): Promise<StrapiResponse<T[]>> {
    const queryParams = new URLSearchParams();

    if (params?.populate) {
        if (typeof params.populate === "string") {
            queryParams.append("populate", params.populate);
        } else if (Array.isArray(params.populate)) {
            params.populate.forEach((p) => queryParams.append("populate", p));
        } else {
            queryParams.append("populate", JSON.stringify(params.populate));
        }
    }

    if (params?.filters) {
        Object.entries(params.filters).forEach(([key, value]) => {
            queryParams.append(`filters[${key}]`, String(value));
        });
    }

    if (params?.sort) {
        if (Array.isArray(params.sort)) {
            params.sort.forEach((s) => queryParams.append("sort", s));
        } else {
            queryParams.append("sort", params.sort);
        }
    }

    if (params?.pagination) {
        if (params.pagination.page) {
            queryParams.append("pagination[page]", String(params.pagination.page));
        }
        if (params.pagination.pageSize) {
            queryParams.append(
                "pagination[pageSize]",
                String(params.pagination.pageSize),
            );
        }
    }

    if (params?.fields) {
        params.fields.forEach((f) => queryParams.append("fields", f));
    }

    const queryString = queryParams.toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;

    const response = await axiosApi.get<StrapiResponse<T[]>>(url);
    return response.data;
}

// Generic fetch function for single types
export async function fetchSingle<T>(
    endpoint: string,
    params?: {
        populate?: string | string[] | Record<string, unknown>;
    },
): Promise<StrapiResponse<T>> {
    const queryParams = new URLSearchParams();

    if (params?.populate) {
        if (typeof params.populate === "string") {
            queryParams.append("populate", params.populate);
        } else if (Array.isArray(params.populate)) {
            params.populate.forEach((p) => queryParams.append("populate", p));
        } else {
            queryParams.append("populate", JSON.stringify(params.populate));
        }
    }

    const queryString = queryParams.toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;

    const response = await axiosApi.get<StrapiResponse<T>>(url);
    return response.data;
}

// Fetch single document by documentId or slug
export async function fetchOne<T>(
    endpoint: string,
    identifier: string,
    params?: {
        populate?: string | string[] | Record<string, unknown>;
    },
): Promise<StrapiResponse<T>> {
    const queryParams = new URLSearchParams();

    if (params?.populate) {
        if (typeof params.populate === "string") {
            queryParams.append("populate", params.populate);
        } else if (Array.isArray(params.populate)) {
            params.populate.forEach((p) => queryParams.append("populate", p));
        } else {
            queryParams.append("populate", JSON.stringify(params.populate));
        }
    }

    const queryString = queryParams.toString();
    const url = queryString
        ? `${endpoint}/${identifier}?${queryString}`
        : `${endpoint}/${identifier}`;

    const response = await axiosApi.get<StrapiResponse<T>>(url);
    return response.data;
}

// Submit form data (for enquiry forms)
export async function submitForm<T>(
    endpoint: string,
    data: Record<string, unknown>,
): Promise<StrapiResponse<T>> {
    const response = await axiosApi.post<StrapiResponse<T>>(endpoint, {data});
    return response.data;
}

// Export the base URL for image handling
export {STRAPI_URL};
export default axiosApi;
