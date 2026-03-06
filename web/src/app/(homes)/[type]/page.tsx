import HeroSection from "@/components/hero-section";
import {Metadata} from "next";
import NewsComponent from "@/components/news/news-component";
import SectionHeader from "@/components/common/section-header";
import {fetchHomes_SHORT} from "@/lib/apis/homes";
import {getHomesPath, getStrapiMediaUrl} from "@/lib/utils";
import Link from "next/link";
import TestimonialCarousel from "@/components/testimonial-carousel";
import SectionContent from "@/components/common/section-content";
import WantToExploreMore from "@/components/want-to-explore-more";
import ALLOWED from "@/app/(homes)/[type]/allowed";
import HOMES_LANGS from "@/app/(homes)/[type]/lang";
import NoHomes from "@/components/no-homes";
import {notFound} from "next/navigation";
import ImageBricksGallery from "@/components/image-bricks-gallery";

interface PageProps {
    params: Promise<{ type: typeof ALLOWED[number] }>;
}


export async function generateMetadata({params}: PageProps): Promise<Metadata> {
    const {type} = await params;
    switch (type) {
        case "care-home":
            return {
                title: "Care Homes",
                description: "",
            }
        case "supported-living":
            return {
                title: "Supported Living",
                description: "",
            }
        default:
            return {
                title: "Not Found",
                description: "The page you're looking for is not found.",
            }
    }
}

export function generateStaticParams() {
    return ALLOWED.map((item) => ({type: item}));
}

export default async function HomesPage({params}: PageProps) {
    const {type} = await params;
    const path = getHomesPath(type);

    if (!path) {
        return notFound();
    }

    const langs = HOMES_LANGS[path.actual];
    const refLangs = HOMES_LANGS[path.ref];
    const data = await fetchHomes_SHORT({featuredOnly: true, limit: 3, type: path.ref});

    const homes = data?.data || [];

    return (
        <>
            {/* Hero Section */}
            <HeroSection bg={refLangs.hero}/>

            <SectionContent
                subtitle={`ABOUT SENKOUN ${langs.subtitle}`}
                title={
                    <>
                        WELCOME TO
                        <br/>
                        SENKOUN {langs.subtitle}
                    </>
                }
                description={
                    <>
                        {refLangs.about.para1}
                        <br/>
                        <br/>
                        {refLangs.about.para2}
                        <br/>
                        <br/>
                        {refLangs.about.para3}
                    </>
                }
            />

            <section className="main-container">
                <SectionHeader
                    title={
                        <>
                            OUR
                            <br/>
                            HOMES
                        </>
                    }
                    subtitle="OUR HOMES"
                    rightTitle="VIEW ALL HOMES"
                    rightLink={path.actual + "/all"}
                />
                <div className="flex flex-wrap gap-20 max-sm:gap-0 my-20 max-sm:mb-0">
                    {homes.length === 0 ? <NoHomes/> : homes.map((home) => (
                        <div key={home.id}
                             className="relative max-w-75 max-sm:max-w-full min-w-75 flex-1 overflow-hidden max-sm:border-b max-sm:pb-20 max-sm:mb-20 last:max-sm:mb-0 last:max-sm:border-b-0 last:max-sm:pb-0">
                            <div className="relative group">
                                <img
                                    className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-300"
                                    src={getStrapiMediaUrl(home.thumbnails[0].url)}
                                    alt={home.thumbnails[0].alternativeText}
                                />
                                <div
                                    className="bg-[#b8853a]/80 text-white absolute inset-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity flex flex-col">
                                    <div className="flex-1 flex items-center justify-center flex-col gap-4">
                                        <a href={`tel:${home.phone}`}
                                           className="flex items-center gap-2 px-4 py-2 justify-center border-2 border-white w-43">
                                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M3.60327 0.860596L5.66577 2.9231C6.28709 3.54442 6.28709 4.55177 5.66577 5.1731C5.04445 5.79442 5.04445 6.80177 5.66577 7.4231L9.04077 10.7981C9.66209 11.4194 10.6695 11.4194 11.2908 10.7981C11.9121 10.1768 12.9195 10.1768 13.5408 10.7981L15.6033 12.8606C16.0175 13.2748 16.0175 13.9464 15.6033 14.3606C13.5322 16.4317 10.1743 16.4317 8.10327 14.3606L2.10327 8.3606C0.0322044 6.28953 0.0322031 2.93166 2.10327 0.860596C2.51749 0.446382 3.18906 0.446382 3.60327 0.860596Z"
                                                    stroke="white" strokeWidth="1.1"/>
                                            </svg>
                                            {home.phone}
                                        </a>
                                        <Link
                                            href={`/${path.actual}/${home.slug}?bookTour=true`}
                                            className="flex items-center gap-2 px-4 py-2 justify-center border-2 border-white w-43 text-nowrap">
                                            <svg width="22" height="19" viewBox="0 0 22 19" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3.31665 10H7.31665" stroke="white" strokeWidth="1.3"/>
                                                <path d="M3.31665 14H7.31665" stroke="white" strokeWidth="1.3"/>
                                                <path d="M9.9834 10H13.9834" stroke="white" strokeWidth="1.3"/>
                                                <path d="M5.9834 0V4.66667" stroke="white" strokeWidth="1.3"/>
                                                <path d="M15.3167 0V4.66667" stroke="white" strokeWidth="1.3"/>
                                                <rect x="0.650024" y="2" width="20" height="16" rx="2.66667"
                                                      stroke="white" strokeWidth="1.3"/>
                                                <path d="M0.650024 6H20.65" stroke="white" strokeWidth="1.3"/>
                                            </svg>
                                            BOOK A TOUR
                                        </Link>
                                    </div>
                                    {type === "care-home" && <div
                                        className="flex items-center border-t-2 border-white/30 w-full justify-center py-3">
                                        CQC RATING: {home?.cqc_rating?.rating?.toUpperCase() || "Not Yet Rated" }
                                    </div>}
                                </div>
                            </div>
                            <h2 className="mt-10 text-[#64565A] text-3xl max-w-[80%] mb-5 line-clamp-3">
                                {home.name}
                            </h2>
                            <svg
                                width="19"
                                height="25"
                                viewBox="0 0 19 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle
                                    cx="9.08774"
                                    cy="9.08627"
                                    r="5.11117"
                                    stroke="#C79C6E"
                                    strokeWidth="1.13793"
                                />
                                <path
                                    d="M9.08789 0.568848V-0.000117838H9.08789L9.08789 0.568848ZM17.6064 9.0874H18.1754V9.0874L17.6064 9.0874ZM15.9033 14.1978L15.4483 13.856L15.4432 13.8631L15.9033 14.1978ZM9.08789 23.5679L8.62775 23.9025L9.08787 24.5352L9.54801 23.9025L9.08789 23.5679ZM2.28516 14.2144L2.74537 13.8796L2.73927 13.8716L2.28516 14.2144ZM0.569336 9.0874L0.000370443 9.0874V9.0874H0.569336ZM9.08789 0.568848V1.13781C13.4783 1.13781 17.0374 4.69696 17.0375 9.08741L17.6064 9.0874L18.1754 9.0874C18.1754 4.0685 14.1068 -0.000117838 9.08789 -0.000117838V0.568848ZM17.6064 9.0874H17.0375C17.0375 10.8774 16.4462 12.5275 15.4484 13.8561L15.9033 14.1978L16.3583 14.5394C17.4988 13.0207 18.1754 11.1324 18.1754 9.0874H17.6064ZM15.9033 14.1978L15.4432 13.8631L8.62777 23.2332L9.08789 23.5679L9.54801 23.9025L16.3634 14.5324L15.9033 14.1978ZM9.08789 23.5679L9.54803 23.2332L2.7453 13.8797L2.28516 14.2144L1.82502 14.549L8.62775 23.9025L9.08789 23.5679ZM2.28516 14.2144L2.73927 13.8716C1.73438 12.5403 1.1383 10.8843 1.1383 9.0874H0.569336H0.000370443C0.000370443 11.1404 0.682419 13.0354 1.83104 14.5571L2.28516 14.2144ZM0.569336 9.0874L1.1383 9.08741C1.13834 4.69698 4.69747 1.13785 9.0879 1.13781L9.08789 0.568848L9.08789 -0.000117838C4.06901 -7.77245e-05 0.000410557 4.06852 0.000370443 9.0874L0.569336 9.0874Z"
                                    fill="#C79C6E"
                                />
                            </svg>
                            <p className="text-[#64565A] text-sm max-w-[70%] mt-3 mb-6 line-clamp-2">
                                {home.address}
                            </p>

                            <Link
                                href={`/${path.actual}/${home.slug}`}
                                className="text-[#64565A] border px-4 py-2 border-[#64565A] tracking-wide text-sm inline-block mt-4 hover:bg-black/10 transition-colors duration-300"
                            >
                                VIEW DETAILS
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {type === "care-home" && <section className="main-container my-40">
                <SectionHeader
                    title={
                        <>
                            DAILY LIFE AT
                            <br/>
                            SENKOUN {langs.subtitle}
                        </>
                    }
                    subtitle="LIFE AT SENKOUN"
                />
                <p className="max-w-[40%] max-sm:max-w-full text-[#64565A]/80 text-sm leading-relaxed text-balance mt-10 mb-10">
                    {refLangs.lifeAt}
                </p>

                <ImageBricksGallery gallery={homes.flatMap(item => item.gallery?.map(i => {
                    return {
                        ...i,
                        url: getStrapiMediaUrl(i.url)
                    }
                }) ?? [])}/>
            </section>}

            <section className="relative mt-60 mb-40">
                <img
                    src="/two-swan.png"
                    alt="Two Swans"
                    className="w-25 absolute -top-5 left-[30%]"
                />
                <div
                    className="bg-[#B8853A] wavy-box flex w-full pt-20 pb-20 px-20 overflow-visible max-md:flex-col-reverse">
                    <div className="flex-1 flex flex-col items-center justify-center text-white md:my-20">
                        <h2 className="font-body text-sm max-md:mt-">EXCELLENCE IN CARE</h2>
                        <h1 className="text-5xl text-center my-10">
                            HOW WE
                            <br/>
                            CARE
                        </h1>
                        <p className="text-center max-w-[60%] max-md:max-w-full text-sm">
                            {refLangs.howWeCare}
                        </p>
                    </div>
                    <div className="h-67.5 md:flex-1"></div>
                </div>
                <img
                    src="/pages/care-homes/how-we-care.webp"
                    className="absolute -top-12.5 left-[50%] h-125 max-md:max-h-100 max-md:h-auto max-md:w-[70%] max-md:left-[15%]"
                    alt="How we care"
                />
            </section>
            <br/>
            <TestimonialCarousel className="mb-60" testimonials={refLangs.testimonials}/>

            <NewsComponent/><br/>

            <WantToExploreMore/>

            <br/><br/><br/><br/><br/><br/>
        </>
    );
}
