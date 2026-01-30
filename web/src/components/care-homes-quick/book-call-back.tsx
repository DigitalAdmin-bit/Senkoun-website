"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {createBookACall, createBookATour} from "@/lib/apis/enquires";
import { ChevronRight } from "lucide-react";

function toFullTime(input: string): string {
    const [mm, ss] = input.split(":").map(Number);

    return `00:${mm.toString().padStart(2, "0")}:${ss
        .toString()
        .padStart(2, "0")}.000`;
}


const bookCallSchema = z.object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    phone: z.string().min(1, "Phone number is required"),
    email: z.string().email("Please enter a valid email address"),
    preferred_date: z.string().min(1, "Preferred date is required"),
    preferred_time: z.string().min(1, "Preferred time is required"),
    consent: z.boolean().refine((val) => val === true, {
        message: "You must consent to continue",
    }),
});

type BookCallFormData = z.infer<typeof bookCallSchema>;

export default function BookCallBack({type, children, homeId}: {
    children: React.ReactNode;
    homeId: string;
    type: "call-back" | "tour";
}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<BookCallFormData>({
        resolver: zodResolver(bookCallSchema),
    });

    const onSubmit = async (data: BookCallFormData) => {
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            console.log('Submitting data:', data);
            const inputData = {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                phone: data.phone,
                preferred_date: data.preferred_date,
                preferred_time: toFullTime(data.preferred_time),
                home: homeId,
            }
            if (type === "tour") {
                await createBookATour(inputData);
            } else {
                await createBookACall(inputData);
            }

            setIsSuccess(true);
            reset();
        } catch (error) {
            setSubmitError(
                "Failed to submit your request. Please try again later."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (!open) {
            // Reset form state when dialog closes
            setTimeout(() => {
                setIsSuccess(false);
                setSubmitError(null);
                reset();
            }, 300);
        }
    };

    return <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContent className="text-[#64565A] max-w-[80%] px-10 max-h-[98vh] overflow-y-auto rounded-none">
            <DialogHeader className="sr-only">
                <DialogTitle>Enter your Details to Book a {type === 'call-back' ? 'Call Back' : 'Tour'}</DialogTitle>
                <DialogDescription>
                    Fill in your details and we will call you back at your preferred time.
                </DialogDescription>
            </DialogHeader>

            {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                        <svg
                            className="h-8 w-8 text-green-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                    <h3 className="mb-2 text-2xl font-bold text-gray-900">Thank You!</h3>
                    <p className="text-gray-600">
                        We've received your request and will call you back soon.
                    </p>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-6">
                    <div className="text-center">
                        <h2 className="text-2xl font-medium text-[#D4A574]">
                            Enter your Details to<br />{type === 'call-back' ? "Book a Call Back" : "Book a Tour"}
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
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
                                className="h-12 border-0 border-b-2 border-gray-300 bg-transparent px-0 shadow-none focus-visible:border-gray-600 focus-visible:ring-0 rounded-none"
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
                                className="h-12 border-0 border-b-2 border-gray-300 bg-transparent px-0 shadow-none focus-visible:border-gray-600 focus-visible:ring-0 rounded-none"
                            />
                            {errors.last_name && (
                                <p className="text-sm text-red-600">
                                    {errors.last_name.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
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
                                className="h-12 border-0 border-b-2 border-gray-300 bg-transparent px-0 shadow-none focus-visible:border-gray-600 focus-visible:ring-0 rounded-none"
                            />
                            {errors.phone && (
                                <p className="text-sm text-red-600">
                                    {errors.phone.message}
                                </p>
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
                                className="h-12 border-0 border-b-2 border-gray-300 bg-transparent px-0 shadow-none focus-visible:border-gray-600 focus-visible:ring-0 rounded-none"
                            />
                            {errors.email && (
                                <p className="text-sm text-red-600">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Date and Time Fields */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label
                                htmlFor="preferred_date"
                                className="block text-[10px] font-medium uppercase tracking-widest text-gray-500"
                            >
                                Preferred Date *
                            </label>
                            <Input
                                id="preferred_date"
                                type="date"
                                placeholder="dd/mm/yyyy"
                                {...register("preferred_date")}
                                aria-invalid={!!errors.preferred_date}
                                className="h-12 border-0 border-b-2 border-gray-300 bg-transparent px-0 shadow-none focus-visible:border-gray-600 focus-visible:ring-0 rounded-none"
                            />
                            {errors.preferred_date && (
                                <p className="text-sm text-red-600">
                                    {errors.preferred_date.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="preferred_time"
                                className="block text-[10px] font-medium uppercase tracking-widest text-gray-500"
                            >
                                Preferred Time *
                            </label>
                            <Input
                                id="preferred_time"
                                type="time"
                                placeholder="--:--"
                                {...register("preferred_time")}
                                aria-invalid={!!errors.preferred_time}
                                className="h-12 border-0 border-b-2 border-gray-300 bg-transparent px-0 shadow-none focus-visible:border-gray-600 focus-visible:ring-0 rounded-none"
                            />
                            {errors.preferred_time && (
                                <p className="text-sm text-red-600">
                                    {errors.preferred_time.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Consent */}
                    <div className="border-t border-gray-300 pt-6">
                        <div className="flex items-start gap-3">
                            <Checkbox
                                id="consent"
                                {...register("consent")}
                                aria-invalid={!!errors.consent}
                                className="mt-1"
                            />
                            <label
                                htmlFor="consent"
                                className="text-xs leading-relaxed text-gray-600"
                            >
                                By submitting this enquiry, you consent to us using your data to
                                provide you with the information requested and to contact you through
                                the method(s) you have chosen, and confirm that you have read and
                                understood our{" "}
                                <a href="/privacy-policy" className="text-primary underline">
                                    Privacy Policy
                                </a>
                            </label>
                        </div>
                        {errors.consent && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.consent.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-0">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="cursor-pointer border-0 flex items-center gap-1 h-12 px-8 text-sm font-medium uppercase tracking-wider"
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

                    {submitError && (
                        <div className="rounded-lg bg-red-50 p-4 text-red-700">
                            {submitError}
                        </div>
                    )}
                </form>
            )}
        </DialogContent>
    </Dialog>
}