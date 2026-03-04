"use client";

import {IJobResponse} from "@/lib/apis/jobs";
import {Button} from "@/components/ui/button";
import {formatDistanceToNow} from "date-fns";

interface LeftSideProps {
    jobs: IJobResponse[];
    selectedJob: IJobResponse | null;
    onSelectJob: (job: IJobResponse) => void;
    loading: boolean;
    pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
    };
    onPageChange: (page: number) => void;
}

export default function LeftSide({
    jobs,
    selectedJob,
    onSelectJob,
    loading,
    pagination,
    onPageChange,
}: LeftSideProps) {
    return (
        <div className="flex flex-col border border-gray-200 rounded-lg overflow-hidden">
            <div className="flex-1 overflow-y-auto">
                {loading ? (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        Loading jobs...
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8 text-center">
                        <svg
                            className="w-16 h-16 mb-4 text-gray-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        <p className="font-medium text-lg">No jobs found</p>
                        <p className="text-sm mt-2">
                            Try adjusting your search filters
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200">
                        {jobs.map((job) => (
                            <button
                                key={job.documentId}
                                onClick={() => onSelectJob(job)}
                                className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                                    selectedJob?.documentId === job.documentId
                                        ? "bg-gray-100 border-l-4 border-[#B8853A]"
                                        : ""
                                }`}
                            >
                                <div className="space-y-2">
                                    <p className="text-xs text-gray-500">
                                        {formatDistanceToNow(new Date(job.createdAt), {
                                            addSuffix: true,
                                        })}
                                    </p>
                                    <h3 className="font-semibold text-[#64565A]">
                                        {job.title}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {job.home.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {job.home.address}
                                    </p>
                                    <div className="flex gap-2 flex-wrap">
                                        <span className="text-xs px-2 py-1 bg-gray-100 rounded border border-gray-300 capitalize">
                                            {job.job_type}
                                        </span>
                                        <span className="text-xs px-2 py-1 bg-gray-100 rounded border border-gray-300 capitalize">
                                            {job.work_type}
                                        </span>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Pagination */}
            {pagination.pageCount > 1 && (
                <div className="border-t border-gray-200 p-4 flex justify-between items-center bg-white">
                    <Button
                        onClick={() => onPageChange(pagination.page - 1)}
                        disabled={pagination.page === 1}
                        variant="outline"
                        size="sm"
                    >
                        Previous
                    </Button>
                    <span className="text-sm text-gray-600">
                        Page {pagination.page} of {pagination.pageCount}
                    </span>
                    <Button
                        onClick={() => onPageChange(pagination.page + 1)}
                        disabled={pagination.page === pagination.pageCount}
                        variant="outline"
                        size="sm"
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
}

