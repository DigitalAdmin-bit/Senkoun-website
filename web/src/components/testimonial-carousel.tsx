"use client";

import {useEffect, useState} from "react";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {cn} from "@/lib/utils";

interface Testimonial {
    quote: string;
    author: string;
    role?: string;
}

interface TestimonialCarouselProps {
    testimonials: Testimonial[];
    autoPlayInterval?: number;
    className?: string;
}

export default function TestimonialCarousel({
                                                className,
                                                testimonials,
                                                autoPlayInterval = 6000,
                                            }: TestimonialCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const goToNext = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setTimeout(() => setIsAnimating(false), 600);
    };

    const goToPrevious = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex(
            (prev) => (prev - 1 + testimonials.length) % testimonials.length,
        );
        setTimeout(() => setIsAnimating(false), 600);
    };

    useEffect(() => {
        const interval = setInterval(goToNext, autoPlayInterval);
        return () => clearInterval(interval);
    }, [currentIndex, autoPlayInterval]);

    return (
        <div className={cn("flex items-center justify-center", className)}>
            <div className="relative main-container">
                <div
                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10 bg-[#fbf5f3] border border-[#64565A] quote-mark w-16 h-16 rounded-full flex items-center justify-center">
                    <svg
                        width="27"
                        height="20"
                        viewBox="0 0 27 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M24.7826 0L27 1.86335C25.5797 3.05038 24.4203 4.196 23.5217 5.30021C22.6522 6.37681 22.1014 7.19117 21.8696 7.74327C21.6377 8.29538 21.4203 8.9579 21.2174 9.73085L21.3913 9.9793C23.3333 9.9793 24.7536 10.3796 25.6522 11.1801C26.5507 11.9807 27 13.2229 27 14.9068C27 16.2043 26.5072 17.3775 25.5217 18.4265C24.5652 19.4755 23.3623 20 21.913 20C20.2609 20 18.8841 19.5583 17.7826 18.6749C16.6812 17.7916 16.1304 16.3699 16.1304 14.4099C16.1304 11.815 16.971 9.13734 18.6522 6.37681C20.3623 3.58868 22.4058 1.46308 24.7826 0ZM8.65217 0L10.8696 1.86335C9.44928 3.05038 8.30435 4.18219 7.43478 5.2588C6.56522 6.3354 6 7.16356 5.73913 7.74327C5.50725 8.32298 5.28986 8.98551 5.08696 9.73085L5.26087 9.9793C7.2029 9.9793 8.62319 10.3796 9.52174 11.1801C10.4203 11.9807 10.8696 13.2229 10.8696 14.9068C10.8696 16.2043 10.3768 17.3775 9.3913 18.4265C8.43478 19.4755 7.23188 20 5.78261 20C4.13043 20 2.75362 19.5583 1.65217 18.6749C0.550725 17.7916 0 16.3699 0 14.4099C0 11.815 0.84058 9.13734 2.52174 6.37681C4.23188 3.58868 6.27536 1.46308 8.65217 0Z"
                            fill="#CEC5C5"
                        />
                    </svg>
                </div>

                {/* Main card with border frame */}
                <div className="relative border border-[#64565A] px-12 py-16 md:px-20 md:py-24">
                    {/* Title */}
                    <div className="text-center mb-12">
                        <h2 className="text-4xl text-[#B8853A]">Stories from the Heart</h2>
                        <p className="text-sm tracking-widest text-[#64565A] mt-4 font-light">
                            Hear from Our Residents & Families
                        </p>
                    </div>

                    {/* Testimonial content */}
                    <div className="relative flex items-center justify-center">
                        <div
                            key={currentIndex}
                            className={`testimonial-content ${isAnimating ? "fade-out" : ""}`}
                        >
                            <blockquote
                                className="h-40 line-clamp-4 text-center font-heading text-[#64565A] leading-relaxed mb-12 text-lg md:text-xl px-4">
                                "{testimonials[currentIndex].quote}"
                            </blockquote>

                            <div className="text-xs tracking-[3px] uppercase text-[#64565A] font-light text-center">
                                {testimonials[currentIndex].author}
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div
                        className="flex items-center justify-center gap-6 absolute -bottom-5 left-1/2 transform -translate-x-1/2 z-10">
                        <button
                            onClick={goToPrevious}
                            disabled={isAnimating}
                            className="size-10 rounded-full border border-[#64565A] bg-[#fbf5f3] flex items-center justify-center disabled:cursor-not-allowed"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft className="stroke-1"/>
                        </button>

                        <button
                            onClick={goToNext}
                            disabled={isAnimating}
                            className="size-10 rounded-full border border-[#64565A] bg-[#fbf5f3] flex items-center justify-center disabled:cursor-not-allowed"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight className="stroke-1"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
