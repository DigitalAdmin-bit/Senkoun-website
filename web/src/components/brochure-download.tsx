"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {ChevronRight} from "lucide-react";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {createBrochureDownload} from "@/lib/apis/brochure";

const brochureSchema = z.object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    phone: z.string().min(1, "Phone number is required"),
    email: z.email("Please enter a valid email address"),
    consent: z.boolean().refine((val) => val === true, {
        message: "You must consent to continue",
    }),
});

type BrochureFormData = z.infer<typeof brochureSchema>;

export default function xBrochureDownload({url, homeID}: {
    url: string,
    homeID: string
}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<BrochureFormData>({
        resolver: zodResolver(brochureSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            phone: "",
            email: "",
            consent: false,
        },
    });

    const onSubmit = async (data: BrochureFormData) => {
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            await createBrochureDownload({
                first_name: data.first_name,
                last_name: data.last_name,
                phone: data.phone,
                email: data.email,
                home: homeID,
            });

            // Download the brochure
            const link = document.createElement("a");
            link.href = url;
            link.target = "_blank";
            link.download = "brochure.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            reset();
        } catch (error) {
            console.error("Failed to submit brochure request:", error);
            setSubmitError("Failed to process your request. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 text-[#64565A]"
        >
            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <label
                        htmlFor="first_name"
                        className="block text-[10px] font-medium uppercase tracking-widest text-gray-500"
                    >
                        First Name *
                    </label>
                    <input
                        id="first_name"
                        type="text"
                        placeholder="First Name"
                        {...register("first_name")}
                        aria-invalid={!!errors.first_name}
                        className="placeholder-[#C2B3B3]  w-full h-12 border-0 border-b-2 border-gray-300 bg-transparent px-0 shadow-none focus-visible:border-gray-600 focus-visible:ring-0"
                    />
                    {errors.first_name && (
                        <p className="text-sm text-red-600">
                            {errors.first_name.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="last_name"
                        className="block text-[10px] font-medium uppercase tracking-widest text-gray-500"
                    >
                        Last Name *
                    </label>
                    <input
                        id="last_name"
                        type="text"
                        placeholder="Last Name"
                        {...register("last_name")}
                        aria-invalid={!!errors.last_name}
                        className="placeholder-[#C2B3B3]  w-full h-12 border-0 border-b-2 border-gray-300 bg-transparent px-0 shadow-none focus-visible:border-gray-600 focus-visible:ring-0"
                    />
                    {errors.last_name && (
                        <p className="text-sm text-red-600">{errors.last_name.message}</p>
                    )}
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <label
                        htmlFor="phone"
                        className="block text-[10px] font-medium uppercase tracking-widest text-gray-500"
                    >
                        Phone Number *
                    </label>
                    <input
                        id="phone"
                        type="tel"
                        placeholder="Phone Number"
                        {...register("phone")}
                        aria-invalid={!!errors.phone}
                        className="placeholder-[#C2B3B3] w-full h-12 border-0 border-b-2 border-gray-300 bg-transparent px-0 shadow-none focus-visible:border-gray-600 focus-visible:ring-0"
                    />
                    {errors.phone && (
                        <p className="text-sm text-red-600">{errors.phone.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="email"
                        className="block text-[10px] font-medium uppercase tracking-widest text-gray-500"
                    >
                        Email Address *
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email Address"
                        {...register("email")}
                        aria-invalid={!!errors.email}
                        className="placeholder-[#C2B3B3] w-full h-12 border-0 border-b-2 border-gray-300 bg-transparent px-0 shadow-none focus-visible:border-gray-600 focus-visible:ring-0"
                    />
                    {errors.email && (
                        <p className="text-sm text-red-600">{errors.email.message}</p>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3 sm:max-w-2xl">
                    <input
                        type="checkbox"
                        id="consent"
                        {...register("consent")}
                        aria-invalid={!!errors.consent}
                        className="mt-1 h-4 w-4 shrink-0 rounded border border-gray-400 text-primary focus:ring-2 focus:ring-primary"
                    />
                    <label
                        htmlFor="consent"
                        className="text-xs leading-relaxed text-gray-600"
                    >
                        By submitting this enquiry, you consent to us using your data to
                        provide you with the information requested and to contact you via
                        the method(s) you have chosen, and confirm that you have read and
                        understood our{" "}
                        <a href="/privacy-policy" className="text-primary underline">
                            Privacy Policy
                        </a>
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="max-sm:mx-auto hover:text-black/90 cursor-pointer flex gap-2 shrink-0 text-sm items-center font-medium uppercase tracking-wider"
                >
                    {isSubmitting ? (
                        "Processing..."
                    ) : (
                        <>
                            Download Brochure
                            <ChevronRight className="size-4 mb-0.5" strokeWidth={2}/>
                        </>
                    )}
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