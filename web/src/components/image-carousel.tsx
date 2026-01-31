"use client";

import {Carousel, CarouselApi, CarouselContent, CarouselItem,} from "@/components/ui/carousel";
import {useEffect, useState} from "react";
import {cn} from "@/lib/utils";

interface IProps {
    images: {
        id: number;
        documentId: string;
        alternativeText: string;
        url: string;
        width: number;
        height: number;
    }[];
    description?: string;
    dotsClassName?: string;
    activeClassName?: string;
    inactiveClassName?: string;
}

export default function ImageCarousel({
                                          images,
                                          description,
                                          dotsClassName,
                                          activeClassName,
                                          inactiveClassName,
                                      }: IProps) {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        setCurrent(api.selectedScrollSnap());

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    return (
        <div className="relative w-full h-full">
            <Carousel setApi={setApi}>
                <CarouselContent className="flex-1 w-full h-full">
                    {images.map((image) => (
                        <CarouselItem
                            key={image.id}
                            className="flex items-center justify-center w-full h-full"
                        >
                            <img
                                className="object-cover w-full h-100"
                                src={image.url}
                                alt={image.alternativeText}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            {description && (
                <p className="text-white max-w-2xl mt-8">{description}</p>
            )}

            {/* Progress Dots */}
            <div
                className={cn(
                    "flex items-center justify-center gap-2 mt-4",
                    dotsClassName,
                )}
            >
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => api?.scrollTo(index)}
                        className={`size-2 transition-all duration-300 rounded-full ${
                            index === current
                                ? (activeClassName ?? "bg-[#64565A]")
                                : (inactiveClassName ?? "bg-[#D9D9D9] hover:bg-gray-400")
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
