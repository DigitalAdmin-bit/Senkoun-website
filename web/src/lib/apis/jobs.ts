"use server";

import {IStrapiResponse} from "@/types/types";
import {BlocksContent} from "@strapi/blocks-react-renderer";
import qs from "qs";
import axiosApi from "@/lib/axios-api";
import {uploadFileToStrapi} from "@/lib/apis/upload";
import {sendMail} from "@/lib/apis/mail";
import {getStrapiMediaUrl} from "@/lib/utils";


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
    publishedAt?: string,
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

        fields: ["documentId", "title", "description", "job_type", "work_type", "open", "updatedAt", "createdAt", "publishedAt"],

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
    return await res.json()
}


export type THearAboutVacancyOption =
    'SENKOUN Employee Referral'
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

        let uploadedCoverLetter;
        if (data.cover_letter) {
            uploadedCoverLetter = await uploadFileToStrapi(data.cover_letter);
        }

        await axiosApi.post("/job-applications", {
            data: {
                first_name: data.first_name,
                last_name: data.last_name,
                hear_about_vacancy: data.hear_about_vacancy,
                phone: data.phone,
                email: data.email,
                responses: data.responses,
                resume: uploadedResume.id,
                cover_letter: uploadedCoverLetter ? uploadedCoverLetter.id : undefined,
                job: {
                    connect: [jobId]
                },
            }
        });
        try {
            const candidateMail = sendMail({
                subject: "We have received your application",
                content: `
                <p>Dear ${data.first_name},</p>
                <p>Thank you for applying for the position. We have received your application and our team will review it shortly.</p>
                <p>Best regards,<br/>SENKOUN Team</p>
            `,
                to: data.email,
                recruitMail: true
            });

            const adminMail = sendMail({
                recruitMail: true,
                subject: `New Job Application - ${data.first_name.substring(0, 50)} ${data.last_name.substring(0, 50)}`,
                content: `
        <h2>New Job Application Received</h2>
        
        <p><strong>Name:</strong> ${data.first_name} ${data.last_name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Heard About Vacancy:</strong> ${data.hear_about_vacancy}</p>

        <h3>Responses</h3>
        <ul>
            ${data.responses.map(r => `
                <li>
                    <strong>${r.question}</strong><br/>
                    ${r.answer}
                </li>
            `).join("")}
        </ul>

        <p><strong>Resume ID:</strong> ${getStrapiMediaUrl(uploadedResume.url)}</p>
        ${
                    uploadedCoverLetter
                        ? `<p><strong>Cover Letter:</strong> ${getStrapiMediaUrl(uploadedCoverLetter.url)}</p>`
                        : `<p><strong>Cover Letter:</strong> Not provided</p>`
                }

        <hr/>
        <p>This is an automated notification from SENKOUN Hiring System.</p>
    `,
                to: "digitaladmin@senkoun.co.uk",
            });

            await Promise.all([candidateMail, adminMail]);

        } catch (emailError) {
            console.error("Error sending confirmation email:", emailError);
        }
    } catch (error) {
        console.error("Error applying for job:", error);
        throw error;
    }
}