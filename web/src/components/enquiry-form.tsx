"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {ChevronRight} from "lucide-react";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Select} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {createEnquiry} from "@/lib/apis/enquires";

const enquirySchema = z.object({
    type: z.string().min(1, "Please select an enquiry type"),
    home: z.string().min(1, "Please select a home"),
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.string().email("Please enter a valid email address"),
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
    homes: { id: number; name: string; slug: string }[];
}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
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
                home: Number.parseInt(data.home, 10),
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                phone: data.phone,
                message: data.message,
            });

            setIsSubmitted(true);
            reset();
        } catch (error) {
            console.error("Failed to submit enquiry:", error);
            setSubmitError("Failed to submit your enquiry. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="rounded-lg bg-green-50 p-6 text-center">
                <h3 className="text-lg font-semibold text-green-900">
                    Thank you for your enquiry!
                </h3>
                <p className="mt-2 text-green-700">
                    We'll get back to you as soon as possible.
                </p>
                <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="mt-4"
                >
                    Submit Another Enquiry
                </Button>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-12 bg-[#f8f7f5] p-8 md:p-12"
        >
            {/* Enquiry Type and Home Selection */}
            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <label
                        htmlFor="type"
                        className="block text-[10px] font-medium uppercase tracking-widest text-gray-500"
                    >
                        Please Select*
                    </label>
                    <Select
                        id="type"
                        {...register("type")}
                        aria-invalid={!!errors.type}
                        className="h-12 border-0 border-b-2 border-gray-300 bg-transparent px-0 text-sm uppercase tracking-wide shadow-none focus-visible:border-gray-600 focus-visible:ring-0"
                    >
                        <option value="">ENQUIRY TYPE*</option>
                        {enquiryTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                                {type.label.toUpperCase()}
                            </option>
                        ))}
                    </Select>
                    {errors.type && (
                        <p className="text-sm text-red-600">{errors.type.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="home"
                        className="block text-[10px] font-medium uppercase tracking-widest text-gray-500"
                    >
                        Select Home(s)*
                    </label>
                    <Select
                        id="home"
                        {...register("home")}
                        aria-invalid={!!errors.home}
                        className="h-12 border-0 border-b-2 border-gray-300 bg-transparent px-0 text-sm uppercase tracking-wide shadow-none focus-visible:border-gray-600 focus-visible:ring-0"
                    >
                        <option value="">HOMES *</option>
                        {homes.map((home) => (
                            <option key={home.id} value={home.id.toString()}>
                                {home.name.toUpperCase()}
                            </option>
                        ))}
                    </Select>
                    {errors.home && (
                        <p className="text-sm text-red-600">{errors.home.message}</p>
                    )}
                </div>
            </div>

            {/* Your Details Section */}
            <div className="space-y-8 border-t border-gray-300 pt-8">
                <h3 className="text-base font-normal text-gray-900">Your Details</h3>

                <div className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                        <label
                            htmlFor="first_name"
                            className="block text-[10px] font-medium uppercase tracking-widest text-gray-500"
                        >
                            First Name *
                        </label>
                        <Input
                            id="first_name"
                            type="text"
                            placeholder="First Name"
                            {...register("first_name")}
                            aria-invalid={!!errors.first_name}
                            className="h-12 border-0 border-b-2 border-gray-300 bg-transparent px-0 shadow-none focus-visible:border-gray-600 focus-visible:ring-0"
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
                        <Input
                            id="last_name"
                            type="text"
                            placeholder="Last Name"
                            {...register("last_name")}
                            aria-invalid={!!errors.last_name}
                            className="h-12 border-0 border-b-2 border-gray-300 bg-transparent px-0 shadow-none focus-visible:border-gray-600 focus-visible:ring-0"
                        />
                        {errors.last_name && (
                            <p className="text-sm text-red-600">{errors.last_name.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="email"
                            className="block text-[10px] font-medium uppercase tracking-widest text-gray-500"
                        >
                            Email Address *
                        </label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Email Address"
                            {...register("email")}
                            aria-invalid={!!errors.email}
                            className="h-12 border-0 border-b-2 border-gray-300 bg-transparent px-0 shadow-none focus-visible:border-gray-600 focus-visible:ring-0"
                        />
                        {errors.email && (
                            <p className="text-sm text-red-600">{errors.email.message}</p>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="phone"
                        className="block text-[10px] font-medium uppercase tracking-widest text-gray-500"
                    >
                        Phone Number *
                    </label>
                    <Input
                        id="phone"
                        type="tel"
                        placeholder="Phone Number"
                        {...register("phone")}
                        aria-invalid={!!errors.phone}
                        className="h-12 border-0 border-b-2 border-gray-300 bg-transparent px-0 shadow-none focus-visible:border-gray-600 focus-visible:ring-0 md:max-w-xs"
                    />
                    {errors.phone && (
                        <p className="text-sm text-red-600">{errors.phone.message}</p>
                    )}
                </div>
            </div>

            {/* Message Section */}
            <div className="space-y-8 border-t border-gray-300 pt-8">
                <h3 className="text-base font-normal text-gray-900">
                    Write Your Message
                </h3>

                <div className="space-y-2">
                    <label
                        htmlFor="message"
                        className="block text-[10px] font-medium uppercase tracking-widest text-gray-500"
                    >
                        Your Message
                    </label>
                    <Textarea
                        id="message"
                        placeholder="Your Message"
                        {...register("message")}
                        aria-invalid={!!errors.message}
                        className="min-h-[150px] border-2 border-gray-300 bg-white px-4 py-3 shadow-none focus-visible:border-gray-600 focus-visible:ring-0"
                    />
                    {errors.message && (
                        <p className="text-sm text-red-600">{errors.message.message}</p>
                    )}
                </div>
            </div>

            {/* Consent and Submit */}
            <div
                className="flex flex-col gap-6 border-t border-gray-300 pt-8 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3 sm:max-w-2xl">
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

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-12 shrink-0 px-8 text-sm font-medium uppercase tracking-wider"
                >
                    {isSubmitting ? (
                        "Submitting..."
                    ) : (
                        <>
                            Submit
                            <ChevronRight className="ml-1 size-4"/>
                        </>
                    )}
                </Button>
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
