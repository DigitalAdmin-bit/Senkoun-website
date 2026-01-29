import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Placeholder data - will be replaced with Strapi API calls
const careHomesData: Record<string, {
    name: string;
    location: string;
    address: string;
    phone: string;
    email: string;
    tagline: string;
    description: string;
    features: string[];
    services: string[];
    images: string[];
}> = {
    "emerald-lodge": {
        name: "Emerald Lodge",
        location: "London, SE1",
        address: "123 Care Lane, London, SE1 2AB",
        phone: "020 1234 5678",
        email: "emerald@senkoun.com",
        tagline: "A peaceful haven with stunning garden views",
        description: `Emerald Lodge is a beautiful care home nestled in the heart of South East London. With stunning gardens and modern facilities, we provide exceptional nursing and residential care in a warm, welcoming environment.

Our dedicated team of experienced carers and nurses work around the clock to ensure every resident receives personalized attention and the highest standard of care. We believe in creating a home-from-home atmosphere where residents can maintain their independence whilst receiving the support they need.`,
        features: [
            "24-hour nursing care",
            "Beautiful landscaped gardens",
            "En-suite bedrooms",
            "Activity coordinators",
            "Restaurant-quality dining",
            "Family visiting rooms",
            "On-site hairdressing salon",
            "Regular entertainment",
        ],
        services: ["Nursing Care", "Residential Care", "Respite Care"],
        images: ["/images/emerald-1.jpg", "/images/emerald-2.jpg"],
    },
    "joseph-lodge": {
        name: "Joseph Lodge",
        location: "London, SW3",
        address: "456 Wellness Road, London, SW3 4CD",
        phone: "020 2345 6789",
        email: "joseph@senkoun.com",
        tagline: "Modern comfort in a historic setting",
        description: `Joseph Lodge combines the charm of a period building with modern care facilities. Located in the prestigious Chelsea area, our home specializes in dementia and nursing care, providing a secure and stimulating environment for residents.

Our award-winning dementia care program focuses on maintaining cognitive function and quality of life through music therapy, reminiscence activities, and personalized care plans developed in partnership with families.`,
        features: [
            "Specialized dementia care unit",
            "Secure garden courtyards",
            "Memory boxes outside each room",
            "Sensory stimulation rooms",
            "Music therapy sessions",
            "Regular family events",
            "Cinema room",
            "Café-style dining",
        ],
        services: ["Dementia Care", "Nursing Care", "Palliative Care"],
        images: ["/images/joseph-1.jpg", "/images/joseph-2.jpg"],
    },
};

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return Object.keys(careHomesData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const home = careHomesData[slug];
    if (!home) return { title: "Care Home Not Found" };

    return {
        title: `${home.name} | Senkoun Care Homes`,
        description: home.tagline,
    };
}

export default async function CareHomeDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const home = careHomesData[slug];

    if (!home) {
        notFound();
    }

    return (
        <>
            {/* Hero Section */}
            <section className="relative min-h-[50vh] flex items-end overflow-hidden bg-primary">
                <div className="absolute inset-0">
                    <Image
                        src={home.images[0] || "/images/care-home-placeholder.jpg"}
                        alt={home.name}
                        fill
                        priority
                        className="object-cover opacity-40"
                    />
                </div>
                <div className="container relative z-10 py-16">
                    <div className="max-w-3xl">
                        <p className="text-accent font-medium">{home.location}</p>
                        <h1 className="mt-2 font-heading text-4xl font-bold text-white sm:text-5xl md:text-6xl">
                            {home.name}
                        </h1>
                        <p className="mt-4 text-xl text-white/80">{home.tagline}</p>
                    </div>
                </div>
            </section>

            {/* Quick Info Bar */}
            <section className="bg-white border-b border-gray-200 py-6">
                <div className="container">
                    <div className="flex flex-wrap gap-6 text-sm">
                        <div className="flex items-center gap-2">
                            <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                            <span>{home.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                            </svg>
                            <a href={`tel:${home.phone.replace(/\s/g, "")}`} className="hover:text-primary">
                                {home.phone}
                            </a>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </svg>
                            <a href={`mailto:${home.email}`} className="hover:text-primary">
                                {home.email}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="section bg-white">
                <div className="container">
                    <div className="grid gap-12 lg:grid-cols-3">
                        {/* Description */}
                        <div className="lg:col-span-2">
                            <h2 className="font-heading text-2xl font-bold text-gray-900 sm:text-3xl">
                                About {home.name}
                            </h2>
                            <div className="mt-6 prose prose-lg text-gray-600 whitespace-pre-line">
                                {home.description}
                            </div>

                            {/* Features */}
                            <h3 className="mt-12 font-heading text-xl font-bold text-gray-900">
                                Facilities & Features
                            </h3>
                            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                                {home.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <svg className="h-5 w-5 flex-shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                        <span className="text-gray-600">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Sidebar */}
                        <div>
                            <div className="sticky top-24 rounded-2xl bg-off-white p-6">
                                <h3 className="font-heading text-lg font-bold text-gray-900">
                                    Care Services
                                </h3>
                                <ul className="mt-4 space-y-2">
                                    {home.services.map((service, index) => (
                                        <li key={index} className="flex items-center gap-2 text-gray-600">
                                            <span className="h-2 w-2 rounded-full bg-primary"></span>
                                            {service}
                                        </li>
                                    ))}
                                </ul>

                                <hr className="my-6 border-gray-200" />

                                <h3 className="font-heading text-lg font-bold text-gray-900">
                                    Book a Visit
                                </h3>
                                <p className="mt-2 text-sm text-gray-600">
                                    See for yourself what makes {home.name} special. Book a tour with our friendly team.
                                </p>
                                <Link href="/enquire" className="btn btn-primary mt-4 w-full">
                                    Enquire Now
                                </Link>
                                <a
                                    href={`tel:${home.phone.replace(/\s/g, "")}`}
                                    className="btn btn-outline mt-3 w-full"
                                >
                                    Call {home.phone}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section bg-primary">
                <div className="container text-center">
                    <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
                        Interested in {home.name}?
                    </h2>
                    <p className="mt-4 text-white/80 max-w-2xl mx-auto">
                        Get in touch with our team to learn more or arrange a visit. We're here to help you find the right care for your loved one.
                    </p>
                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                        <Link href="/enquire" className="btn bg-accent hover:bg-accent-dark text-white">
                            Make an Enquiry
                        </Link>
                        <Link href="/care-homes" className="btn bg-white text-primary hover:bg-gray-100">
                            View All Homes
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
