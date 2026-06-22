import qs from "qs";
import internalApi, { STRAPI_URL } from "@/app/internal/libs/api-instance.ts/api-instance";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface IJobHome {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    phone: string;
    email: string;
    address: string;
}

export interface IJob {
    id: number;
    documentId: string;
    title: string;
    job_type: string;
    work_type: string;
    open: boolean;
    home: IJobHome;
}

export interface IFile {
    id: number;
    documentId: string;
    name: string;
    ext: string;
    url: string;
}

export interface IJobApplication {
    id: number;
    documentId: string;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    hear_about_vacancy: string;
    createdAt: string;
    job: IJob;
    resume: IFile | null;
    cover_letter: IFile | null;
    responses: unknown[];
}

export interface IApplicationsMeta {
    pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
    };
}

export interface IApplicationsResponse {
    data: IJobApplication[];
    meta: IApplicationsMeta;
}

// ─── Query ────────────────────────────────────────────────────────────────────

const populate = {
    populate: {
        job: {
            fields: ["id", "title", "job_type", "work_type", "open"],
            populate: {
                home: {
                    fields: ["id", "name", "slug", "phone", "email", "address"],
                },
            },
        },
        resume: {
            fields: ["name", "ext", "url"],
        },
        cover_letter: {
            fields: ["name", "ext", "url"],
        },
        responses: true,
    },
};

function buildQuery(search?: string) {
    const filters: Record<string, unknown> = {};

    if (search) {
        filters["$or"] = [
            { first_name: { $containsi: search } },
            { last_name: { $containsi: search } },
            { email: { $containsi: search } },
            { phone: { $containsi: search } },
        ];
    }

    return qs.stringify(
        {
            ...populate,
            filters,
            sort: ["createdAt:desc"],
        },
        { encodeValuesOnly: true }
    );
}

// ─── Fetch ────────────────────────────────────────────────────────────────────

export async function getJobApplications(
    search?: string
): Promise<IApplicationsResponse> {
    const query = buildQuery(search);
    const res = await internalApi.get<IApplicationsResponse>(
        `/job-applications?${query}`
    );
    return res.data;
}

/** Resolve a Strapi file URL to an absolute URL */
export function resolveFileUrl(url: string): string {
    if (url.startsWith("http")) return url;
    return `${STRAPI_URL}${url}`;
}
