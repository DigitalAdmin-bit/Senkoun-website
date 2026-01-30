import Link from "next/link";

export default function WantToExploreMore() {
    return (
        <section className="main-container bg-white py-20 mt-30 text-center">
            <h1 className="text-[#B8853A] text-5xl text-center">
                WANT TO EXPLORE
                <br/>
                OUR HOMES ?
            </h1>
            <p className="text-[#64565A] mt-10 max-w-[60%] mx-auto text-sm leading-relaxed text-balance mb-10">
                To request a callback, a brochure, or to visit one of our homes, please
                fill in our enquiry form and we will be in touch to assist you with your
                enquiry. Alternatively, please call us on +44 12345678
            </p>

            <Link
                href="/enquire"
                className="text-[#64565A] border-[#64565A] border px-6 py-3 hover:bg-black/10 transition-colors duration-300 inline-block tracking-wide text-sm"
            >
                ENQUIRE
            </Link>
        </section>
    );
}
