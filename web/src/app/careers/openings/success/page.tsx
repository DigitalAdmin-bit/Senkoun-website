import Link from "next/link";
import {CheckCircle} from "lucide-react";
import {Button} from "@/components/ui/button";

interface PageProps {
    searchParams: {
        email?: string;
    };
}

export default function ApplicationSuccess({searchParams}: PageProps) {
    const email = searchParams.email || "your email";

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4">
            <div className="max-w-xl w-full">
                {/* Success Card */}
                <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 md:p-12">
                    {/* Success Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            {/* Envelope */}
                            <div className="w-32 h-32 relative">
                                <svg viewBox="0 0 120 120" className="w-full h-full">
                                    {/* Envelope body */}
                                    <rect
                                        x="20"
                                        y="40"
                                        width="80"
                                        height="50"
                                        rx="4"
                                        fill="white"
                                        stroke="#D1D5DB"
                                        strokeWidth="2"
                                    />
                                    {/* Envelope flap */}
                                    <path
                                        d="M20 40 L60 70 L100 40"
                                        fill="none"
                                        stroke="#D1D5DB"
                                        strokeWidth="2"
                                    />
                                    {/* Green checkmark circle */}
                                    <circle cx="60" cy="50" r="20" fill="#22C55E"/>
                                    <path
                                        d="M52 50 L57 55 L68 44"
                                        fill="none"
                                        stroke="white"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                {/* Decorative stars */}
                                <div className="absolute top-2 left-8 text-green-500 text-xl">✦</div>
                                <div className="absolute top-4 right-8 text-green-500 text-sm">✦</div>
                                <div className="absolute bottom-8 left-4 text-green-500 text-sm">✦</div>
                                <div className="absolute bottom-4 right-4 text-green-500 text-xl">✦</div>
                            </div>
                        </div>
                    </div>

                    {/* Success Message */}
                    <div className="text-center mb-8">
                        <h1 className="font-body text-2xl md:text-3xl font-semibold text-[#64565A] mb-2">
                            Your application has been
                        </h1>
                        <h2 className="text-2xl font-body md:text-3xl font-semibold text-[#64565A]">
                            submitted successfully!
                        </h2>
                    </div>

                    {/* Email Confirmation */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-gray-700">
                                    You will get an email confirmation at{" "}
                                    <span className="font-semibold text-[#64565A]">{email}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Privacy Notice */}
                    <div className="text-center mb-8">
                        <p className="text-xs text-gray-600 leading-relaxed">
                            SENKOUN collects and processes personal data in accordance with applicable data protection laws.
                            <br />
                            If you are a European job Applicant see the{" "}
                            <Link href="/privacy-policy" className="text-[#B8853A] underline hover:text-[#9a6e2f]">
                                privacy notice
                            </Link>{" "}
                            for further detail.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/careers/openings">
                            <Button className="w-full sm:w-auto bg-[#B8853A] hover:bg-[#9a6e2f] text-white px-8 py-3 rounded-md font-medium transition-colors">
                                View all jobs
                            </Button>
                        </Link>
                        <Link href="/">
                            <Button
                                variant="outline"
                                className="w-full sm:w-auto border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-md font-medium transition-colors"
                            >
                                View website
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}