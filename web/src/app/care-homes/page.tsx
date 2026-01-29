import HeroSection from "@/components/hero-section";
import {Metadata} from "next";
import NewsComponent from "@/components/news-component";
import SectionHeader from "@/components/section-header";
import {fetchFeaturedHomes} from "@/lib/apis/homes";
import {getStrapiMediaUrl} from "@/lib/utils";
import Link from "next/link";


export const metadata: Metadata = {
    title: "Our Care Homes | Senkoun Care Homes",
    description:
        "Discover our beautiful care homes across London. Each offers exceptional nursing, dementia, and residential care in warm, supportive environments.",
};

export default async function CareHomesPage() {
    const data = await fetchFeaturedHomes();

    console.dir(data, {
        depth: null
    });

    return (
        <>
            {/* Hero Section */}
            <HeroSection bg="/pages/care-home-bg.webp"/>

            <section className="mt-10 w-[40%] mx-auto mb-30">
                <p className="text-[#64565A] text-sm text-center mb-10">
                    ABOUT SENKOUN CARE HOMES
                </p>

                <h1 className="text-[#B8853A] text-center text-5xl mb-10">
                    WELCOME TO <br/>
                    SENKOUN CARE HOMES
                </h1>

                <p className="text-center text-sm text-[#64565A] leading-relaxed text-balance">
                    Senkoun Healthcare Wakering Ltd presents a visionary plan to establish Joseph Lodge in Little
                    Wakering Southend-on-Sea, With a strong focus on delivering high-quality healthcare services and
                    addressing the pressing needs of the ageing population, Joseph Lodge aims to become a trusted and
                    preferred choice for elderly care in the region.
                    <br/>
                    <br/>

                    Joseph Lodge business plan showcases a strong vision for providing exceptional residential care in
                    Southend-on-Sea. With a focus on innovation, compliance, and customer-centric services, we aim to
                    become a leader in the industry. By strategically acquiring additional properties in the future, we
                    will expand our reach and positively impact the lives of more elderly individuals in need of
                    specialized care.
                    <br/>
                    <br/>

                    This expansion strategy is driven by the increasing demand for high-quality residential and or
                    nursing care services and our commitment to meeting the evolving needs of the ageing population. We
                    will achieve this through a six-step process
                </p>
            </section>

            <section className="main-container">
                <SectionHeader title={<>COMPASSIONATE<br/>LIVING</>} subtitle="OUR HOMES" rightTitle="VIEW ALL HOMES"
                               rightLink="#"/>
                <div className="flex flex-wrap gap-8 justify-between my-20">
                    {data.data.map((home) => (
                        <div key={home.id} className="max-w-75 flex-1 overflow-hidden">
                            <img
                                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                                src={getStrapiMediaUrl(home.thumbnails[0].url)}
                                alt={home.thumbnails[0].alternativeText}
                            />
                            <h2 className="mt-10 text-[#64565A] text-3xl max-w-[80%] mb-5 line-clamp-3">{home.name}</h2>
                            <svg width="19" height="25" viewBox="0 0 19 25" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9.08774" cy="9.08627" r="5.11117" stroke="#C79C6E" strokeWidth="1.13793"/>
                                <path
                                    d="M9.08789 0.568848V-0.000117838H9.08789L9.08789 0.568848ZM17.6064 9.0874H18.1754V9.0874L17.6064 9.0874ZM15.9033 14.1978L15.4483 13.856L15.4432 13.8631L15.9033 14.1978ZM9.08789 23.5679L8.62775 23.9025L9.08787 24.5352L9.54801 23.9025L9.08789 23.5679ZM2.28516 14.2144L2.74537 13.8796L2.73927 13.8716L2.28516 14.2144ZM0.569336 9.0874L0.000370443 9.0874V9.0874H0.569336ZM9.08789 0.568848V1.13781C13.4783 1.13781 17.0374 4.69696 17.0375 9.08741L17.6064 9.0874L18.1754 9.0874C18.1754 4.0685 14.1068 -0.000117838 9.08789 -0.000117838V0.568848ZM17.6064 9.0874H17.0375C17.0375 10.8774 16.4462 12.5275 15.4484 13.8561L15.9033 14.1978L16.3583 14.5394C17.4988 13.0207 18.1754 11.1324 18.1754 9.0874H17.6064ZM15.9033 14.1978L15.4432 13.8631L8.62777 23.2332L9.08789 23.5679L9.54801 23.9025L16.3634 14.5324L15.9033 14.1978ZM9.08789 23.5679L9.54803 23.2332L2.7453 13.8797L2.28516 14.2144L1.82502 14.549L8.62775 23.9025L9.08789 23.5679ZM2.28516 14.2144L2.73927 13.8716C1.73438 12.5403 1.1383 10.8843 1.1383 9.0874H0.569336H0.000370443C0.000370443 11.1404 0.682419 13.0354 1.83104 14.5571L2.28516 14.2144ZM0.569336 9.0874L1.1383 9.08741C1.13834 4.69698 4.69747 1.13785 9.0879 1.13781L9.08789 0.568848L9.08789 -0.000117838C4.06901 -7.77245e-05 0.000410557 4.06852 0.000370443 9.0874L0.569336 9.0874Z"
                                    fill="#C79C6E"/>
                            </svg>
                            <p className="text-[#64565A] text-sm max-w-[70%] mt-3 mb-6 line-clamp-2">{home.address}</p>

                            <Link href={`/care-homes/${home.slug}`}
                                  className="text-[#64565A] border px-4 py-2 border-[#64565A] tracking-wide text-sm inline-block mt-4 hover:bg-black/10 transition-colors duration-300">
                                VIEW DETAILS
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            <section className="main-container">
                <SectionHeader title={<>DAILY LIFE AT<br/>SENKOUN CARE HOMES</>} subtitle="LIFE AT SENKOUN"/>
                <p className="max-w-[40%] text-[#64565A]/80 text-sm leading-relaxed text-balance mt-10 mb-10">
                    Joseph Lodge is a care home for the elderly providing personal care to people with age related
                    issues
                    including dementia. The home is set in a beautiful rural location a short distance from the
                    outskirts of Southend.
                </p>

                <div className="w-full flex gap-1 max-w-7xl">
                    <div className="flex-1">
                        <img
                            draggable={false}
                            src="/pages/care-homes/1.webp"
                            alt="Birthday celebration"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="flex flex-col flex-1 gap-1 w-full">
                        <div className="flex-1 flex gap-1 w-full">
                            <div className="flex-1">
                                <img
                                    draggable={false}
                                    src="/pages/care-homes/2.webp"
                                    alt="Gardening"
                                    className="flex-1 object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <img
                                    draggable={false}
                                    src="/pages/care-homes/3.webp"
                                    alt="Exercise"
                                    className="flex-1 object-cover"
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <img
                                draggable={false}
                                src="/pages/care-homes/4.webp"
                                alt="Family time"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                </div>
            </section>

            <section className="relative mt-50">
                <div className="bg-[#B8853A] wavy-box flex w-full pt-20 pb-20 px-20 overflow-visible">
                    <div className="flex-1 flex flex-col items-center justify-center text-white">
                        <h2 className="font-body font-light text-sm">
                            EXCELLENCE IN CARE
                        </h2>
                        <h1 className="text-5xl text-center my-10">
                            HOW WE<br/>
                            CARE
                        </h1>
                        <p className="text-center max-w-[60%] text-sm">
                            Joseph Lodge is a care home for the elderly providing personal care to people with age
                            related
                            issues including dementia. The home is set in a beautiful rural location a short distance
                            from
                            the outskirts of Southend.
                        </p>
                    </div>
                    <div className="flex-1 relative h-[400px]">

                    </div>
                </div>
                <img src="/pages/care-homes/how-we-care.webp" className="absolute top-[-50px] left-[50%] h-[500px]"
                     alt="How we care"/>
            </section>

            <NewsComponent/>
        </>
    );
}
