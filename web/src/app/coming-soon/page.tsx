import Link from "next/link";

export default function ComingSoonPage() {
	return <div className="main-container flex flex-col items-center justify-center gap-8 py-16">

        <h1 className="text-7xl mb-5">Coming Soon</h1>
        <p className="mb-5">
            We are working hard to bring you this service. Stay tuned for updates!
        </p>

        <div>
            <Link href="/" className="main-button ">Go Home</Link>
        </div>
    </div>
}

