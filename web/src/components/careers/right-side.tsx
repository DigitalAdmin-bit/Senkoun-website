"use client";

import {IJobResponse} from "@/lib/apis/jobs";
import {Button} from "@/components/ui/button";
import StrapiBlocks from "@/components/strapi/strapi-blocks";

interface RightSideProps {
    selectedJob: IJobResponse | null;
}

export default function RightSide({selectedJob}: RightSideProps) {
    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto">
                {!selectedJob ? (
                    <div className="flex items-center justify-center h-full text-gray-500 p-8 text-center">
                        <div>
                            <svg
                                className="w-16 h-16 mb-4 text-gray-300 mx-auto"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            <p className="font-medium text-lg">Select a job</p>
                            <p className="text-sm mt-2">
                                Click on a job from the list to view details
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="p-8">
                        {/* Job Header */}
                        <div className="mb-8">
                            <div className="flex justify-between items-start mb-4">
                                <div className="space-y-2 flex-1">
                                    <h2 className="text-2xl font-semibold text-[#64565A]">
                                        {selectedJob.title}
                                    </h2>
                                    <p className="text-lg text-gray-600">
                                        {selectedJob.home.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {selectedJob.home.address}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-2 flex-wrap mb-4">
                                <span className="px-3 py-1 bg-gray-100 rounded text-sm border border-gray-300 capitalize">
                                    {selectedJob.job_type}
                                </span>
                                <span className="px-3 py-1 bg-gray-100 rounded text-sm border border-gray-300 capitalize">
                                    {selectedJob.work_type}
                                </span>
                                {selectedJob.salary && (
                                    <span className="px-3 py-1 bg-[#B8853A]/10 text-[#B8853A] rounded text-sm border border-[#B8853A]/30 font-medium">
                                        £{selectedJob.salary.amount}/{selectedJob.salary.period}
                                    </span>
                                )}
                            </div>

                            {selectedJob.tags && selectedJob.tags.length > 0 && (
                                <div className="flex gap-2 flex-wrap">
                                    {selectedJob.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 bg-white border border-gray-300 rounded text-xs text-gray-600"
                                        >
                                            {tag.text}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Tabs */}
                        <div className="mb-6 border-b border-gray-200">
                            <div className="flex gap-8">
                                <button className="pb-3 border-b-2 border-[#B8853A] text-[#B8853A] font-medium">
                                    DESCRIPTION
                                </button>
                                <button className="pb-3 text-gray-500 hover:text-gray-700">
                                    APPLICATION
                                </button>
                            </div>
                        </div>

                        {/* Job Description */}
                        <div className="mb-8 prose prose-sm max-w-none text-[#64565A]">
                            <StrapiBlocks content={selectedJob.description}/>
                        </div>

                        {/* Apply Button */}
                        <Button className="w-full bg-[#B8853A] hover:bg-[#B8853A]/90 text-white py-6">
                            Apply for this job
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

