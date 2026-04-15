"use server";

import {IStrapiResponse} from "@/types/types";
import {BlocksContent} from "@strapi/blocks-react-renderer";
import qs from "qs";
import axiosApi from "@/lib/axios-api";
import {uploadFileToStrapi} from "@/lib/apis/upload";
import {sendMail} from "@/lib/apis/mail";


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
    }[]


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


    const res = await fetch(`${process.env.STRAPI_URL}/api/jobs?${query}`, {
        next: {
            tags: ['jobs']
        }
    });
    const data = await res.json();

    return data
}


export type THearAboutVacancyOption =
    'SENKOUN Employe Referral'
    | 'Social Media'
    | 'LinkedIn'
    | 'News Articles'
    | 'Blogs'
    | 'Websites'
    | 'Friend Suggested'
    | 'Other';

export async function applyForJob(jobId: string, data: {
    first_name: string;
    last_name: string;
    hear_about_vacancy: THearAboutVacancyOption;
    phone: string;
    email: string;
    responses: {
        question: string;
        answer: string;
        type?: 'short_text' | 'long_text' | 'select' | 'checkbox' | 'date';
    }[];
    resume: File;
    cover_letter: File;
}) {
    "use server";
    try {
        const uploadedResume = await uploadFileToStrapi(data.resume);

        const uploadedCoverLetter = await uploadFileToStrapi(data.cover_letter);

        await axiosApi.post("/job-applications", {
            data: {
                first_name: data.first_name,
                last_name: data.last_name,
                hear_about_vacancy: data.hear_about_vacancy,
                phone: data.phone,
                email: data.email,
                responses: data.responses,
                resume: uploadedResume.id,
                cover_letter: uploadedCoverLetter.id,
                job: {
                    connect: [jobId]
                },
            }
        });

        sendMail({
            subject: "We have received your application",
            content: `
                <p>Dear ${data.first_name},</p>
                <p>Thank you for applying for the position. We have received your application and our team will review it shortly.</p>
                <p>Best regards,<br/>SENKOUN Team</p>
            `,
            to: data.email,
        });
    } catch (error) {
        console.error("Error applying for job:", error);
        throw error;
    }
}