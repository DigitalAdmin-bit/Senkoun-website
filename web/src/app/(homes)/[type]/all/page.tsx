import SectionContent from "@/components/section-content";
import WantToExploreMore from "@/components/want-to-explore-more";
import {fetchHomes_SHORT} from "@/lib/apis/homes";
import {cn, getStrapiMediaUrl} from "@/lib/utils";
import Link from "next/link";
import ImageCarousel from "@/components/image-carousel";
import {Metadata} from "next";

interface PageProps {
    params: Promise<{ type: string }>;
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
    const {type} = await params;

    switch (type) {
        case "care-home":
            return {
                title: "Care Homes",
                description: "View all the care homes",
            }
        case "domiciliary-care":
            return {
                title: "Domiciliary care",
                description: "View all the domiciliary cares",
            }
        case "supported-living":
            return {
                title: "Supported Living",
                description: "Show all the supported living",
            }
        default:
            return {
                title: "Not Found",
                description: "The page you're looking for is not found.",
            }
    }
}

export default async function AllCareHomes({params}: PageProps) {
    const {type} = await params;

    const data = await fetchHomes_SHORT({
        featuredOnly: false,
        description: true,
        type: type,
        limit: 50,
    });

    return (
        <>
            <SectionContent
                subtitle="OUR HOMES"
                title={
                    <>
                        EXPERIENCE
                        <br/>
                        EXCEPTIONAL CARE,
                        <br/>
                        EVERY DAY
                    </>
                }
                description={
                    <>
                        Senkoun Healthcare Wakering Ltd presents a visionary plan to
                        establish Joseph Lodge in Little Wakering Southend-on-Sea, With a
                        strong focus on delivering high-quality healthcare services and
                        addressing the pressing needs of the ageing population, Joseph Lodge
                        aims to become a trusted and preferred choice for elderly care in
                        the region.
                        <br/>
                        <br/>
                        Joseph Lodge business plan showcases a strong vision for providing
                        exceptional residential care in Southend-on-Sea. With a focus on
                        innovation, compliance, and customer-centric services, we aim to
                        become a leader in the industry. By strategically acquiring
                        additional properties in the future, we will expand our reach and
                        positively.
                    </>
                }
            />

            <section className="main-container">
                <div className="my-20">
                    {data.data.map((home) => (
                        <div
                            key={home.id}
                            className={cn(
                                "flex overflow-hidden gap-10 mt-20 pb-20",
                                "border-b border-b-[#928286]",
                            )}
                        >
                            <div className="flex flex-1 w-full h-full">
                                <ImageCarousel
                                    images={home.thumbnails.map((t) => ({
                                        ...t,
                                        url: getStrapiMediaUrl(t.url),
                                    }))}
                                />
                            </div>
                            <div className="flex-1">
                                <div className="px-10">
                                    <h2 className="text-[#64565A] text-3xl max-w-[50%] mb-5 line-clamp-3">
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
                                    <p className="text-[#64565A] max-w-[50%] mt-3 mb-6 line-clamp-3">
                                        {home.address}
                                    </p>

                                    <p className="text-[#64565A] text-sx max-w-[80%] mt-3 mb-2 line-clamp-6 text-pretty">
                                        {home.description}
                                    </p>
                                    <Link
                                        href={`/care-homes/${home.slug}`}
                                        className="text-[#64565A] border px-4 py-2 border-[#64565A] tracking-wide text-sm inline-block mt-4 hover:bg-black/10 transition-colors duration-300"
                                    >
                                        VIEW DETAILS
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <WantToExploreMore/>

            <br/>
            <br/>
            <br/>
            <br/>
        </>
    );
}
