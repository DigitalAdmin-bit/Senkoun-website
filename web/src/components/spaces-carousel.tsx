"use client";

import {useState} from "react";
import ImageCarousel from "@/components/image-carousel";

interface SpaceImage {
    id: number;
    documentId: string;
    url: string;
    width: number;
    height: number;
    alternativeText: string;
}

interface Space {
    id: number;
    name: string;
    description: string;
    images: SpaceImage[];
}

interface SpaceCarouselProps {
    spaces: Space[];
}

export default function SpaceCarousel({spaces}: SpaceCarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    if (!spaces || spaces.length === 0) {
        return <div>No spaces available</div>;
    }

    const currentSpace = spaces[activeIndex];

    return (
        <div className="flex main-container h-125 max-md:h-auto max-md:flex-col-reverse">
            <div className="flex-1 text-white p-12 flex flex-col max-md:px-0 max-md:-mt-10">
                <h1 className="text-5xl mb-8">Our Space</h1>
                <nav className="space-y-4 font-heading max-md:flex max-md:flex-wrap max-md:space-y-0 max-md:gap-5">
                    {spaces.map((space, index) => (
                        <button
                            key={space.id}
                            onClick={() => setActiveIndex(index)}
                            className={`cursor-pointer block text-lg transition-all duration-200 ${
                                activeIndex === index
                                    ? "text-white font-semibold"
                                    : "text-white/60 hover:text-white"
                            }`}
                        >
                            {space.name}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="flex-3 p-12 flex flex-col justify-center -translate-y-12.5 max-md:p-0">
                {/* Carousel */}
                <div className="mb-8 max-md:mb-0">
                    <ImageCarousel
                        images={currentSpace.images}
                        description={currentSpace.description}
                        dotsClassName="justify-start"
                        activeClassName="bg-white"
                        inactiveClassName="bg-white/50"
                    />
                </div>
            </div>
        </div>
    );
}
