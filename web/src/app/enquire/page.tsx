import EnquiryForm from "@/components/older/EnquiryForm";

export const metadata = {
    title: "Enquire | Senkoun Care Homes",
    description:
        "Get in touch with Senkoun Care Homes. Our friendly team is here to answer your questions and help you find the right care for your loved one.",
};

export default function EnquirePage() {
    return (
        <>
            {/* Hero Section */}
            <section className="bg-primary py-16 md:py-24">
                <div className="container text-center">
                    <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">
                        Make an Enquiry
                    </h1>
                    <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
                        We're here to help. Fill out the form below and a member of our team
                        will be in touch within 24 hours.
                    </p>
                </div>
            </section>

            {/* Form Section */}
            <section className="section bg-off-white">
                <div className="container">
                    <div className="mx-auto max-w-3xl">
                        <div className="rounded-2xl bg-white p-6 shadow-sm md:p-10">
                            <EnquiryForm />
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Info Section */}
            <section className="section bg-white">
                <div className="container">
                    <div className="mx-auto max-w-4xl">
                        <div className="grid gap-8 md:grid-cols-3">
                            {/* Phone */}
                            <div className="text-center">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                                    <svg
                                        className="h-6 w-6 text-primary"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="mt-4 font-heading text-lg font-semibold text-gray-900">
                                    Call Us
                                </h3>
                                <p className="mt-2 text-gray-600">
                                    <a href="tel:+442012345678" className="hover:text-primary">
                                        020 1234 5678
                                    </a>
                                </p>
                                <p className="text-sm text-gray-500">Mon-Sun, 8am-8pm</p>
                            </div>

                            {/* Email */}
                            <div className="text-center">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                                    <svg
                                        className="h-6 w-6 text-primary"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                                        />
                                    </svg>
                                </div>
                                <h3 className="mt-4 font-heading text-lg font-semibold text-gray-900">
                                    Email Us
                                </h3>
                                <p className="mt-2 text-gray-600">
                                    <a
                                        href="mailto:info@senkoun.com"
                                        className="hover:text-primary"
                                    >
                                        info@senkoun.com
                                    </a>
                                </p>
                                <p className="text-sm text-gray-500">We reply within 24 hours</p>
                            </div>

                            {/* Visit */}
                            <div className="text-center">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                                    <svg
                                        className="h-6 w-6 text-primary"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="mt-4 font-heading text-lg font-semibold text-gray-900">
                                    Visit Us
                                </h3>
                                <p className="mt-2 text-gray-600">Book a tour at any of our homes</p>
                                <p className="text-sm text-gray-500">By appointment only</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
