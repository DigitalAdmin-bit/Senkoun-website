export default function NewsSkeleton() {
    return (
        <>
            {[1, 2, 3].map((i) => (
                <div key={i} className="max-sm:min-w-full border-0 shadow-none bg-transparent animate-pulse">
                    {/* Date skeleton */}
                    <div className="h-5 w-32 bg-gray-300 rounded mb-7"></div>

                    {/* Title skeleton - 2 lines */}
                    <div className="space-y-2 mb-7">
                        <div className="h-7 bg-gray-300 rounded"></div>
                        <div className="h-7 w-3/4 bg-gray-300 rounded"></div>
                    </div>

                    {/* Body skeleton - 4 lines */}
                    <div className="space-y-2 mb-4">
                        <div className="h-4 bg-gray-300 rounded"></div>
                        <div className="h-4 bg-gray-300 rounded"></div>
                        <div className="h-4 bg-gray-300 rounded"></div>
                        <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
                    </div>

                    <br/>
                    <br/>

                    {/* Button skeleton */}
                    <div className="h-10 w-32 bg-gray-300 rounded border border-gray-400"></div>
                </div>
            ))}
        </>
    );
}

