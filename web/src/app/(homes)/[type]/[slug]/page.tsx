import {notFound} from "next/navigation";
import {Metadata} from "next";
import {fetchHomeBySlug, getHomesWithOnlyName} from "@/lib/apis/homes";
import HeroSection from "@/components/hero-section";
import {getStrapiMediaUrl} from "@/lib/utils";
import {ChevronRight, MapPin} from "lucide-react";
import SectionContent from "@/components/common/section-content";
import Link from "next/link";
import AccordionComponent from "@/components/group-accordions";
import SectionHeader from "@/components/common/section-header";
import WantToExploreMore from "@/components/want-to-explore-more";
import {Map, MapMarker, MarkerContent} from "@/components/ui/map";
import WeatherAsync from "@/components/weather/weather-async";
import SpaceCarousel from "@/components/spaces-carousel";
import Facilities from "@/components/facilities";
import TestimonialCarousel from "@/components/testimonial-carousel";
import MeetTheTeam from "@/components/meet-the-team";
import BrochureDownload from "@/components/brochure-download";
import CareHomeQuickBtns from "@/components/care-homes-quick/care-home-quick-btns";
import HomesSubHeader from "@/components/homes-sub-header";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const homes = await getHomesWithOnlyName();

    return homes.data.map((home) => ({
        slug: home.slug,
        type: home.type === 'supported-home' ? 'supported-living' : home.type
    }));
}

export async function generateMetadata({
                                           params,
                                       }: PageProps): Promise<Metadata> {

    const {slug} = await params;
    const responseData = await fetchHomeBySlug(slug);

    if (!responseData || responseData.data.length === 0) {
        return {
            title: "Not Found",
            description: "The content you're looking for isn't found"
        }
    }

    return {
        title: responseData.data[0].name,
        description: responseData.data[0].description,
    };
}

const SUPPORTED_LIVING_TAB_LINKS = [
    {label: "About Us", href: "#about-us"},
    {label: "Location", href: "#location"},
    {label: "Our Facilities", href: "#facilities"},
    {label: "Meet The Team", href: "#meet-the-team"},
    {label: "Contact Us", href: "#location"},
];

const CARE_HOME_TAB_LINKS = [
    {label: "Life With Us", href: "#life-with-us"},
    {label: "Location", href: "#location"},
    {label: "Why Choose Us", href: "#why-choose-us"},
    {label: "Our Services", href: "#our-services"},
    {label: "Our Facilities", href: "#facilities"},
    {label: "Meet The Team", href: "#meet-the-team"},
    {label: "Download Brochure", href: "#download-brochure"},
];

export default async function CareHomeDetailPage({params}: PageProps) {
    const {slug} = await params;

    const responseData = await fetchHomeBySlug(slug);

    if ((responseData?.data || []).length === 0) {
        notFound();
    }

    const data = responseData.data[0];

    // @ts-ignore
    return (
        <>
            <section className="overflow-visible bg-white border-t pt-5 text-[#64565A]">
                <div
                    className="flex max-w-[80%] mx-auto justify-between max-sm:flex-col max-sm:max-w-[90%] max-sm:gap-3"
                >
                    <div className="flex-1">
                        <h1 className="text-[#B8853A] text-2xl">{data.name}</h1>
                        <div className="mt-2 text-sm flex gap-2 items-center max-sm:wrap-break-word sm:truncate">
                            <svg
                                width="15"
                                height="20"
                                viewBox="0 0 19 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle
                                    cx="9.08749"
                                    cy="9.08642"
                                    r="5.11117"
                                    stroke="#D8971D"
                                    strokeWidth="1.13793"
                                />
                                <path
                                    d="M9.0874 0.56897V4.23193e-06H9.0874L9.0874 0.56897ZM17.606 9.08752H18.1749V9.08752L17.606 9.08752ZM15.9028 14.1979L15.4478 13.8562L15.4427 13.8632L15.9028 14.1979ZM9.0874 23.568L8.62726 23.9026L9.08738 24.5353L9.54753 23.9027L9.0874 23.568ZM2.28467 14.2145L2.74488 13.8798L2.73879 13.8717L2.28467 14.2145ZM0.568848 9.08752L-0.000117838 9.08752V9.08752H0.568848ZM9.0874 0.56897V1.13794C13.4778 1.13794 17.037 4.69708 17.037 9.08753L17.606 9.08752L18.1749 9.08752C18.1749 4.06862 14.1063 4.23193e-06 9.0874 4.23193e-06V0.56897ZM17.606 9.08752H17.037C17.037 10.8775 16.4457 12.5276 15.4479 13.8562L15.9028 14.1979L16.3578 14.5396C17.4984 13.0208 18.1749 11.1325 18.1749 9.08752H17.606ZM15.9028 14.1979L15.4427 13.8632L8.62728 23.2333L9.0874 23.568L9.54753 23.9027L16.363 14.5326L15.9028 14.1979ZM9.0874 23.568L9.54754 23.2333L2.74481 13.8798L2.28467 14.2145L1.82453 14.5491L8.62726 23.9026L9.0874 23.568ZM2.28467 14.2145L2.73879 13.8717C1.73389 12.5404 1.13781 10.8844 1.13781 9.08752H0.568848H-0.000117838C-0.000117838 11.1406 0.681931 13.0356 1.83055 14.5573L2.28467 14.2145ZM0.568848 9.08752L1.13781 9.08753C1.13785 4.69711 4.69698 1.13797 9.08741 1.13794L9.0874 0.56897L9.0874 4.23193e-06C4.06852 4.43459e-05 -7.77245e-05 4.06864 -0.000117838 9.08752L0.568848 9.08752Z"
                                    fill="#D8971D"
                                />
                            </svg>
                            <p>{data.address}</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between text-sm max-sm:gap-1">
                        <div className="flex items-center gap-2">
                            <svg
                                width="17"
                                height="17"
                                viewBox="0 0 17 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M3.22282 0.327922L5.3999 2.505C6.05574 3.16084 6.05574 4.22417 5.3999 4.88C4.74406 5.53584 4.74406 6.59917 5.3999 7.25501L8.9624 10.8175C9.61824 11.4733 10.6816 11.4733 11.3374 10.8175C11.9932 10.1617 13.0566 10.1617 13.7124 10.8175L15.8895 12.9946C16.3267 13.4318 16.3267 14.1407 15.8895 14.5779C13.7034 16.764 10.1589 16.764 7.97282 14.5779L1.63949 8.24459C-0.546641 6.05846 -0.546641 2.51405 1.63949 0.327922C2.07671 -0.109304 2.78559 -0.109303 3.22282 0.327922Z"
                                    fill="#B8853A"
                                />
                            </svg>
                            {data.phone}
                        </div>
                        <div className="flex items-center gap-2">
                            <svg
                                width="16"
                                height="12"
                                viewBox="0 0 16 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M6.13384 5.12181C7.26015 5.88526 8.73754 5.88719 9.86605 5.12701L15.9287 1.04155C15.9739 1.18396 15.999 1.33553 15.999 1.49288V9.70635C15.9989 10.5309 15.3299 11.1992 14.5053 11.1992H1.49375C0.669129 11.1992 0.000123176 10.5309 0 9.70635V1.49288C3.98429e-05 1.32646 0.0287063 1.16673 0.0789839 1.01724L6.13384 5.12181ZM14.5053 0C14.6697 0 14.8278 0.0272887 14.9757 0.0763801L9.12134 4.02124C8.44418 4.47745 7.55785 4.47594 6.88202 4.01777L1.05196 0.0650967C1.19145 0.0220027 1.34011 0 1.49375 0H14.5053Z"
                                    fill="#B8853A"
                                />
                            </svg>

                            {data.email}
                        </div>
                    </div>
                </div>
            </section>

            <HomesSubHeader data={data.type === "care-home" ? CARE_HOME_TAB_LINKS : SUPPORTED_LIVING_TAB_LINKS}/>

            <HeroSection bg={getStrapiMediaUrl(data.cover.url)}>
                <CareHomeQuickBtns homeId={data.documentId}/>
            </HeroSection>

            <br/>
            <br/>
            <br/>

            {data.type === "care-home" && (
                <section className="main-container my-30 flex gap-2 flex-wrap">
                    <div className="bg-white px-10 py-8 flex-1 min-w-50 flex flex-col text-[#64565A]">
                        <div className="flex-1">
                            <div
                                className="mb-5 border-[#145099] border-3 text-white rounded-full size-20 flex items-center justify-center p-1">
                                <div
                                    className="bg-[#145099] rounded-full text-2xl font-bold size-full flex items-center justify-center">
                                    {data.carehome_review?.rating}
                                </div>
                            </div>
                            <img src="/carehome-co-uk-logo.png" alt="Care home uk" className="h-7.5"/>
                            <p className="max-w-[70%] mt-3 text-sm">
                                Read our fantastic reviews on the UK's leading care home review
                                website
                            </p>
                        </div>
                        <div>
                            <a href={data.carehome_review?.review_link} className="flex gap-2 items-center text-sm">
                                Read Reviews <ChevronRight size={18}/>
                            </a>
                        </div>
                    </div>
                    <div className="bg-white px-10 py-8 flex-1 min-w-50 flex flex-col text-[#64565A]">
                        <div className="flex-1">
                            <div>CQC Rating</div>
                            <div
                                className="mt-3 mb-5 rounded-lg bg-[#589245] text-white px-4 py-1 w-fit capitalize text-xl">{data.cqc_rating?.rating}</div>
                            <img src="/cqc.png" alt="Care Quality Commision Logo" className="h-7.5"/>
                            <p className="max-w-[70%] mt-3 text-sm">
                                {data.name} has a CQC rating of {data?.cqc_rating?.rating}. Click
                                below to view the full report.
                            </p>
                        </div>
                        <div>
                            <a href={data.cqc_rating?.report_link} className="flex gap-2 items-center text-sm">
                                Read The Report <ChevronRight size={18}/>
                            </a>
                        </div>
                    </div>
                    <div
                        className="flex-1 min-w-50 from-[#83A1F7] to-[#5D7EF5] bg-linear-to-b p-5 text-white text-center flex flex-col items-center justify-center gap-5">
                        <img src="/follow-on-fb.webp" alt="Follow us on Facebook" className="w-50" draggable={false}/>
                        <a href={data.facebook}
                           className="w-fit mx-auto px-5 py-2 border-white border uppercase text-center">Follow</a>
                    </div>
                </section>
            )}

            <SectionContent
                id="about-us"
                subtitle=""
                title={data.tagline}
                description={
                    <>
                        {data.description}
                        <br/>
                        <br/>
                        <br/>
                        <Link
                            href="#"
                            className="border-[#64565A] border px-5 py-3 text-[#64565A]"
                        >
                            BOOK A TOUR
                        </Link>
                    </>
                }
            />

            {data.type === "care-home" && (
                <section className="main-container my-30" id="life-with-us">
                    <video
                        className="w-full"
                        src={getStrapiMediaUrl(data.video?.url!)}
                        controls={true}
                    />
                </section>
            )}
            <section className="main-container my-30 mt-40">
                <SectionHeader title="Location" subtitle="Location" id="location"/>
                <hr className="bg-[#CEC5C5] h-0.5 my-10"/>
                <div className="flex ">
                    <div
                        className="flex gap-10 max-lg:gap-3 justify-between w-full text-[#64565A] text-sm max-lg:flex-col">
                        <div className="flex-1 flex gap-2">
                            <svg
                                width="17"
                                height="17"
                                viewBox="0 0 17 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M3.60327 0.860596L5.66577 2.9231C6.28709 3.54442 6.28709 4.55177 5.66577 5.1731C5.04445 5.79442 5.04445 6.80177 5.66577 7.4231L9.04077 10.7981C9.66209 11.4194 10.6695 11.4194 11.2908 10.7981C11.9121 10.1768 12.9195 10.1768 13.5408 10.7981L15.6033 12.8606C16.0175 13.2748 16.0175 13.9464 15.6033 14.3606C13.5322 16.4317 10.1743 16.4317 8.10327 14.3606L2.10327 8.3606C0.0322044 6.28953 0.0322031 2.93166 2.10327 0.860596C2.51749 0.446382 3.18906 0.446382 3.60327 0.860596Z"
                                    stroke="#C79C6E"
                                    strokeWidth="1.1"
                                />
                            </svg>
                            {data.phone}
                        </div>
                        <div className="max-lg:hidden w-0.5 h-full bg-[#CEC5C5]"/>

                        <div className="flex-1 flex gap-2">
                            <svg
                                width="19"
                                height="25"
                                viewBox="0 0 19 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle
                                    cx="9.08749"
                                    cy="9.08627"
                                    r="5.11117"
                                    stroke="#C79C6E"
                                    strokeWidth="1.13793"
                                />
                                <path
                                    d="M9.0874 0.568848V-0.000117838H9.0874L9.0874 0.568848ZM17.606 9.0874H18.1749V9.0874L17.606 9.0874ZM15.9028 14.1978L15.4478 13.856L15.4427 13.8631L15.9028 14.1978ZM9.0874 23.5679L8.62726 23.9025L9.08738 24.5352L9.54753 23.9025L9.0874 23.5679ZM2.28467 14.2144L2.74488 13.8796L2.73879 13.8716L2.28467 14.2144ZM0.568848 9.0874L-0.000117838 9.0874V9.0874H0.568848ZM9.0874 0.568848V1.13781C13.4778 1.13781 17.037 4.69696 17.037 9.08741L17.606 9.0874L18.1749 9.0874C18.1749 4.0685 14.1063 -0.000117838 9.0874 -0.000117838V0.568848ZM17.606 9.0874H17.037C17.037 10.8774 16.4457 12.5275 15.4479 13.8561L15.9028 14.1978L16.3578 14.5394C17.4984 13.0207 18.1749 11.1324 18.1749 9.0874H17.606ZM15.9028 14.1978L15.4427 13.8631L8.62728 23.2332L9.0874 23.5679L9.54753 23.9025L16.363 14.5324L15.9028 14.1978ZM9.0874 23.5679L9.54754 23.2332L2.74481 13.8797L2.28467 14.2144L1.82453 14.549L8.62726 23.9025L9.0874 23.5679ZM2.28467 14.2144L2.73879 13.8716C1.73389 12.5403 1.13781 10.8843 1.13781 9.0874H0.568848H-0.000117838C-0.000117838 11.1404 0.681931 13.0354 1.83055 14.5571L2.28467 14.2144ZM0.568848 9.0874L1.13781 9.08741C1.13785 4.69698 4.69698 1.13785 9.08741 1.13781L9.0874 0.568848L9.0874 -0.000117838C4.06852 -7.77245e-05 -7.77245e-05 4.06852 -0.000117838 9.0874L0.568848 9.0874Z"
                                    fill="#C79C6E"
                                />
                            </svg>

                            <p className="truncate">{data.address}</p>
                        </div>

                        <div className="max-lg:hidden w-0.5 h-full bg-[#CEC5C5]"/>

                        <div className="flex-1 flex  gap-2">
                            <svg
                                width="20"
                                height="14"
                                viewBox="0 0 20 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M18.1609 0.979033L9.52086 6.80031L0.880859 0.942871"
                                    stroke="#C79C6E"
                                    strokeWidth="1.04211"
                                />
                                <path
                                    d="M16.8409 0.520996H2.20109C1.2732 0.520996 0.520996 1.2732 0.520996 2.20109V11.4416C0.520996 12.3695 1.2732 13.1217 2.2011 13.1217H3.401H16.8409C17.7688 13.1217 18.521 12.3695 18.521 11.4416V2.20109C18.521 1.2732 17.7688 0.520996 16.8409 0.520996Z"
                                    stroke="#C79C6E"
                                    strokeWidth="1.04211"
                                />
                            </svg>
                            {data.email}
                        </div>
                    </div>
                </div>

                <div className="flex h-112.5 max-sm:h-200 mt-10 max-sm:flex-col">
                    <div className="flex-2">
                        <Map
                            theme="light"
                            styles={{
                                light: {
                                    version: 8,
                                    sources: {
                                        "raster-tiles": {
                                            type: "raster",
                                            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
                                            tileSize: 256,
                                        },
                                    },
                                    layers: [
                                        {
                                            id: "simple-tiles",
                                            type: "raster",
                                            source: "raster-tiles",
                                            minzoom: 0,
                                            maxzoom: 22,
                                        },
                                    ],
                                    // @ts-ignore
                                    paint: {
                                        "background-color": "#a8e6a1",
                                    },
                                },
                            }}
                            center={[Number(data.location.log), Number(data.location.lat)]}
                            zoom={11}
                        >
                            <MapMarker
                                longitude={Number(data.location.log)}
                                latitude={Number(data.location.lat)}
                            >
                                <MarkerContent>
                                    <MapPin fill="red" stroke="rgb(150, 0, 0)"/>
                                </MarkerContent>
                            </MapMarker>
                        </Map>
                    </div>
                    <div className="flex-1 bg-[#57946c]">
                        <WeatherAsync
                            lat={Number(data.location.lat)}
                            lon={Number(data.location.log)}
                        />
                    </div>
                </div>
            </section>
            <br/>
            {data.type === "care-home" && (
                <section className="main-container my-40">
                    <h2 className="font-heading font-normal text-[#b8853a] text-6xl max-sm:text-5xl" id="why-choose-us">
                        Why Choose Us?
                    </h2>
                    <div className="max-sm:my-10 my-20 text-[#64565A] flex gap-3 justify-center flex-wrap">
                        {data.why_choose_us.map((item, index) => (
                            <div className="flex-1 bg-white p-10" key={index}>
                                <div className="w-full flex flex-col items-center mb-5">
                                    <img
                                        src="/home/trust.webp"
                                        alt={item.title}
                                        className="h-25"
                                    />
                                </div>
                                <h2 className="text-3xl text-center mb-7">{item.title}</h2>
                                <p className="text-center text-sm text-pretty">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {data.type === "care-home" && (
                <section className="my-50 max-sm:mt-20 flex main-container gap-5 max-sm:flex-col">
                    <div className="flex-1">
                        <SectionHeader title="What we will Offer" subtitle="HOW WE CARE" id="our-services"/>
                        <p className="text-[#64565A] text-sm mt-10 max-w-[80%] max-sm:max-w-full leading-relaxed tracking-wide">
                            {data.what_we_offer.description}
                        </p>
                    </div>
                    <div className="flex-1">
                        <AccordionComponent items={data.what_we_offer.accordions}/>
                    </div>
                </section>
            )}

            <section className="w-full bg-[#B8853A] my-30">
                <SpaceCarousel
                    spaces={data.spaces.map((i) => ({
                        ...i,
                        images: i.images.map((image) => ({
                            ...image,
                            url: getStrapiMediaUrl(image.url),
                        })),
                    }))}
                />
            </section>

            <section className="main-container my-30 mt-50 flex gap-10 max-sm:flex-col">
                <div className="flex-1">
                    <SectionHeader
                        title={
                            <>
                                Our
                                <br/>
                                Facilities
                            </>
                        }
                        id="facilities"
                        subtitle=""
                    />
                    <p className="mt-10 text-[#64565A] text-sm">
                        {data.facilities.description}
                    </p>
                </div>
                <div className="flex-2 grid grid-cols-4 max-sm:grid-cols-3 gap-5 text-[#64565A] text-xs text-center">
                    <Facilities data={data.facilities}/>
                </div>
            </section>

            {data.type === "supported-home" && <div className="">
                <section className="bg-[#57946C] mt-30 mb-20 max-sm:mt-20 flex gap-20 max-sm:flex-col text-white">
                    <div className="flex-1">
                        <img src="/pages/care-homes/how-we-care.webp"
                             alt="How we care"
                             className="w-full h-100 object-cover object-center"/>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                        <h1 className="text-4xl">Eligibility for This Service</h1>
                        <p className="line-clamp-6 w-125 text-sm mt-10 max-w-[80%] max-sm:max-w-full leading-relaxed tracking-wide">
                            Eligibility for supported living services involves a “social care assistance” needs
                            assessment conducted by Essex County Council. This assessment will determine whether you
                            qualify for supported or assisted living services. Typically, adults with physical
                            disabilities, learning disabilities, sensory impairments, and mental health issues are
                            considered for supported living. Individuals with long-term health conditions that
                            affect
                            their ability to live independently are also eligible for this service.
                        </p>
                    </div>
                </section>

                <section className="main-container">
                    <h1 className="text-5xl text-[#B8853A] mb-16">Financial Help for This Service</h1>
                    <div className="text-pretty">
                        <p>
                            In Essex, individuals seeking financial help for supported living services can access
                            various
                            forms of assistance, such as:
                        </p>
                        <br/>

                        <ul className="space-y-4 pl-4">
                            <li className="list-disc">Local Authority Assistance: If you’re eligible for our services, a
                                financial assessment
                                will determine how much the individual can contribute towards the cost of their care.
                                This assessment considers income, savings, and assets.
                            </li>

                            <li className="list-disc">Benefits and Allowances: Benefits such as Personal Independence
                                Payment (PIP) are
                                available to individuals aged 16-64 with a long-term health condition or disability.
                                Alternatively, Attendance Allowance is for individuals over 65 who need help with
                                personal care due to a physical or mental disability.
                            </li>

                            <li className="list-disc">Charitable Support and Grants: Various charities provide financial
                                assistance for people
                                with disabilities or long-term health conditions. Examples include Living Made Easy and
                                Sense.
                            </li>
                        </ul>
                    </div>
                </section>
            </div>}

            <TestimonialCarousel
                className="my-30 mt-40"
                testimonials={data.reviews.map((i) => ({
                    quote: i.content,
                    role: i.by,
                    author: i.by,
                }))}
            />

            <br/><br/><br/><br/><br/>

            <MeetTheTeam
                teamPageUrl={`/${data.type === "care-home" ? "care-homes" : "supported-living"}/${data.slug}/team`}
                id="meet-the-team"
                data={data.meet_our_team}
            />

            <WantToExploreMore/>

            <section className="main-container mt-30 max-sm:mt-20">
                <SectionHeader title={`${data.name} Brochure`} subtitle="Download Brochure" id="download-brochure"/>
                <br/><br/>
                <BrochureDownload homeID={data.documentId} url={getStrapiMediaUrl(data.brochure.url)}/>
            </section>

            <br/><br/><br/>
        </>
    );
}
