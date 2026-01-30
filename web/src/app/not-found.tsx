
import Link from "next/link";
import { Home} from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center space-y-8">

                {/* 404 Number */}
                <div className="relative">
                    <h1 className="font-heading text-[150px] sm:text-[200px] leading-none text-[#b8853a]/20 select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                            width="80"
                            height="80"
                            viewBox="0 0 100 100"
                            className="text-[#b8853a]"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M50 10 L60 30 L82 30 L65 45 L72 65 L50 52 L28 65 L35 45 L18 30 L40 30 Z"
                                fill="currentColor"
                                opacity="0.3"
                            />
                        </svg>
                    </div>
                </div>

                {/* Error Message */}
                <div className="space-y-4">
                    <h2 className="font-heading text-4xl sm:text-5xl text-[#64565A]">
                        Page Not Found
                    </h2>
                    <p className="text-[#64565A]/80 text-base sm:text-lg max-w-md mx-auto">
                        We couldn't find the page you're looking for. It may have been moved or deleted.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-[#64565a] border border-[#64565a] px-8 py-3 hover:bg-[#64565a] hover:text-white transition-colors font-body"
                    >
                        <Home className="size-4" />
                        GO TO HOMEPAGE
                    </Link>
                </div>

                {/* Helpful Links */}
                <div className="pt-8 border-t border-[#64565A]/10">
                    <p className="text-sm text-[#64565A]/60 mb-4">You might be interested in:</p>
                    <div className="flex flex-wrap gap-4 justify-center text-sm">
                        <Link href="/care-homes/all" className="text-[#b8853a] hover:underline">
                            Our Care Homes
                        </Link>
                        <span className="text-[#64565A]/30">•</span>
                        <Link href="/our-story" className="text-[#b8853a] hover:underline">
                            Our Story
                        </Link>
                        <span className="text-[#64565A]/30">•</span>
                        <Link href="/enquire" className="text-[#b8853a] hover:underline">
                            Enquire Now
                        </Link>
                        <span className="text-[#64565A]/30">•</span>
                        <Link href="/careers" className="text-[#b8853a] hover:underline">
                            Careers
                        </Link>
                    </div>
                </div>
                <br/><br/>
            </div>
        </div>
    );
}