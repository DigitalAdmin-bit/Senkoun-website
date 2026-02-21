import Link from "next/link";
import SERVICES from "@/data/services";
import NewsComponent from "@/components/news-component";
import {ScrollAnimation, StaggerAnimation} from "@/components/animations";

function showGreeting() {
    const hours = new Date().getHours();
    if (hours < 12) return "Good Morning!";
    if (hours < 17) return "Good Afternoon!";
    return "Good Evening!";
}

const FOUR_ABOUT = [
    {
        title: "Trust",
        description:
            "We operate with integrity, transparency, and accountability in all our business relationships.",
        image: "/home/trust.webp",
    },
    {
        title: "Empathy",
        description:
            "We believe in forming genuine bonds for an enriching, fulfilling experience for all.",
        image: "/home/empathy.webp",
    },
    {
        title: "Excellence",
        description:
            "Achieving excellence is central to our ability for delivering superior results.",
        image: "/home/excellence.webp",
    },
    {
        title: "Community",
        description: "Community support groups specific to disease condition.",
        image: "/home/community.webp",
    },
];

export default function Home() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 text-center text-white">
                <div
                    className="z-0 absolute inset-0 bg-[linear-gradient(90deg,rgba(154,83,37,1)_0%,rgba(155,94,38,1)_27%,rgba(208,139,31,1)_54%,rgba(208,140,35,1)_58%,rgba(209,147,50,1)_72%,rgba(198,135,47,1)_79%,rgba(169,104,40,1)_91%,rgba(146,79,34,1)_100%)]"/>
                <div
                    className="absolute inset-0 z-0 bg-[url('/swan.webp')] bg-repeat bg-size-[44px] mix-blend-overlay"/>

                <div className="container z-10">
                    <ScrollAnimation animation="fadeIn" delay={0.2}>
                        <p className="text-sm tracking-[0.3em] uppercase mb-4 font-body opacity-90">
                            {showGreeting()}
                        </p>
                    </ScrollAnimation>
                    <ScrollAnimation animation="slideUp" delay={0.4}>
                        <h1 className="uppercase z-10 relative font-heading text-7xl max-sm:text-5xl mb-6 leading-tight">
                            WELCOME TO
                            <br/>
                            SENKOUN
                        </h1>
                    </ScrollAnimation>
                </div>
                <br/>
                <br/>
                <br/>

                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 z-20">
                    <svg
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                        className="relative block w-full h-15 md:h-25"
                    >
                        <path
                            d="M 0 120 L 1200 120 L 1200 120 Q 614 -31 0 120 Z"
                            className="fill-[#fbf5f3]"
                        ></path>
                    </svg>
                </div>
            </section>

            <section className="mt-10 w-[40%] max-sm:w-[80%] mx-auto my-30" id="about-senkoun">
                <ScrollAnimation animation="fadeIn">
                    <p className="text-[#64565A] text-sm text-center mb-10">
                        ABOUT SENKOUN
                    </p>
                </ScrollAnimation>
                <ScrollAnimation animation="slideUp" delay={0.2}>
                    <p className="text-center text-sm text-[#64565A] leading-relaxed text-pretty">
                        Senkoun is more than a healthcare provider — we&apos;re a team of
                        dedicated people committed to transforming the way care feels for
                        those who need it most. From our warm and welcoming care homes to our
                        reliable domiciliary and supported living services, we empower
                        individuals to live safely, confidently, and with dignity, wherever
                        they call home.
                        <br/>
                        <br/>
                        Our approach blends compassion with innovation. We embrace modern
                        technology, specialised clinical expertise, and personalised care
                        planning to ensure every person receives the support that truly
                        enhances their daily life. Beyond our care services, Senkoun also
                        provides a high‑quality staffing agency, supplying skilled nurses,
                        carers, and support workers to healthcare partners who share our
                        passion for excellence.
                    </p>
                </ScrollAnimation>
                <br/>
                <ScrollAnimation animation="slideUp" delay={0.3}>
                    <div
                        className="w-full flex max-sm:flex-col max-sm:gap-5 h-fit justify-center items-center mt-10 font-heading text-[#64565A]">
                        <div className="flex-1 flex flex-col items-center gap-2">
                            <span className="text-5xl">500+</span>
                            <span className="text-nowrap">Happy Customers</span>
                        </div>
                        <div
                            className="border-r border-l max-sm:border-l-0 max-sm:border-r-0 border-[#64565A]/50 flex-1 flex flex-col items-center gap-2">
                            <span className="text-5xl">100+</span>
                            <span className="text-nowrap">Dedicated Staff Members</span>
                        </div>
                        <div/>
                        <div className=" flex-1 flex flex-col items-center gap-2">
                            <span className="text-5xl">5+</span>
                            <span className="text-nowrap">Locations</span>
                        </div>
                    </div>
                </ScrollAnimation>
            </section>

            <section className="my-50 text-[#64565A] flex gap-3 main-container mx-auto justify-center flex-wrap">
                <StaggerAnimation staggerDelay={0.15} className="w-full flex max-sm:flex-col gap-3">
                    {FOUR_ABOUT.map((item, index) => (
                        <div className="flex-1 bg-white p-10" key={index}>
                            <div className="w-full flex flex-col items-center mb-5">
                                <img src={item.image} alt={item.title} className="h-25"/>
                            </div>
                            <h2 className="text-3xl text-center mb-7">{item.title}</h2>
                            <p className="text-center text-pretty">{item.description}</p>
                        </div>
                    ))}
                </StaggerAnimation>
            </section>
            <section className="mt-30 main-container space-y-30" id="our-services">
                {SERVICES.map((service, index) => (
                    <ScrollAnimation
                        key={index}
                        animation={service.imagePosition === "right" ? "slideLeft" : "slideRight"}
                        delay={0.1}
                    >
                        <div
                            className={`gap-[10%] max-sm:gap-1 flex max-sm:flex-col ${
                                service.imagePosition === "right" ? "flex-row-reverse" : ""
                            }`}
                        >
                            <img
                                className="w-[45%] object-cover max-sm:w-full max-sm:mb-10"
                                alt={service.category}
                                src={service.image}
                            />
                            <div className="flex-1 h-full">
                                <p className="text-[#64565a] text-sm mb-5 max-sm:mb-1">
                                    {service.category}
                                </p>
                                <h2 className="font-heading max-sm:wrap-break-word text-[#b8853a] text-4xl tracking-[0] whitespace-pre-line mb-10 max-sm:mb-4">
                                    {service.title}
                                </h2>
                                <p className="text-[#64565a] text-sm tracking-[0] line-clamp-10 mb-10 max-sm:mb-4">
                                    {service.description}
                                </p>
                                <Link
                                    href={service.link}
                                    className="text-[#64565a] text-sm border border-[#64565a] px-8 py-4 hover:bg-gray-200 transition cursor-pointer">
                                    GET STARTED
                                </Link>
                            </div>
                        </div>
                    </ScrollAnimation>
                ))}
            </section>
            <br/>
            {/* Join Our Team CTA Section */}
            <section className="bg-[#b8853a] my-30 py-16 md:py-24 text-center text-white">
                <ScrollAnimation animation="fadeIn">
                    <div className="text-sm mb-10 opacity-80 max-sm:mb-5">CAREERS</div>
                </ScrollAnimation>
                <ScrollAnimation animation="slideUp" delay={0.2}>
                    <h2 className="font-heading text-5xl mb-6">JOIN OUR TEAM</h2>
                </ScrollAnimation>
                <ScrollAnimation animation="fadeIn" delay={0.3}>
                    <p className="text-sm font-normal opacity-80 max-w-xl mx-auto mb-8 max-sm:mb-1 max-sm:w-[90%]">
                        At Senkoun Group, we believe great care starts with great people. We’re always looking for
                        compassionate, dedicated individuals to join our growing team across Essex. Whether you’re an
                        experienced carer, support worker, nurse, or someone new to the care sector, we offer full
                        training, flexible shifts, career development, and a supportive working environment. Join us and
                        make a real difference in the lives of those we care for—every day.
                    </p>
                </ScrollAnimation>
                <br/>
                <ScrollAnimation animation="scaleIn" delay={0.4}>
                    <Link
                        href="/careers"
                        className="btn bg-white text-amber hover:bg-gray-100"
                    >
                        APPLY NOW
                    </Link>
                </ScrollAnimation>
            </section>

            {/* News Section */}
            <NewsComponent/>
        </>
    );
}
