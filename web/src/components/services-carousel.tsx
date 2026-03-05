"use client";

import * as React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import SectionHeader from "@/components/common/section-header";

interface ServiceCard {
    id?: number;
    title: string;
    description: string;
}

interface ServicesCarouselProps {
    title?: string;
    subtitle?: string;
    description?: string;
    services: ServiceCard[];
    className?: string;
}

export default function ServicesCarousel({
    title = "Supporting Your Loved Ones",
    description,
    services,
    className,
}: ServicesCarouselProps) {
    const [api, setApi] = React.useState<any>();

    return (
        <section className={cn("py-16", className)}>
            <div className="main-container">
                {/* Header Section with Navigation */}
                <div className="mb-12 flex justify-between items-end gap-8">
                    <div className="flex-1">
                        <SectionHeader title={title} id="support" subtitle={' '}/>
                        <p className="text-[#64565A] text-sm mt-10 max-w-[80%] max-sm:max-w-full leading-relaxed tracking-wide">
                            {description}
                        </p>
                    </div>
                    {/*</div>*/}
                    {/*<div className="max-w-2xl">*/}
                    {/*    <h2 className="text-4xl md:text-5xl font-bold text-[#C5975C] mb-6 leading-tight">*/}
                    {/*        {title}*/}
                    {/*    </h2>*/}
                    {/*    {description && (*/}
                    {/*        <p className="text-[#64565A] text-sm leading-relaxed tracking-wide mb-4">*/}
                    {/*            {description}*/}
                    {/*        </p>*/}
                    {/*    )}*/}
                    {/*</div>*/}

                    {/* Navigation Buttons - Top Right */}
                    <div className="flex gap-2 shrink-0 max-sm:hidden">
                        <button
                            onClick={() => api?.scrollPrev()}
                            className="size-12 rounded-full border border-[#64565A] text-[#64565A] hover:bg-[#64565A] hover:text-white transition-colors flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Previous slide"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                        </button>
                        <button
                            onClick={() => api?.scrollNext()}
                            className="size-12 rounded-full border cursor-pointer border-[#64565A] text-[#64565A] hover:bg-[#64565A] hover:text-white transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Next slide"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Carousel - Full width to right edge */}
            <div className="relative">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    setApi={setApi}
                    className="w-full"
                >
                    <CarouselContent className="ml-[15%] max-sm:ml-[5%]">
                        {services.map((service, index) => (
                            <CarouselItem
                                key={service.id || index}
                                className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 first:pl-0"
                            >
                                <ServiceCard
                                    title={service.title}
                                    description={service.description}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    );
}

function ServiceCard({
    title,
    description,
}: {
    title: string;
    description: string;
}) {
    return (
        <div className="bg-white p-8 h-full min-h-40 border border-[#CEC5C5] flex flex-col shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold text-[#64565A] mb-4 leading-tight">
                {title}
            </h3>
            <p className="text-[#64565A] text-sm leading-relaxed tracking-wide line-clamp-4">
                {description}
            </p>
        </div>
    );
}

