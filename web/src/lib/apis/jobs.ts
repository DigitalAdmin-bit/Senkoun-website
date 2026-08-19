"use server";

import { internalApi } from "@/lib/axios-api";

export type TJobType =
  | "full time"
  | "part time"
  | "internship"
  | "contract"
  | "freelance"
  | "temporary";

export type TWorkType = "on site" | "remote" | "hybrid";

export type TSalaryPeriod = "hour" | "weekly" | "monthly" | "yearly";

export type TQuestionType =
  | "short_text"
  | "long_text"
  | "select"
  | "checkbox"
  | "date";

export interface IJobResponse {
  _id: string;
  documentId?: string;
  title: string;
  description: string;
  jobType: TJobType;
  workType: TWorkType;
  open: boolean;
  salary?: {
    amount: number;
    period: TSalaryPeriod;
  } | null;
  tags: { text: string }[];
  home: {
    _id: string;
    strapiDocumentId?: string;
    name: string;
    slug: string;
    address: string;
    status?: string;
  } | null;
  questions: {
    title: string;
    description?: string;
    questionType: TQuestionType;
    options?: string | null;
    required: boolean;
    sortOrder?: number;
  }[];
  publishedAt?: string | null;
  deleted?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IJobListResponse {
  jobs: IJobResponse[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

interface IInternalApiResponse<T> {
  success: boolean;
  statusCode: number;
  data: T;
  message: string | null;
}

export async function getOpenJobs({
  home,
  job_type,
  work_type,
  keyword,
  limit = 10,
  page = 1,
}: {
  keyword?: string;
  limit?: number;
  page?: number;
  home?: string;
  job_type?: TJobType;
  work_type?: TWorkType;
}): Promise<IJobListResponse> {
  "use server";

  // Build query params matching the internal jobs public API schema.
  const params: Record<string, string | number> = {
    page,
    pageSize: limit,
  };

  if (keyword) {
    params.keyword = keyword;
  }
  if (home) {
    params.home = home;
  }
  if (job_type) {
    params.jobType = job_type;
  }
  if (work_type) {
    params.workType = work_type;
  }

  const response = await internalApi.get<
    IInternalApiResponse<IJobListResponse>
  >("/jobs/public", {
    params,
  });

  return response.data.data;
}

export type THearAboutVacancyOption =
  | "SENKOUN Employee Referral"
  | "Social Media"
  | "LinkedIn"
  | "News Articles"
  | "Blogs"
  | "Websites"
  | "Friend Suggested"
  | "Other";
