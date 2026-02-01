'use client';

import Link from "next/link";
import { Home, RefreshCcw } from "lucide-react";

export default function Error({
    error: _error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center space-y-8">

                {/* 500 Number */}
                <div className="relative">
                    <h1 className="font-heading text-[150px] sm:text-[200px] leading-none text-[#b8853a]/20 select-none">
                        500
                    </h1>
                </div>

                {/* Error Message */}
                <div className="space-y-4">
                    <h2 className="font-heading text-4xl sm:text-5xl text-[#64565A]">
                        Something Went Wrong
                    </h2>
                    <p className="text-[#64565A]/80 text-base sm:text-lg max-w-md mx-auto">
                        We encountered an unexpected error. Please try again or return to the homepage.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                    <button
                        onClick={reset}
                        className="inline-flex items-center gap-2 bg-[#b8853a] text-white px-8 py-3 hover:bg-[#a07532] transition-colors font-body"
                    >
                        <RefreshCcw className="size-4" />
                        TRY AGAIN
                    </button>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-[#64565a] border border-[#64565a] px-8 py-3 hover:bg-[#64565a] hover:text-white transition-colors font-body"
                    >
                        <Home className="size-4" />
                        GO TO HOMEPAGE
                    </Link>
                </div>

                <br/><br/>
            </div>
        </div>
    );
}
