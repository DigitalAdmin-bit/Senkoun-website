import Link from "next/link";

export default function CareerSuccessPage() {
    return (
        <div className="text-[#64565A] main-container text-center py-40">
            <h1 className="text-[#B8853A] text-5xl mb-10">
                Thank you for your application.
            </h1>

            <p>
                We have received your career enquiry and will review your application
                carefully.
                <br />
                <br />
                Our HR team will be in touch with you shortly.
                <br />
                <br />
                If you require immediate assistance, please call +44 (0) 20 3411 0711.
                <br />
                <br />
                We very much look forward to considering your application.
                <br />
                <br />
                If you would like to explore more about SENKOUN in the meantime
                <br />
                <br />
            </p>
            <br />

            <Link
                href="/"
                className="mx-auto border px-6 py-2 border-[#64565A] hover:bg-black/10 transition-colors duration-300 inline-block tracking-wide text-sm text-[#64565A]"
            >
                EXPLORE
            </Link>
        </div>
    );
}

