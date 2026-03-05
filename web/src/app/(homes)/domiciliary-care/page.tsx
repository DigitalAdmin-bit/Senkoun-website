import {getDomiciliaryCare} from "@/lib/apis/domiciliary-care";
import HeroSection from "@/components/hero-section";
import {getStrapiMediaUrl} from "@/lib/utils";
import SectionContent from "@/components/common/section-content";
import SectionHeader from "@/components/common/section-header";
import AccordionComponent from "@/components/group-accordions";
import Link from "next/link";
import TestimonialCarousel from "@/components/testimonial-carousel";
import ServicesCarousel from "@/components/services-carousel";


export default async function DomiciliaryCare() {
    const data = await getDomiciliaryCare();

    return <>
        <HeroSection bg={getStrapiMediaUrl(data.cover.url)}/>
        <SectionContent
            subtitle="DOMICILIARY CARE"
            title={data.tagline}
            description={data.description}
        />

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

        <section className="bg-[#57946C] my-50 max-sm:mt-20 flex gap-5 max-sm:flex-col text-white">
            <div className="flex-1">
                <img src={getStrapiMediaUrl(data.how_it_works.cover_image.url)}
                     alt={data.how_it_works.cover_image.alternativeText || "How it works"}
                     className="h-125"/>
            </div>
            <div className="flex-1 flex flex-col justify-center">
                <h1 className="text-4xl">How It Works</h1>
                <p className="line-clamp-6 w-125 text-sm mt-10 max-w-[80%] max-sm:max-w-full leading-relaxed tracking-wide">
                    {data.how_it_works.description}
                </p>
                <Link href="#support"
                      className="main-button bg-white text-black mt-10 inline-block">
                    Explore Services
                </Link>
            </div>
        </section>

        <TestimonialCarousel
            className="my-30 mt-40"
            testimonials={data.reviews.map((i) => ({
                quote: i.content,
                role: i.by,
                author: i.by,
            }))}
        />

        <ServicesCarousel
            title={data.supports.title}
            description={data.supports.description}
            services={data.supports.cards || []}
        />

        <section className="bg-[#B8853A] mt-30 w-full flex items-center justify-center flex-col gap-10 py-20">
            <h1 className="text-white text-4xl">
                Get in touch today to see<br/>
                how we can help
            </h1>
            <Link href="/enquire" className="main-button text-[#B8853A] bg-white">GET IN TOUCH</Link>
        </section>
    </>
}