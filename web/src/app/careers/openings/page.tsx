"use client";

import { useCallback, useEffect, useState } from "react";
import LeftSide from "@/components/careers/left-side";
import RightSide from "@/components/careers/right-side";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { getOpenJobs, type IJobResponse } from "@/lib/apis/jobs";

export default function Openings() {
  const [jobs, setJobs] = useState<IJobResponse[]>([]);
  const [selectedJob, setSelectedJob] = useState<IJobResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    pageCount: 1,
    pageSize: 10,
    total: 0,
  });

  // Filters
  const [keyword, setKeyword] = useState("");
  const [homeFilter, setHomeFilter] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [workTypeFilter, setWorkTypeFilter] = useState("");

  const fetchJobs = useCallback(
    async (page: number = 1, searchKeyword?: string) => {
      setLoading(true);
      try {
        const response = await getOpenJobs({
          keyword: searchKeyword || undefined,
          home: homeFilter || undefined,
          job_type: (jobTypeFilter as any) || undefined,
          work_type: (workTypeFilter as any) || undefined,
          limit: 10,
          page,
        });

        setJobs(response.jobs);
        setPagination({
          page: response.page,
          pageSize: response.pageSize,
          pageCount: response.totalPages,
          total: response.total,
        });

        // Auto-select first job if none selected or current selection not in results
        if (response.jobs.length > 0 && !selectedJob) {
          setSelectedJob(response.jobs[0]);
        } else if (response.jobs.length > 0 && selectedJob) {
          // Check if current selected job is still in the list
          const stillExists = response.jobs.find(
            (j) => j._id === selectedJob._id,
          );
          if (!stillExists) {
            setSelectedJob(response.jobs[0]);
          }
        } else if (response.jobs.length === 0) {
          setSelectedJob(null);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    },
    [homeFilter, jobTypeFilter, workTypeFilter, selectedJob],
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchJobs(1, keyword);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [keyword]);

  useEffect(() => {
    fetchJobs(1, keyword);
  }, [homeFilter, jobTypeFilter, workTypeFilter]);

  const handlePageChange = (newPage: number) => {
    fetchJobs(newPage, keyword);
  };

  return (
    <div className="bg-white">
      <div className="main-container py-10">
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
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6 min-h-150">
          <LeftSide
            jobs={jobs}
            selectedJob={selectedJob}
            onSelectJob={setSelectedJob}
            loading={loading}
            pagination={pagination}
            onPageChange={handlePageChange}
          />

          <RightSide selectedJob={selectedJob} />
        </div>
      </div>
    </div>
  );
}
