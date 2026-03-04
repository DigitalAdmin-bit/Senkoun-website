"use server";

import {IStrapiResponse} from "@/types/types";
import {BlocksContent} from "@strapi/blocks-react-renderer";
import qs from "qs";


export interface IJobResponse {
    id: number
    documentId: string,
    title: string,
    description: BlocksContent,

    job_type: 'full time' | 'part time' | 'internship' | 'contract' | 'freelance' | 'temporary',
    work_type: 'on site' | 'remote' | 'hybrid',

    open: boolean,
    salary: {
        amount: number,
        period: 'hour' | 'weekly' | 'monthly' | 'yearly',
    },

    tags: { text: string }[],
    home: {
        documentId: string,
        name: string,
        slug: string,
        address: string
    },
    questions: {
        title: string,
        description?: string,
        question_type: 'short_text' | 'long_text' | 'select' | 'checkbox' | 'date',
        options?: string, // Text with \n separated options if question_type is select
        required: boolean,
    }


    updatedAt: string,
    createdAt: string,
}


export async function getOpenJobs({home, job_type, work_type, keyword, limit = 10, page = 1}: {
    keyword?: string,
    limit?: number,
    page?: number,
    home?: string,
    job_type?: 'full time' | 'part time' | 'internship' | 'contract' | 'freelance' | 'temporary',
    work_type?: 'on site' | 'remote' | 'hybrid',
}): Promise<IStrapiResponse<IJobResponse[]>> {
    "use server";

    const openJobsFilter = {
        filters: {
            open: {
                $eq: true,
            },
            ...(home ? {
                home: {
                    slug: {
                        $eq: home,
                    }
                }
            } : {}),
            ...(job_type ? {
                job_type: {
                    $eq: job_type,
                }
            } : {}),
            ...(work_type ? {
                work_type: {
                    $eq: work_type,
                }
            } : {}),
            ...(keyword ? {
                $or: [
                    {
                        title: {
                            $containsi: keyword,
                        }
                    },
                    {
                        tags: {
                            text: {
                                $containsi: keyword,
                            }
                        }
                    },
                ]
            } : {})
        },

        fields: ["documentId", "title", "description", "job_type", "work_type", "open", "updatedAt", "createdAt"],

        populate: {
            questions: {
                fields: ["title", "description", "question_type", "options", "required"],
            },
            tags: {
                fields: ["text"],
            },
            salary: {
                fields: ["amount", "period"],
            },
            home: {
                fields: ["documentId", "name", "slug", "address"],
            },
        },
        pagination: {
            page,
            pageSize: limit,
        }
    };

    const query = qs.stringify(openJobsFilter, {
        encodeValuesOnly: true,
    });

    console.log("Query: ", query);

    const res = await fetch(`${process.env.STRAPI_URL}/api/jobs?${query}`);
    const data = await res.json();

    return data
}