"use client";

import {useEffect, useState, useCallback} from "react";
import {getOpenJobs, IJobResponse} from "@/lib/apis/jobs";
import {Input} from "@/components/ui/input";
import {Select} from "@/components/ui/select";
import LeftSide from "@/components/careers/left-side";
import RightSide from "@/components/careers/right-side";

interface JobsResponse {
    data: IJobResponse[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

export default function Openings() {
    const [jobs, setJobs] = useState<IJobResponse[]>([]);
    const [selectedJob, setSelectedJob] = useState<IJobResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        page: 1,
        pageCount: 1,
        pageSize: 10,
        total: 0
    });

    // Filters
    const [keyword, setKeyword] = useState("");
    const [homeFilter, setHomeFilter] = useState("");
    const [jobTypeFilter, setJobTypeFilter] = useState("");
    const [workTypeFilter, setWorkTypeFilter] = useState("");

    // Fetch jobs
    const fetchJobs = useCallback(async (page: number = 1, searchKeyword?: string) => {
        setLoading(true);
        try {
            const response = await getOpenJobs({
                keyword: searchKeyword || undefined,
                home: homeFilter || undefined,
                job_type: jobTypeFilter as any || undefined,
                work_type: workTypeFilter as any || undefined,
                limit: 10,
                page,
            }) as unknown as JobsResponse;

            setJobs(response.data);
            setPagination(response.meta.pagination);

            // Auto-select first job if none selected or current selection not in results
            if (response.data.length > 0 && !selectedJob) {
                setSelectedJob(response.data[0]);
            } else if (response.data.length > 0 && selectedJob) {
                // Check if current selected job is still in the list
                const stillExists = response.data.find(j => j.documentId === selectedJob.documentId);
                if (!stillExists) {
                    setSelectedJob(response.data[0]);
                }
            } else if (response.data.length === 0) {
                setSelectedJob(null);
            }
        } catch (error) {
            console.error("Error fetching jobs:", error);
        } finally {
            setLoading(false);
        }
    }, [homeFilter, jobTypeFilter, workTypeFilter, selectedJob]);

    // Debounced keyword search
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchJobs(1, keyword);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [keyword]);

    // Fetch when filters change (non-keyword filters)
    useEffect(() => {
        fetchJobs(1, keyword);
    }, [homeFilter, jobTypeFilter, workTypeFilter]);

    // Initial fetch
    useEffect(() => {
        fetchJobs(1);
    }, []);

    const handlePageChange = (newPage: number) => {
        fetchJobs(newPage, keyword);
    };

    return (
        <div className="main-container py-10">
            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
                <div className="flex gap-4 items-end max-md:flex-col">
                    <Input
                        placeholder="Search Job"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="flex-1 h-11 border-gray-400 rounded-md"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Select
                        value={homeFilter}
                        onChange={(e) => setHomeFilter(e.target.value)}
                        className="h-11 border-gray-400 rounded-md"
                    >
                        <option value="">Homes</option>
                        {/* These would ideally come from an API */}
                        <option value="emerald-lodge">Emerald Lodge</option>
                        <option value="joseph-lodge">Joseph Lodge</option>
                    </Select>

                    <Select
                        value={jobTypeFilter}
                        onChange={(e) => setJobTypeFilter(e.target.value)}
                        className="h-11 border-gray-400 rounded-md"
                    >
                        <option value="">Job type / Category</option>
                        <option value="full time">Full Time</option>
                        <option value="part time">Part Time</option>
                        <option value="internship">Internship</option>
                        <option value="contract">Contract</option>
                        <option value="freelance">Freelance</option>
                        <option value="temporary">Temporary</option>
                    </Select>

                    <Select
                        value={workTypeFilter}
                        onChange={(e) => setWorkTypeFilter(e.target.value)}
                        className="h-11 border-gray-400 rounded-md"
                    >
                        <option value="">Work type</option>
                        <option value="on site">On Site</option>
                        <option value="remote">Remote</option>
                        <option value="hybrid">Hybrid</option>
                    </Select>
                </div>
            </div>

            {/* Job Listings and Details */}
            <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6 h-[calc(100vh-400px)] min-h-150">
                {/* Left Side - Job Listings (Scrollable) */}
                <LeftSide
                    jobs={jobs}
                    selectedJob={selectedJob}
                    onSelectJob={setSelectedJob}
                    loading={loading}
                    pagination={pagination}
                    onPageChange={handlePageChange}
                />

                {/* Right Side - Job Details (Scrollable) */}
                <RightSide selectedJob={selectedJob} />
            </div>
        </div>
    );
}