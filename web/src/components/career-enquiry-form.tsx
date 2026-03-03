"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {createCareerEnquiry} from "@/lib/apis/enquires";
import {useRouter} from "next/navigation";
import {Upload} from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
];

const careerEnquirySchema = z.object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    phone: z.string().min(1, "Phone number is required"),
    email: z.email("Please enter a valid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
    resume: z
        .custom<FileList>()
        .refine((files) => files?.length > 0, "Resume is required")
        .refine(
            (files) => files?.[0]?.size <= MAX_FILE_SIZE,
            "Resume must be less than 5MB"
        )
        .refine(
            (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
            "Resume must be a PDF or Word document"
        ),
    cover_letter: z
        .custom<FileList>()
        .refine((files) => files?.length > 0, "Cover letter is required")
        .refine(
            (files) => files?.[0]?.size <= MAX_FILE_SIZE,
            "Cover letter must be less than 5MB"
        )
        .refine(
            (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
            "Cover letter must be a PDF or Word document"
        ),
    consent: z.boolean().refine((val) => val === true, {
        message: "You must consent to continue",
    }),
});

type CareerEnquiryFormData = z.infer<typeof careerEnquirySchema>;

export default function CareerEnquiryForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [resumeFileName, setResumeFileName] = useState<string>("");
    const [coverLetterFileName, setCoverLetterFileName] = useState<string>("");

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<CareerEnquiryFormData>({
        resolver: zodResolver(careerEnquirySchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            phone: "",
            email: "",
            message: "",
            consent: false,
        },
    });


    const onSubmit = async (data: CareerEnquiryFormData) => {
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const resumeFile = data.resume[0];
            const coverLetterFile = data.cover_letter[0];

            await createCareerEnquiry({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                phone: data.phone,
                message: data.message,
                resume: resumeFile,
                cover_letter: coverLetterFile,
            });

            router.push("/careers/success");
            reset();
        } catch (error) {
            console.error("Failed to submit career enquiry:", error);
            setSubmitError(
                "Failed to submit your application. Please try again later."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

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

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-20 text-[#64565A] mt-10"
        >
            {/* Name and Contact Section */}
            <div className="grid gap-10 md:grid-cols-2">
                <div className="space-y-2">
                    <label
                        htmlFor="first_name"
                        className="block text-[10px] font-medium uppercase tracking-widest"
                    >
                        First Name *
                    </label>
                    <input
                        id="first_name"
                        type="text"
                        placeholder="First Name"
                        {...register("first_name")}
                        aria-invalid={!!errors.first_name}
                        className="w-full h-12 border-0 border-b-2 border-[#9E9094] bg-transparent px-0 shadow-none focus-visible:border-gray-600 focus-visible:ring-0"
                    />
                    {errors.first_name && (
                        <p className="text-sm text-red-600">{errors.first_name.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="last_name"
                        className="block text-[10px] font-medium uppercase tracking-widest"
                    >
                        Last Name *
                    </label>
                    <input
                        id="last_name"
                        type="text"
                        placeholder="Last Name"
                        {...register("last_name")}
                        aria-invalid={!!errors.last_name}
                        className="w-full h-12 border-0 border-b-2 border-[#9E9094] bg-transparent px-0 shadow-none focus-visible:border-gray-600 focus-visible:ring-0"
                    />
                    {errors.last_name && (
                        <p className="text-sm text-red-600">{errors.last_name.message}</p>
                    )}
                </div>
            </div>

            {/* Phone and Email */}
            <div className="grid gap-10 md:grid-cols-2">
                <div className="space-y-2">
                    <label
                        htmlFor="phone"
                        className="block text-[10px] font-medium uppercase tracking-widest"
                    >
                        Phone Number *
                    </label>
                    <input
                        id="phone"
                        type="tel"
                        placeholder="Phone Number"
                        {...register("phone")}
                        aria-invalid={!!errors.phone}
                        className="w-full h-12 border-0 border-b-2 border-[#9E9094] bg-transparent px-0 shadow-none focus-visible:border-gray-600 focus-visible:ring-0"
                    />
                    {errors.phone && (
                        <p className="text-sm text-red-600">{errors.phone.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="email"
                        className="block text-[10px] font-medium uppercase tracking-widest"
                    >
                        Email Address *
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email Address"
                        {...register("email")}
                        aria-invalid={!!errors.email}
                        className="w-full h-12 border-0 border-b-2 border-[#9E9094] bg-transparent px-0 shadow-none focus-visible:border-gray-600 focus-visible:ring-0"
                    />
                    {errors.email && (
                        <p className="text-sm text-red-600">{errors.email.message}</p>
                    )}
                </div>
            </div>

            {/* Message Section */}
            <div className="space-y-8 border-t border-[#9E9094] pt-8">
                <h3 className="font-body block font-medium tracking-widest uppercase text-[10px]">
                    Your Message
                </h3>

                <div className="space-y-2">
                    <textarea
                        id="message"
                        placeholder="Your Message"
                        {...register("message")}
                        aria-invalid={!!errors.message}
                        className="w-full min-h-37.5 bg-white px-4 py-3 border-2 border-[#9E9094] shadow-none focus-visible:border-gray-600 focus-visible:ring-0"
                    />
                    {errors.message && (
                        <p className="text-sm text-red-600">{errors.message.message}</p>
                    )}
                </div>
            </div>

            {/* File Upload Section */}
            <div className="grid gap-10 md:grid-cols-2">
                {/* Resume Upload */}
                <div className="space-y-2">
                    <label
                        htmlFor="resume"
                        className="block text-[10px] font-medium uppercase tracking-widest"
                    >
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
                                    <span className="text-[#B8853A] font-medium">
                                        {resumeFileName}
                                    </span>
                                ) : (
                                    <>
                                        <span className="text-[#B8853A] font-medium cursor-pointer">
                                            Choose file
                                        </span>
                                        <span className="text-[#64565A]">
                                            {" "}
                                            or drag and drop here
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    {errors.resume && (
                        <p className="text-sm text-red-600">
                            {errors.resume.message as string}
                        </p>
                    )}
                </div>

                {/* Cover Letter Upload */}
                <div className="space-y-2">
                    <label
                        htmlFor="cover_letter"
                        className="block text-[10px] font-medium uppercase tracking-widest"
                    >
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
                                    <span className="text-[#B8853A] font-medium">
                                        {coverLetterFileName}
                                    </span>
                                ) : (
                                    <>
                                        <span className="text-[#B8853A] font-medium cursor-pointer">
                                            Choose file
                                        </span>
                                        <span className="text-[#64565A]">
                                            {" "}
                                            or drag and drop here
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    {errors.cover_letter && (
                        <p className="text-sm text-red-600">
                            {errors.cover_letter.message as string}
                        </p>
                    )}
                </div>
            </div>

            {/* Consent and Submit */}
            <div className="flex flex-col gap-10 border-t border-[#9E9094] pt-8 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3 sm:max-w-2xl">
                    <input
                        type="checkbox"
                        id="consent"
                        {...register("consent")}
                        aria-invalid={!!errors.consent}
                        className="mt-1 h-4 w-4 shrink-0 rounded border border-gray-400 text-[#B8853A] focus:ring-2 focus:ring-[#B8853A]"
                    />
                    <label
                        htmlFor="consent"
                        className="text-xs leading-relaxed text-gray-600"
                    >
                        By submitting this enquiry, you consent to us using your data to
                        provide you with the information requested and to contact you via
                        the method(s) you have chosen, and confirm that you have read and
                        understood our{" "}
                        <a href="/privacy-policy" className="text-[#B8853A] underline">
                            Privacy Policy
                        </a>
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="max-sm:mx-auto cursor-pointer flex items-center justify-center gap-2 h-12 shrink-0 px-8 text-sm font-medium uppercase tracking-wider bg-[#B8853A] text-white hover:bg-[#9a6e2f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </div>

            {errors.consent && (
                <p className="text-sm text-red-600">{errors.consent.message}</p>
            )}

            {submitError && (
                <div className="rounded-lg bg-red-50 p-4 text-red-700">
                    {submitError}
                </div>
            )}
        </form>
    );
}