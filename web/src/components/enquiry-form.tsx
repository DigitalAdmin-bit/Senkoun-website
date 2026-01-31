"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {ChevronRight} from "lucide-react";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {createEnquiry} from "@/lib/apis/enquires";
import {useRouter} from "next/navigation";

const enquirySchema = z.object({
    type: z.string().min(1, "Please select an enquiry type"),
    home: z.string().min(1, "Please select a home"),
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.email("Please enter a valid email address"),
    phone: z.string().min(1, "Phone number is required"),
    message: z.string().min(10, "Message must be at least 10 characters"),
    consent: z.boolean().refine((val) => val === true, {
        message: "You must consent to continue",
    }),
});

type EnquiryFormData = z.infer<typeof enquirySchema>;

const enquiryTypes = [
    {value: "general", label: "General Enquiry"},
    {value: "admission", label: "Admission"},
    {value: "visit", label: "Schedule a Visit"},
    {value: "career", label: "Career Opportunities"},
];

export default function EnquiryForm({
                                        homes,
                                    }: {
    homes: { id: number; name: string; slug: string; documentId: string }[];
}) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<EnquiryFormData>({
        resolver: zodResolver(enquirySchema),
        defaultValues: {
            type: "",
            home: "",
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            message: "",
            consent: false,
        },
    });

    const onSubmit = async (data: EnquiryFormData) => {
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            await createEnquiry({
                type: data.type,
                home: data.home,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                phone: data.phone,
                message: data.message,
            });

            router.push("/enquire/success");

            reset();
        } catch (error) {
            console.error("Failed to submit enquiry:", error);
            setSubmitError("Failed to submit your enquiry. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-12 text-[#64565A] p-8 md:p-12 max-sm:p-0"
        >
            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <label
                        htmlFor="type"
                        className="font-heading block font-medium capitalize tracking-widest "
                    >
                        Please Select*
                    </label>
                    <select
                        id="type"
                        {...register("type")}
                        aria-invalid={!!errors.type}
                        className="w-full h-12 border-2 px-3 border-[#9E9094] bg-transparent text-sm uppercase tracking-wide shadow-none focus-visible:border-gray-600 focus-visible:ring-0"
                    >
                        <option value="" className="text-white/60">ENQUIRY TYPE*</option>
                        {enquiryTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                                {type.label.toUpperCase()}
                            </option>
                        ))}
                    </select>
                    {errors.type && (
                        <p className="text-sm text-red-600">{errors.type.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="home"
                        className="font-heading block font-medium tracking-widest "
                    >
                        Select Home(s)*
                    </label>
                    <select
                        id="home"
                        {...register("home")}
                        aria-invalid={!!errors.home}
                        className="w-full h-12 border-2 px-3 border-[#9E9094] bg-transparent text-sm uppercase tracking-wide shadow-none focus-visible:border-gray-600 focus-visible:ring-0"
                    >
                        <option value="">HOMES *</option>
                        {homes.map((home) => (
                            <option key={home.id} value={home.documentId}>
                                {home.name.toUpperCase()}
                            </option>
                        ))}
                    </select>
                    {errors.home && (
                        <p className="text-sm text-red-600">{errors.home.message}</p>
                    )}
                </div>
            </div>

            <div className="space-y-8 border-t border-[#9E9094] pt-8">
                <h3 className="font-heading block font-medium tracking-widest">Your Details</h3>

                <div className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                        <label
                            htmlFor="first_name"
                            className="block text-[10px] font-medium uppercase tracking-widest "
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
                            <p className="text-sm text-red-600">
                                {errors.first_name.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="last_name"
                            className="block text-[10px] font-medium uppercase tracking-widest "
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

                    <div className="space-y-2">
                        <label
                            htmlFor="email"
                            className="block text-[10px] font-medium uppercase tracking-widest "
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

                <div className="space-y-2">
                    <label
                        htmlFor="phone"
                        className="block text-[10px] font-medium uppercase tracking-widest "
                    >
                        Phone Number *
                    </label>
                    <input
                        id="phone"
                        type="tel"
                        placeholder="Phone Number"
                        {...register("phone")}
                        aria-invalid={!!errors.phone}
                        className="w-full h-12 border-0 border-b-2 border-[#9E9094] bg-transparent px-0 shadow-none focus-visible:border-gray-600 focus-visible:ring-0 md:max-w-xs"
                    />
                    {errors.phone && (
                        <p className="text-sm text-red-600">{errors.phone.message}</p>
                    )}
                </div>
            </div>

            {/* Message Section */}
            <div className="space-y-8 border-t border-[#9E9094] pt-8">
                <h3 className="font-heading block font-medium tracking-widest">
                    Write Your Message
                </h3>

                <div className="space-y-2">
                    <label
                        htmlFor="message"
                        className="block text-[10px] font-medium uppercase tracking-widest "
                    >
                        Your Message
                    </label>
                    <textarea
                        id="message"
                        placeholder="Your Message"
                        {...register("message")}
                        aria-invalid={!!errors.message}
                        className="w-full min-h-37.5 bg-white px-4 py-3 shadow-none focus-visible:border-gray-600 focus-visible:ring-0"
                    />
                    {errors.message && (
                        <p className="text-sm text-red-600">{errors.message.message}</p>
                    )}
                </div>
            </div>

            {/* Consent and Submit */}
            <div
                className="flex flex-col gap-6 border-t border-[#9E9094] pt-8 sm:flex-row sm:items-center sm:justify-between">
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
                    className="max-sm:mx-auto max-sm:my-10 cursor-pointer flex gap-2 h-12 shrink-0 px-8 text-sm font-medium uppercase tracking-wider"
                >
                    {isSubmitting ? (
                        "Submitting..."
                    ) : (
                        <>
                            Submit
                            <ChevronRight className="ml-1 size-4"/>
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
