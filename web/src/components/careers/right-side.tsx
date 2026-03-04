"use client";

import {IJobResponse, applyForJob, THearAboutVacancyOption} from "@/lib/apis/jobs";
import {Button} from "@/components/ui/button";
import StrapiBlocks from "@/components/strapi/strapi-blocks";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Upload} from "lucide-react";
import {Select} from "@/components/ui/select";
import {useRouter} from "next/navigation";

interface RightSideProps {
    selectedJob: IJobResponse | null;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
];

const hearAboutOptions: THearAboutVacancyOption[] = [
    'SENKOUN Employe Referral',
    'Social Media',
    'LinkedIn',
    'News Articles',
    'Blogs',
    'Websites',
    'Friend Suggested',
    'Other'
];

export default function RightSide({selectedJob}: RightSideProps) {
    const [activeTab, setActiveTab] = useState<'description' | 'application'>('description');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [resumeFileName, setResumeFileName] = useState<string>("");
    const [coverLetterFileName, setCoverLetterFileName] = useState<string>("");
    const router = useRouter();

    const createJobApplicationSchema = () => {
        const baseSchema = {
            first_name: z.string().min(1, "First name is required"),
            last_name: z.string().min(1, "Last name is required"),
            email: z.email("Please enter a valid email address"),
            phone: z.string().min(1, "Phone number is required"),
            hear_about_vacancy: z.enum(hearAboutOptions as [THearAboutVacancyOption, ...THearAboutVacancyOption[]]),
            resume: z
                .any()
                .refine((files) => files?.length > 0, "Resume is required")
                .refine(
                    (files) => files?.[0]?.size <= MAX_FILE_SIZE,
                    "File size must be less than 5MB"
                )
                .refine(
                    (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
                    "Only PDF, DOC, and DOCX files are accepted"
                ),
            cover_letter: z
                .any()
                .refine((files) => files?.length > 0, "Cover letter is required")
                .refine(
                    (files) => files?.[0]?.size <= MAX_FILE_SIZE,
                    "File size must be less than 5MB"
                )
                .refine(
                    (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
                    "Only PDF, DOC, and DOCX files are accepted"
                ),
        };

        // Add dynamic fields for each question
        const questionFields: Record<string, z.ZodTypeAny> = {};
        if (selectedJob?.questions) {
            selectedJob.questions.forEach((question, index) => {
                const fieldKey = `question_${index}`;
                if (question.required) {
                    questionFields[fieldKey] = z.string().min(1, `${question.title} is required`);
                } else {
                    questionFields[fieldKey] = z.string().optional();
                }
            });
        }

        return z.object({...baseSchema, ...questionFields});
    };

    const jobApplicationSchema = createJobApplicationSchema();
    type JobApplicationFormData = z.infer<typeof jobApplicationSchema>;

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<JobApplicationFormData>({
        resolver: zodResolver(jobApplicationSchema),
    });

    const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setResumeFileName(file.name);
        }
    };

    const handleCoverLetterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setCoverLetterFileName(file.name);
        }
    };

    const onSubmit = async (data: JobApplicationFormData) => {
        if (!selectedJob) return;

        setIsSubmitting(true);

        try {
            const resumeFile = data.resume[0];
            const coverLetterFile = data.cover_letter[0];

            const responses = selectedJob.questions?.map((question, index) => ({
                question: question.title,
                answer: (data as any)[`question_${index}`] || "",
                type: question.question_type,
            })) || [];

            await applyForJob(selectedJob.documentId, {
                first_name: data.first_name,
                last_name: data.last_name,
                hear_about_vacancy: data.hear_about_vacancy,
                phone: data.phone,
                email: data.email,
                responses,
                resume: resumeFile,
                cover_letter: coverLetterFile,
            });

            // Redirect to success page with email
            router.push(`/careers/openings/success?email=${encodeURIComponent(data.email)}`);

            reset();
            setResumeFileName("");
            setCoverLetterFileName("");
        } catch (error) {
            console.error("Error submitting application:", error);
            alert("Failed to submit application. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

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
                                <button
                                    onClick={() => setActiveTab('description')}
                                    className={`pb-3 font-medium transition-colors ${
                                        activeTab === 'description'
                                            ? 'border-b-2 border-[#B8853A] text-[#B8853A]'
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    DESCRIPTION
                                </button>
                                <button
                                    onClick={() => setActiveTab('application')}
                                    className={`pb-3 font-medium transition-colors ${
                                        activeTab === 'application'
                                            ? 'border-b-2 border-[#B8853A] text-[#B8853A]'
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    APPLICATION
                                </button>
                            </div>
                        </div>

                        {/* Tab Content */}
                        {activeTab === 'description' ? (
                            <>
                                {/* Job Description */}
                                <div className="mb-8 prose prose-sm max-w-none text-[#64565A]">
                                    <StrapiBlocks content={selectedJob.description}/>
                                </div>

                                {/* Apply Button */}
                                <Button
                                    onClick={() => setActiveTab('application')}
                                    className="w-full bg-[#B8853A] hover:bg-[#B8853A]/90 text-white py-6"
                                >
                                    Apply for this job
                                </Button>
                            </>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                {/* Personal Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-[#64565A]">Personal Information</h3>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <label htmlFor="first_name" className="block text-[10px] font-medium uppercase tracking-widest">
                                                First Name *
                                            </label>
                                            <input
                                                id="first_name"
                                                type="text"
                                                placeholder="First Name"
                                                {...register("first_name")}
                                                className="w-full h-12 border-0 border-b-2 border-[#9E9094] bg-transparent px-0 shadow-none focus-visible:border-gray-600 focus-visible:ring-0"
                                            />
                                            {errors.first_name && (
                                                <p className="text-sm text-red-600">{errors.first_name.message}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="last_name" className="block text-[10px] font-medium uppercase tracking-widest">
                                                Last Name *
                                            </label>
                                            <input
                                                id="last_name"
                                                type="text"
                                                placeholder="Last Name"
                                                {...register("last_name")}
                                                className="w-full h-12 border-0 border-b-2 border-[#9E9094] bg-transparent px-0 shadow-none focus-visible:border-gray-600 focus-visible:ring-0"
                                            />
                                            {errors.last_name && (
                                                <p className="text-sm text-red-600">{errors.last_name.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="block text-[10px] font-medium uppercase tracking-widest">
                                                Email Address *
                                            </label>
                                            <input
                                                id="email"
                                                type="email"
                                                placeholder="Email Address"
                                                {...register("email")}
                                                className="w-full h-12 border-0 border-b-2 border-[#9E9094] bg-transparent px-0 shadow-none focus-visible:border-gray-600 focus-visible:ring-0"
                                            />
                                            {errors.email && (
                                                <p className="text-sm text-red-600">{errors.email.message}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="phone" className="block text-[10px] font-medium uppercase tracking-widest">
                                                Phone Number *
                                            </label>
                                            <input
                                                id="phone"
                                                type="tel"
                                                placeholder="Phone Number"
                                                {...register("phone")}
                                                className="w-full h-12 border-0 border-b-2 border-[#9E9094] bg-transparent px-0 shadow-none focus-visible:border-gray-600 focus-visible:ring-0"
                                            />
                                            {errors.phone && (
                                                <p className="text-sm text-red-600">{errors.phone.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="hear_about_vacancy" className="block text-[10px] font-medium uppercase tracking-widest">
                                            How did you hear about this vacancy? *
                                        </label>
                                        <Select
                                            id="hear_about_vacancy"
                                            {...register("hear_about_vacancy")}
                                            className="w-full h-12 border-2 border-[#9E9094] px-4"
                                        >
                                            <option value="">Select an option</option>
                                            {hearAboutOptions.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </Select>
                                        {errors.hear_about_vacancy && (
                                            <p className="text-sm text-red-600">{errors.hear_about_vacancy.message}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Dynamic Questions */}
                                {selectedJob.questions && selectedJob.questions.length > 0 && (
                                    <div className="space-y-4 border-t border-gray-200 pt-6">
                                        <h3 className="text-lg font-semibold text-[#64565A]">Additional Questions</h3>
                                        {selectedJob.questions.map((question, index) => (
                                            <div key={index} className="space-y-2">
                                                <label htmlFor={`question_${index}`} className="block text-sm font-medium text-[#64565A]">
                                                    {question.title} {question.required && '*'}
                                                </label>
                                                {question.description && (
                                                    <p className="text-xs text-gray-500">{question.description}</p>
                                                )}
                                                {question.question_type === 'short_text' && (
                                                    <input
                                                        id={`question_${index}`}
                                                        type="text"
                                                        {...register(`question_${index}` as any)}
                                                        className="w-full h-12 border-0 border-b-2 border-[#9E9094] bg-transparent px-0 shadow-none focus-visible:border-gray-600 focus-visible:ring-0"
                                                    />
                                                )}
                                                {question.question_type === 'long_text' && (
                                                    <textarea
                                                        id={`question_${index}`}
                                                        {...register(`question_${index}` as any)}
                                                        rows={4}
                                                        className="w-full border-2 border-[#9E9094] bg-white px-4 py-3 shadow-none focus-visible:border-gray-600 focus-visible:ring-0"
                                                    />
                                                )}
                                                {question.question_type === 'select' && question.options && (
                                                    <Select
                                                        id={`question_${index}`}
                                                        {...register(`question_${index}` as any)}
                                                        className="w-full h-12 border-2 border-[#9E9094] px-4"
                                                    >
                                                        <option value="">Select an option</option>
                                                        {question.options.split('\n').map((option, optIndex) => (
                                                            <option key={optIndex} value={option.trim()}>
                                                                {option.trim()}
                                                            </option>
                                                        ))}
                                                    </Select>
                                                )}
                                                {question.question_type === 'date' && (
                                                    <input
                                                        id={`question_${index}`}
                                                        type="date"
                                                        {...register(`question_${index}` as any)}
                                                        className="w-full h-12 border-2 border-[#9E9094] px-4 shadow-none focus-visible:border-gray-600 focus-visible:ring-0"
                                                    />
                                                )}
                                                {question.question_type === 'checkbox' && (
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            id={`question_${index}`}
                                                            type="checkbox"
                                                            {...register(`question_${index}` as any)}
                                                            className="h-4 w-4 rounded border-gray-400 text-[#B8853A] focus:ring-2 focus:ring-[#B8853A]"
                                                        />
                                                        <label htmlFor={`question_${index}`} className="text-sm text-gray-600">
                                                            Yes
                                                        </label>
                                                    </div>
                                                )}
                                                {(errors as any)[`question_${index}`] && (
                                                    <p className="text-sm text-red-600">
                                                        {(errors as any)[`question_${index}`].message}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* File Uploads */}
                                <div className="space-y-4 border-t border-gray-200 pt-6">
                                    <h3 className="text-lg font-semibold text-[#64565A]">Documents</h3>

                                    <div className="grid gap-6 md:grid-cols-2">
                                        {/* Resume Upload */}
                                        <div className="space-y-2">
                                            <label htmlFor="resume" className="block text-[10px] font-medium uppercase tracking-widest">
                                                Upload Resume *
                                            </label>
                                            <div className="relative border-2 border-dashed border-[#9E9094] bg-[#F5F1ED] p-8 text-center hover:border-[#B8853A] transition-colors">
                                                <input
                                                    id="resume"
                                                    type="file"
                                                    accept=".pdf,.doc,.docx"
                                                    {...register("resume")}
                                                    onChange={(e) => {
                                                        register("resume").onChange(e);
                                                        handleResumeChange(e);
                                                    }}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                />
                                                <div className="flex flex-col items-center gap-3">
                                                    <div className="w-12 h-12 rounded-full bg-[#B8853A] flex items-center justify-center">
                                                        <Upload className="w-5 h-5 text-white" />
                                                    </div>
                                                    <div className="text-sm">
                                                        {resumeFileName ? (
                                                            <span className="text-[#B8853A] font-medium">{resumeFileName}</span>
                                                        ) : (
                                                            <>
                                                                <span className="text-[#B8853A] font-medium cursor-pointer">
                                                                    Choose file
                                                                </span>
                                                                <span className="text-[#64565A]"> or drag and drop here</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            {errors.resume && (
                                                <p className="text-sm text-red-600">{errors.resume.message as string}</p>
                                            )}
                                        </div>

                                        {/* Cover Letter Upload */}
                                        <div className="space-y-2">
                                            <label htmlFor="cover_letter" className="block text-[10px] font-medium uppercase tracking-widest">
                                                Upload Cover Letter *
                                            </label>
                                            <div className="relative border-2 border-dashed border-[#9E9094] bg-[#F5F1ED] p-8 text-center hover:border-[#B8853A] transition-colors">
                                                <input
                                                    id="cover_letter"
                                                    type="file"
                                                    accept=".pdf,.doc,.docx"
                                                    {...register("cover_letter")}
                                                    onChange={(e) => {
                                                        register("cover_letter").onChange(e);
                                                        handleCoverLetterChange(e);
                                                    }}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                />
                                                <div className="flex flex-col items-center gap-3">
                                                    <div className="w-12 h-12 rounded-full bg-[#B8853A] flex items-center justify-center">
                                                        <Upload className="w-5 h-5 text-white" />
                                                    </div>
                                                    <div className="text-sm">
                                                        {coverLetterFileName ? (
                                                            <span className="text-[#B8853A] font-medium">{coverLetterFileName}</span>
                                                        ) : (
                                                            <>
                                                                <span className="text-[#B8853A] font-medium cursor-pointer">
                                                                    Choose file
                                                                </span>
                                                                <span className="text-[#64565A]"> or drag and drop here</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            {errors.cover_letter && (
                                                <p className="text-sm text-red-600">{errors.cover_letter.message as string}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="border-t border-gray-200 pt-6">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-[#B8853A] hover:bg-[#B8853A]/90 text-white py-6 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? "Submitting Application..." : "Submit Application"}
                                    </Button>
                                </div>
                            </form>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

