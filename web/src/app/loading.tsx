export default function Loading() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center">
            <div className="flex flex-col items-center gap-6">
                <div className="relative">
                    <div className="w-20 h-20 rounded-full border-4 border-[#b8853a]/20 border-t-[#b8853a] animate-spin" />

                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#b8853a]/30 animate-pulse" />
                    </div>

                    {/* Center icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 100 100"
                            className="text-[#b8853a]"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M50 10 L60 30 L82 30 L65 45 L72 65 L50 52 L28 65 L35 45 L18 30 L40 30 Z"
                                fill="currentColor"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}